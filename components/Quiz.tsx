'use client';
import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Quiz Complete!</h3>
        <p className="text-lg">Your score: {score} out of {questions.length}</p>
        <button onClick={handleRestart} className="btn btn-primary mt-4">Restart Quiz</button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
        <span className="text-sm text-gray-500">Score: {score}</span>
      </div>
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`w-full text-left px-4 py-2 rounded-md border ${
              selectedOption === null
                ? 'border-gray-300 hover:bg-gray-50'
                : index === question.correctIndex
                ? 'border-green-500 bg-green-50'
                : selectedOption === index
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 opacity-50'
            }`}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm">{question.explanation}</p>
        </div>
      )}
      {selectedOption !== null && (
        <button onClick={handleNext} className="btn btn-primary mt-4">
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      )}
    </div>
  );
}