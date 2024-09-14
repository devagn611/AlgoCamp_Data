import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputFormContainer from "../components/TextInputForm/TextInputFormContainer";

export default function StartGame() {
    const [word, setWord] = useState("");
    const [hint, setHint] = useState("");
    const navigate = useNavigate();

    const handleWordChange = (value) => setWord(value);
    const handleHintChange = (value) => setHint(value);

    const handleStartGame = () => {
        if (word && hint) {
            navigate("/play", { state: { wordSelected: word, hintWord: hint } });
        } else {
            alert("Please enter both a word and a hint before starting the game.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-800 to-stone-900 flex items-center justify-center p-4">
            <div className="bg-stone-700 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Start Game</h1>
                <p className="text-stone-300 mb-8 text-center">
                    Enter a word and hint, then press Submit Button individually to Start Game.
                </p>
                <div className="space-y-6">
                    <span>Word</span>
                    <TextInputFormContainer label="Word" onValueChange={handleWordChange} />
                    <span>Hint</span>
                    <TextInputFormContainer label="Hint" onValueChange={handleHintChange} />
                </div>
                <button
                    onClick={handleStartGame}
                    className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
}