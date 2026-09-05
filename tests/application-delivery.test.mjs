import test from 'node:test';
import assert from 'node:assert/strict';
import { sendApplication, APPLICATION_ENDPOINT, APPLICATION_SITE } from '../app/application-delivery.ts';

function application() {
  const data = new FormData();
  data.set('name', 'Website test');
  data.set('email', 'test@example.com');
  data.set('comments', 'Archives & research\nSecond line');
  return data;
}
test('sends complete details to the fixed museum endpoint and accepts confirmed success', async t => {
  let captured;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    captured = { url, body: JSON.parse(options.body), referrerPolicy: options.referrerPolicy };
    return Response.json({ success: 'true', message: 'The form was submitted successfully.' });
  });
  await sendApplication(application(), 'Iosco Museum Volunteer Application');
  assert.equal(captured.url, APPLICATION_ENDPOINT);
  assert.equal(captured.body.email, 'test@example.com');
  assert.equal(captured.body.comments, 'Archives & research\nSecond line');
  assert.equal(captured.body._subject, 'Iosco Museum Volunteer Application');
  assert.equal(captured.body._url, APPLICATION_SITE);
  assert.equal(captured.referrerPolicy, 'origin');
});
test('activation response is never treated as a successful application', async t => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ success: 'true', message: 'Please activate your form.' }));
  await assert.rejects(sendApplication(application(), 'Test'));
});
test('provider errors, malformed responses, and network failures are rejected', async t => {
  for (const result of [Response.json({success:false}),Response.json({success:true},{status:500}),new Response('not JSON')]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => result);
    await assert.rejects(sendApplication(application(), 'Test'));
    mock.mock.restore();
  }
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Network unavailable'); });
  await assert.rejects(sendApplication(application(), 'Test'));
});
test('honeypot does not make a network request', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Must not send'); });
  const data = application(); data.set('_honey', 'spam');
  await assert.rejects(sendApplication(data, 'Test'));
  assert.equal(mock.mock.callCount(), 0);
});
