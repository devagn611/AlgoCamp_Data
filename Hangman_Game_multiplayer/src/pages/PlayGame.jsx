import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LetterButtons from "../components/LetterButtons/LetterButtons";
import HangMan from "../components/HangMan/HangMan";

export default function PlayGame() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [step, setStep] = useState(0);
  const wordSelected = state?.wordSelected || "";
  const hintWord = state?.hintWord || "";

  useEffect(() => {
    if (wordSelected && guessedLetters.length > 0) {
      const wordLetters = new Set(wordSelected.toUpperCase().split(""));
      const guessedCorrectly = [...wordLetters].every((letter) =>
        guessedLetters.includes(letter)
      );
      if (guessedCorrectly) {
        setGameWon(true);
      }
    }
    if (step === 7) {
      setGameLost(true);
    }
  }, [wordSelected, guessedLetters, step]);

  useEffect(() => {
    if (gameWon || gameLost) {
      const redirectTimer = setTimeout(() => {
        navigate('/start');
      }, 3000); 

      return () => clearTimeout(redirectTimer);
    }
  }, [gameWon, gameLost, navigate]);

  function handleLetterClick(letter) {
    if (gameWon || gameLost) return;  
    if (wordSelected.toUpperCase().includes(letter)) {
      console.log('Correct');
    } else {
      console.log('Wrong');
      setStep(prevStep => prevStep + 1);
    }
    setGuessedLetters(prevLetters => [...prevLetters, letter]);
  }

  const displayWord = wordSelected
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter.toUpperCase()) ? letter : "_"
    )
    .join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-800 to-stone-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Hangman</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-stone-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Play Game</h2>
            <p className="mb-4">
              <span className="font-bold text-blue-300">Hint:</span> {hintWord}
            </p>
            <p className="text-3xl mb-6 font-mono">{displayWord}</p>
            {gameWon && (
              <div className="text-green-400 font-bold text-xl mb-4">
                <p>Congratulations! You've won!</p>
                <p className="text-sm mt-2">Redirecting to start page in 3 seconds...</p>
              </div>
            )}
            {gameLost && (
              <div className="text-red-400 font-bold text-xl mb-4">
                <p>Game Over! The word was: {wordSelected}</p>
                <p className="text-sm mt-2">Redirecting to start page in 3 seconds...</p>
              </div>
            )}
            {!gameWon && !gameLost && (
              <LetterButtons
                text={wordSelected}
                guessedLetters={guessedLetters}
                onLetterClick={handleLetterClick}
              />
            )}
          </div>
          <div className="flex items-center justify-center bg-stone-700 rounded-lg p-6 shadow-lg">
            <HangMan step={step} />
          </div>
        </div>
      </div>
    </div>
  );
}