"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { initialQuizState, quizQuestions, quizReducer, quizScore } from "./quiz-data";

export function HistoryQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);
  const [copyMessage, setCopyMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const question = quizQuestions[state.index];
  const score = quizScore(state.answers);

  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [state.index, state.finished]);

  async function copyQuizLink() {
    try {
      await navigator.clipboard.writeText("https://www.ioscomuseum.com/history-quiz");
      setCopyMessage("Quiz link copied.");
    } catch {
      setCopyMessage("Copy this link: https://www.ioscomuseum.com/history-quiz");
    }
  }

  return (
    <section className="history-quiz" aria-label="Iosco County history quiz">
      <div className="history-quiz__progress-label"><span>{state.finished ? "Quiz complete" : `Question ${state.index + 1} of ${quizQuestions.length}`}</span><span>{score} correct</span></div>
      <progress className="history-quiz__progress" value={state.answers.length} max={quizQuestions.length} aria-label="Questions answered" />
      {state.finished ? (
        <div className="history-quiz__result">
          <p className="eyebrow">Your result</p>
          <h2 ref={heading} tabIndex={-1}>{score} out of {quizQuestions.length}</h2>
          <p>{score === 5 ? "You know your Iosco history!" : score >= 3 ? "You know quite a bit about Iosco County." : "There’s always another piece of local history to discover."} Thanks for exploring it with us.</p>
          <div className="button-row">
            <button className="button button--forest" onClick={() => { dispatch({ type: "restart" }); setCopyMessage(""); }}>Try again</button>
            <button className="button button--outline" onClick={copyQuizLink}>Copy quiz link</button>
          </div>
          <p className="history-quiz__copy-status" role="status">{copyMessage}</p>
          <details className="history-quiz__review">
            <summary>Review the answers</summary>
            <ol>{quizQuestions.map((item, index) => <li key={item.id}>
              <h3>{item.question}</h3>
              <p><strong>{state.answers[index] === item.correct ? "Correct" : "Your answer: " + item.options[state.answers[index]]}</strong></p>
              <p>Answer: <strong>{item.options[item.correct]}</strong></p>
              <p>{item.explanation}</p>
              <a href={item.source.url} target="_blank" rel="noreferrer">Source: {item.source.title} <span className="sr-only">(opens in a new tab)</span></a>
            </li>)}</ol>
          </details>
          <div className="history-quiz__explore"><h3>Keep exploring Iosco County</h3><p>Meet the people and places behind the answers.</p><Link className="text-link" href="/history">Read our local histories →</Link></div>
        </div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); dispatch({ type: "answer" }); }}>
          <p className="eyebrow">{question.topic}</p>
          <h2 ref={heading} tabIndex={-1} id="quiz-question">{question.question}</h2>
          <fieldset className="history-quiz__options" aria-labelledby="quiz-question" disabled={state.revealed}>
            <legend className="sr-only">Choose one answer</legend>
            {question.options.map((option, index) => <label key={`${question.id}-${index}`} className={`history-quiz__option${state.selected === index ? " is-selected" : ""}${state.revealed && index === question.correct ? " is-correct" : ""}${state.revealed && state.selected === index && index !== question.correct ? " is-incorrect" : ""}`}>
              <input type="radio" name="quiz-answer" value={index} checked={state.selected === index} onChange={() => dispatch({ type: "select", option: index })} />
              <span className="history-quiz__letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span><span>{option}</span>
              {state.revealed && index === question.correct && <strong className="history-quiz__answer-label">Correct answer</strong>}
              {state.revealed && state.selected === index && index !== question.correct && <strong className="history-quiz__answer-label">Your answer</strong>}
            </label>)}
          </fieldset>
          {state.revealed ? <>
            <div className="history-quiz__feedback" role="status"><h3>{state.selected === question.correct ? "That’s right!" : `The answer is ${question.options[question.correct]}.`}</h3><p>{question.explanation}</p><a href={question.source.url} target="_blank" rel="noreferrer">Source: {question.source.title} <span className="sr-only">(opens in a new tab)</span></a></div>
            <button type="button" className="button button--forest" onClick={() => dispatch({ type: "next" })}>{state.index === quizQuestions.length - 1 ? "See my score" : "Next question"}</button>
          </> : <button className="button button--forest" type="submit" disabled={state.selected === null}>Check answer</button>}
        </form>
      )}
    </section>
  );
}
