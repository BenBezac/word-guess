import React, {Component} from 'react';
import Letter from "./components/Letter";

import wordList from './data/wordList'

import './App.css'

const MAX_TRY = 10;
const GAME_STATE = Object.freeze({"WIN":"Gagné !", "LOST":"Perdu !", "IN_PROGRESS": "Partie en cours"})
const KEYBOARD = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = this. getInitialState();
    }

    getInitialState() {
        return {
            word: wordList[Math.floor(Math.random()*wordList.length)].toUpperCase(),
            usedLetters: "",
            remainingTry: MAX_TRY
        }
    }

    handleOnClick = (value) => {
        const {usedLetters, remainingTry, word} = this.state;
        const newUsedLetters = usedLetters + value;

        if(! word.includes(value)) {
            const newRemainingTry = remainingTry - 1;
            this.setState({remainingTry: newRemainingTry});
        }

        this.setState({usedLetters: newUsedLetters});
    }

    computeDisplay() {
        return this.replaceUnkownChar().split('').map((letter, index) => <span className="letter" key={index}> { letter } </span>)
    }

    replaceUnkownChar(){
        const {usedLetters, word} =  this.state;
        return word.replace(/\w/g,    (letter) => (usedLetters.includes(letter) ? letter : '_'));
    }

    checkGameStatus() {
        const {remainingTry} =  this.state;

        if(remainingTry > 0) {
            return ! this.replaceUnkownChar().includes("_") ? GAME_STATE.WIN : GAME_STATE.IN_PROGRESS;
        } else {
            return GAME_STATE.LOST;
        }
    }
    
    isLetterActive(value) {
        const {usedLetters, remainingTry} =  this.state;
        return remainingTry > 0 && !usedLetters.includes(value.toLocaleUpperCase());
    }

    componentDidMount() {
        // When the component is mounted, add your DOM listener to the "nv" elem.
        // (The "nv" elem is assigned in the render function.)
        window.addEventListener("keypress", this.keyPressEvent);
    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        window.removeEventListener("keypress", this.keyPressEvent);
    }

    // Use a class arrow function (ES7) for the handler. In ES6 you could bind()
    // a handler in the constructor.
    keyPressEvent = (event) => {
        const value = event.key.toUpperCase();
        const {usedLetters} = this.state;
        if(KEYBOARD.includes(value) && !usedLetters.includes(value)){
            this.handleOnClick(value)
        }
    }

    render() {
        const {remainingTry} =  this.state;
        const buttonsGame = <div>
                <div className="flexcontainer">{
                    KEYBOARD.split('').map((value, index) => (
                        <Letter handleOnClick={this.handleOnClick} key={index} value={value} state={this.isLetterActive(value)} />
                    ))
                }</div>
        </div>;

        const buttonNewGame = <div>
            <button onClick={ () => this.setState(this.getInitialState())}>Nouvelle partie</button>
        </div>;

        return (
            <div className="container">
                <div>{this.checkGameStatus()}{this.checkGameStatus() === GAME_STATE.IN_PROGRESS ? ` - Tentative restante : ${remainingTry}` : ''}</div>
                <div className="word">{this.computeDisplay()}</div>
                {
                    this.checkGameStatus() === GAME_STATE.IN_PROGRESS ? buttonsGame : buttonNewGame
                }
            </div>
        );
    }
}

export default App;
