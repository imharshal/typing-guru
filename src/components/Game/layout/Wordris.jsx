import { useState, useRef } from "react";
import Word from "../partials/Word";
import { getLesson } from "../../../services/LessonsGenerator";
import { useEffect } from "react";
import Modal from "../../partials/Modal";
const levels = [30, 40, 50, 60, 70, 80, 90];
var gameInterval;
const Wordris = ({ keyPressed }) => {
  const [level, setLevel] = useState(0);
  const [active, setActive] = useState(0);
  const [words, setWords] = useState([]);
  const [correct, setCorrect] = useState(new Set());
  const enterredWord = useRef("");
  const [missed, setMissed] = useState(new Set());
  const [position, setPosition] = useState(300);
  const [begin, setBegin] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [stackSize, setStackSize] = useState(0);
  useEffect(() => {
    setWords(getLesson({ count: 10, wordLength: 5 }));
  }, []);
  useEffect(() => {
    if (begin && missed.size < 8 && words.length - active == 0) {
      setLevel((ps) => ps + 1);
      setWords(
        words.concat(getLesson({ count: level + 1 * 10, wordLength: 10 }))
      );
      console.log(words);
      console.log("level increased to", level);
    }

    if (begin && position <= stackSize) {
      if (missed.size > 8) {
        clearInterval(gameInterval);
        setBegin(false);
        setGameOver(true);
      } else if (begin) {
        setStackSize((ps) => ps + 30);
        if (enterredWord.current === words[active]) {
          setCorrect((ps) => ps.add(active));
        } else {
          setMissed((ps) => ps.add(active));
          enterredWord.current = "";
          setCurrentLetter(0);
          setPosition(300);
        }
        setActive((ps) => ps + 1);
      }
    }
  }, [position]);

  useEffect(() => {
    if (begin && level < levels.length) {
      clearInterval(gameInterval);
      gameInterval = setInterval(() => {
        setPosition((ps) => (ps != stackSize ? ps - levels[level] : ps));
      }, 1000);
    }
  }, [level]);

  useEffect(() => {
    if (keyPressed && keyPressed.key.length === 1) {
      let key = keyPressed.key;

      if (!begin && key === " ") {
        setBegin(true);
        gameInterval = setInterval(() => {
          setPosition((ps) => (ps != missed.size ? ps - levels[level] : ps));
        }, 1000);
      }
      if (begin && active < words.length) {
        if (words[active][currentLetter] === key) {
          setCurrentLetter((ps) => ps + 1);
          enterredWord.current += key;
        }
        if (enterredWord.current === words[active]) {
          setCorrect((ps) => ps.add(active));
          setActive((ps) => ps + 1);
          setCurrentLetter(0);
          setPosition(300);
          setScore((sc) => sc + words[active].length);
          enterredWord.current = "";
        }
      }
    }
  }, [keyPressed, words]);

  const handlePosition = (k) => {
    if (k === active) return position;
    else if (missed.has(k)) return [...missed].indexOf(k) * 30;
    return 1000;
  };
  return (
    <div className="playground tetris-game-panel">
      <div className="flex-center">
        {!begin && !gameOver && !win && (
          <Modal message="Press space key to start game"></Modal>
        )}
        {gameOver || win ? (
          gameOver ? (
            <div className="flex-center">
              <Modal message="Game Over"></Modal>
              <button
                className="btn"
                onClick={() => window.location.reload(false)}
              >
                Reset Game
              </button>
            </div>
          ) : (
            <div className="flex-center">
              <Modal message="Congratulations! You win the game"></Modal>
              <button
                className="btn"
                onClick={() => window.location.reload(false)}
              >
                Reset Game
              </button>
            </div>
          )
        ) : (
          <div className="tetris-box">
            {words &&
              words.map((w, k) => (
                <Word
                  key={k}
                  word={w}
                  bottom={handlePosition(k)}
                  isActive={k == active}
                  isMissed={missed.has(k)}
                  isCorrect={correct.has(k)}
                  currentLetter={currentLetter}
                ></Word>
              ))}
          </div>
        )}
      </div>
      {(begin || gameOver || win) && (
        <div className="center">
          <div className="score-board">Score: {score}</div>
          <div className="score-board">Level: {level + 1}</div>
          {/* <div>
            level:{level} stackSize: {stackSize} position: {position} diff:
            {levels[level]}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Wordris;
