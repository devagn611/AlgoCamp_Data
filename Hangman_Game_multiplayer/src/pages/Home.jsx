import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-800 to-stone-900 flex flex-col items-center justify-center p-4 text-white">
            <div className="bg-stone-700 rounded-lg p-8 shadow-lg max-w-md w-full text-center">
                <h1 className="text-4xl font-bold mb-6">Hangman Game</h1>
                <p className="text-lg mb-8 text-stone-300">
                    Welcome to the classic word-guessing game.
                </p>
                <Link 
                    to='/start' 
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Start Game
                </Link>
            </div>
        </div>
    );
}