'use client'
import React from "react";
import {useEffect, useState} from "react";

export default function Board() {
    const topLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const medLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const bottomLetters = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const [guesses, setGuesses] = useState<string[]>(new Array())
    const word = 'vowel'
    const [currentGuess, setCurrentGuess] = useState<string>('')
    const [guessNumber, setGuessNumber] = useState<number>(0);
    const emptyLine = (<div style={{ display: 'flex', flex: 'column', gap: '5px', marginTop: '5px'}}>
    <div style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '10px', border: '1px solid grey', textAlign: 'center'}} />
    <div style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '10px', border: '1px solid grey', textAlign: 'center'}} />
    <div style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '10px', border: '1px solid grey', textAlign: 'center'}} />
    <div style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '10px', border: '1px solid grey', textAlign: 'center'}} />
    <div style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '10px', border: '1px solid grey', textAlign: 'center'}} />
</div>)
    const emptyGuesses = new Array(5).fill(emptyLine)
    if (typeof document !== "undefined") {
        document.onkeydown = (e) => {
            setCurrentGuess(currentGuess + e.key)
        }
    }

    const getBackground = (letter: string, index: number) => {
        if (word.includes(letter.toLowerCase()) && word.indexOf(letter.toLowerCase()) === index) {
            return 'green'
        } else if (word.includes(letter.toLowerCase())) {
            return 'rgba(245, 230, 83)'
        }
        return 'black'
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value
        setCurrentGuess(currentValue)
    }
    
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
                    <div key={`current-guess-${index}`} style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '15px', border: '1px solid grey', textAlign: 'center'}}>{letter.toUpperCase()}</div>
                 )})}
            {new Array(5 - currentGuess.length).fill(<div style={{ background: 'black', minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px', padding: '10px', border: '1px solid grey', textAlign: 'center'}} />).map((a, ind) => {
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '2px'}}>
                {topLetters.map((letter, index) => {
                    return (
                        <div key={`Keyboard-top-${letter}`} onClick={() => {
                            setCurrentGuess(currentGuess + letter)
                        }} style={{ width: '30px', background: 'grey', cursor: 'pointer', textAlign: 'center', padding: '5px'}}>
                            {letter}
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '3px'}}>
                {medLetters.map((letter, index) => {
                    return (
                        <div key={`Keyboard-top-${letter}`} onClick={() => {
                            setCurrentGuess(currentGuess + letter)
                        }} style={{ width: '30px', background: 'grey', cursor: 'pointer', textAlign: 'center', padding: '5px'}}>
                            {letter}
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '2px'}}>
                {bottomLetters.map((letter, index) => {
                    return (
                        <div key={`Keyboard-top-${letter}`} onClick={() => {
                            setCurrentGuess(currentGuess + letter)
                        }} style={{ width: '30px', background: 'grey', cursor: 'pointer', textAlign: 'center', padding: '5px'}}>
                            {letter}
                        </div>
                    )
                })}
            </div>
            
        {/* <input type="text" maxLength={5} onChange={handleInput} value={currentGuess} style={{ background: 'white', color: 'black', padding: '1em', marginTop: '5px'}} /> */}
        <button onClick={() => {
            setGuesses([...guesses, currentGuess])
            setCurrentGuess('')
            setGuessNumber(guessNumber + 1)
        }
        } disabled={currentGuess.length !== 5}
        style={{ marginTop: '2px', background: 'black', color: 'white', border: '1px solid grey', padding: '2px 0', cursor: 'pointer'}}>Submit</button>
        </div>
        </div>
    )
}