import type { Metadata } from "next";
import { Footer, Header } from "../site-components";
import { HistoryQuiz } from "./quiz";
import "./quiz.css";

export const metadata: Metadata = {
  title: "Iosco County History Quiz",
  description: "How well do you know Iosco County? Try five multiple-choice history questions and discover the stories behind the answers.",
  alternates: { canonical: "https://www.ioscomuseum.com/history-quiz" },
};

export default function HistoryQuizPage() {
  return <><Header /><main className="quiz-page"><div className="container quiz-page__inner">
    <header className="quiz-page__intro"><div><p className="eyebrow">Iosco County history quiz</p><h1>How well do you know Iosco County?</h1><p>Five questions. A little local history with every answer. No time limit.</p></div><img src="/images/iosco-museum-main.svg" alt="The museum’s historic home in East Tawas" width={180} height={150} /></header>
    <HistoryQuiz />
    <noscript><p>This interactive quiz needs JavaScript. You can still explore the <a href="/history">museum’s local histories</a>.</p></noscript>
  </div></main><Footer /></>;
}
