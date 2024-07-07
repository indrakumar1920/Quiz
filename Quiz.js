import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question

  useEffect(() => {
    fetch('path_to_your_external_json_file.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswerOptionClick(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>
              {questions[currentQuestion]?.questionText}
            </div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion]?.answerOptions.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
          <div className='timer-section'>
            Time left: {timeLeft} seconds
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;