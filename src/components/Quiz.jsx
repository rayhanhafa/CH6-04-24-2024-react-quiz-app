import { useState, useCallback } from "react"

import QUESTION from "../question"

import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
    const [userAnswers, setUserAnswer] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTION.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        console.log(selectedAnswer);
        setUserAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        });
        console.log(userAnswers)
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return (
            <>
                <div id="summary">
                    <img src={quizCompleteImg} alt="" />
                    <h2>Kuis Selesai!!</h2>
                </div>
            </>
        )
    }

    const shuffledAnswers = [...QUESTION[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    timeout={10000}
                    onTimeout={() => handleSkipAnswer(null)}
                />
                <p>{QUESTION[activeQuestionIndex].text}</p>

                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}