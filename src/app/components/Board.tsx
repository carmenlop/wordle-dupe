'use client'
import React, { useEffect } from "react";
import {useState} from "react";
import { allWords } from "./words";

export default function Board() {
    const [word, setWord] = useState<string>('');
    // TODO: fetch from dictionary API for a 5 letter "Winning word"

    const letters = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['Z', 'X', 'C', 'V', 'B', 'N', 'M']]

    const [guesses, setGuesses] = useState<string[]>(new Array())
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [guessNumber, setGuessNumber] = useState<number>(0);

    const [message, setMessage] = useState<string>('');

    const emptyLine =
        (<div style={{ display: 'flex', flex: 'column', gap: '5px', marginTop: '5px'}}>
            <div className="letterBox" />
            <div className="letterBox" />
            <div className="letterBox" />
            <div className="letterBox" />
            <div className="letterBox" />
        </div>)

    const clearMessage = () => {
        setMessage('');
    }

    const handleSubmit = () => {
        if (currentGuess.length === 5) {
            setGuesses([...guesses, currentGuess])
            setCurrentGuess('')
            setGuessNumber(guessNumber + 1)
        } else {
            setMessage('Whoops! Word length must be 5 letters long to submit.')
            setTimeout(clearMessage, 1300);
        }
    }

    const emptyGuesses = new Array(5).fill(emptyLine)

    if (typeof document !== "undefined") {
        document.onkeydown = (e) => {
            if (e.key === 'Enter') {
                handleSubmit()
            } else if (e.key === 'Backspace') {
                setCurrentGuess(currentGuess.slice(0, -1) || '')
            } else {
                setCurrentGuess(currentGuess + e.key)
            }
        }
    }

    const getBackground = (letter: string, index: number) => {
        if (word.includes(letter.toLowerCase()) && word.indexOf(letter.toLowerCase()) === index) {
            return 'green'
        } else if (word.includes(letter.toLowerCase())) {
            return 'rgba(245, 230, 83)'
        }
        return 'gray'
    }

    useEffect(() => {
        const wordIndex = Math.floor(Math.random() * allWords.length)
        setWord(allWords[wordIndex])
    }, [])
    
    return (
        <div>
        <h1>Wordle</h1>
        {guesses.map((guess: string, index: number) => {
            return (
                <div key={`guess-${index}`} style={{ display: 'flex', flex: 'column', gap: '5px', marginTop: '5px'}}>
                    {guess && guess.split('').map((letter: string, index: number) => {
                        return (
                            <div key={`letter-${index}`} style={{ background: getBackground(letter, index), minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '15px', border: '1px solid grey', textAlign: 'center'}}>
                                {letter.toUpperCase()}
                            </div>
                        )
                    })}
                </div>
            )
        })}
        {guessNumber < 5 && (
            <div style={{ display: 'flex', flex: 'column', gap: '5px', marginTop: '5px'}}>
            {currentGuess.split('').map((letter: string, index: number) => {
                return (
                    <div key={`current-guess-${index}`} style={{ background: 'black', color: 'white', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '15px', border: '1px solid grey', textAlign: 'center'}}>{letter.toUpperCase()}</div>
                 )})}
            {currentGuess.length < 5 && new Array(5 - currentGuess.length).fill(<div className="letterBox" />).map((a, ind) => {
                return (
                    <div key={`empty-${ind}-0`}>
                        {a}
                    </div>
                )
            })}
            </div>
            
        )}
        
        {emptyGuesses.map((a, index) => {
            if (index < 5 - guessNumber - 1) {
            return ( 
                <span key={`empty-${index}`}>
                    {a}
                </span>
                
            )
            }
        })}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '10px', marginLeft: '-25px'}}>
            {letters.map((row, index) => {
                return (
                    <div key={`row-${index}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '2px'}}>
                    {row.map((letter) => {
                        return (
                            <div key={`Keyboard-letter-${letter}`} onClick={() => {
                                setCurrentGuess(currentGuess + letter)
                            }} style={{ width: '30px', background: 'grey', cursor: 'pointer', textAlign: 'center', padding: '5px'}}>
                                {letter}
                            </div>
                        )
                    })}
                </div>
                )
            })}
            
            <button onClick={() => {
                handleSubmit()
            }
            }
            style={{ marginTop: '2px', background: 'black', color: 'white', border: '1px solid grey', padding: '2px 0', cursor: 'pointer'}}>Submit</button>
        </div>
        <p style={{ fontSize: '0.65em'}}>{message}</p>
    </div>
    )
}