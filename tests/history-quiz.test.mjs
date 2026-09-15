import test from 'node:test';
import assert from 'node:assert/strict';
import { initialQuizState, quizQuestions, quizReducer, quizScore } from '../app/history-quiz/quiz-data.ts';

test('quiz scores a mixed attempt, locks submitted answers, and resets for a retry', () => {
  let state = { ...initialQuizState, answers: [] };
  const choices = quizQuestions.map((q, i) => i % 2 === 0 ? q.correct : (q.correct + 1) % 4);
  for (const [i, option] of choices.entries()) {
    state = quizReducer(state, { type: 'select', option });
    state = quizReducer(state, { type: 'answer' });
    assert.equal(state.answers.length, i + 1);
    const submitted = state;
    assert.equal(quizReducer(state, { type: 'answer' }), submitted);
    assert.equal(quizReducer(state, { type: 'select', option: (option + 1) % 4 }), submitted);
    state = quizReducer(state, { type: 'next' });
  }
  assert.equal(state.finished, true);
  assert.equal(quizScore(state.answers), 3);
  assert.equal(quizReducer(state, { type: 'next' }), state);
  assert.deepEqual(quizReducer(state, { type: 'restart' }), initialQuizState);
  assert.equal(quizScore(quizQuestions.map(q => q.correct)), 5);
  assert.equal(quizScore(quizQuestions.map(q => (q.correct + 1) % 4)), 0);
});

test('unanswered questions cannot be skipped and invalid options do not change state', () => {
  for (const action of [{type:'answer'}, {type:'next'}, ...[-1,4,1.5,NaN].map(option => ({type:'select',option}))]) {
    assert.equal(quizReducer(initialQuizState, action), initialQuizState);
  }
  assert.equal(new Set(quizQuestions.map(q => q.id)).size, 5);
  for (const q of quizQuestions) {
    assert.ok(q.options[q.correct]);
    assert.ok(q.source.url.startsWith('/') || q.source.url.startsWith('https://'));
  }
});

test('production quiz route renders the first question and four choices', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('https://www.ioscomuseum.com/history-quiz', {headers:{accept:'text/html'}}), {ASSETS:{fetch:async()=>new Response('Not found',{status:404})}}, {waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /How well do you know Iosco County\?/);
  assert.match(html, /Question 1 of 5/);
  assert.equal((html.match(/type="radio"/g) ?? []).length, 4);
  assert.match(html, /Check answer/);
  assert.match(html, /https:\/\/www\.ioscomuseum\.com\/history-quiz/);
});
