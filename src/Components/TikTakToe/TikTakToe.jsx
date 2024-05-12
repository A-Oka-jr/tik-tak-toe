import { useState } from "react";
import "./TikTakToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TikTakToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill("")); // Store box contents in state

  const toggle = (num) => {
    if (lock || data[num]) return; // If locked or box already filled, return

    const currentPlayer = count % 2 === 0 ? "X" : "O";
    const newData = [...data];
    newData[num] = currentPlayer;
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const won = (winner) => {
    setLock(true);
    const winningIcon = winner === "X" ? cross_icon : circle_icon;
    setTitleHTML(`<img src=${winningIcon} />   Won Congratulations`);
  };

  const setTitleHTML = (html) => {
    const title = document.querySelector(".title");
    if (title) title.innerHTML = html;
  };

  const checkWin = (newData) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        won(newData[a]);
        return;
      }
    }

    if (count === 8) {
      // All boxes filled
      setLock(true);
      setTitleHTML("It's a Draw!");
    }
  };

  const reset = () => {
    setCount(0);
    setLock(false);
    setData(Array(9).fill(""));
    setTitleHTML("Tik Tak Toe game <span>React</span>");
  };

  return (
    <div className="container">
      <h1
        className="title"
        dangerouslySetInnerHTML={{
          __html: "Tik Tak Toe game <span>React</span>",
        }}
      />
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, rowIndex) => (
            <div className={`row${rowIndex + 1}`} key={rowIndex}>
              {Array(3)
                .fill(null)
                .map((_, colIndex) => {
                  const num = rowIndex * 3 + colIndex;
                  return (
                    <div
                      key={num}
                      className="boxes"
                      onClick={() => toggle(num)}
                      dangerouslySetInnerHTML={{
                        __html:
                          data[num] === "X"
                            ? `<img src=${cross_icon} />`
                            : data[num] === "O"
                            ? `<img src=${circle_icon} />`
                            : "",
                      }}
                    />
                  );
                })}
            </div>
          ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TikTakToe;
