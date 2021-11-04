/* eslint-disable */
import { useEffect, useState } from "react";
import Blank from "./assets/blank.png";
import BlueCandy from "./assets/blue-candy.png";
import GreenCandy from "./assets/green-candy.png";
import OrangeCandy from "./assets/orange-candy.png";
import PurpleCandy from "./assets/purple-candy.png";
import RedCandy from "./assets/red-candy.png";
import YellowCandy from "./assets/yellow-candy.png";
import ScoreBoard from "./components/scoreboard";

const width = 8;
const candyColors = [
  Blank,
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;
      if (
        columnOfThree.every(
          (index) => currentColorArrangement[index] === decidedColor && !isBlank
        )
      ) {
        columnOfThree.forEach(
          (index) => (currentColorArrangement[index] = Blank)
        );
        setCurrentColorArrangement([...currentColorArrangement]);
        setScoreDisplay((prevScore) => prevScore + 3);
        return true;
      }
    }
  };

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;
      if (
        columnOfFour.every(
          (index) => currentColorArrangement[index] === decidedColor && !isBlank
        )
      ) {
        columnOfFour.forEach(
          (index) => (currentColorArrangement[index] = Blank)
        );
        setCurrentColorArrangement([...currentColorArrangement]);
        setScoreDisplay((prevScore) => prevScore + 4);
        return true;
      }
    }
  };

  const checkRowOfThree = () => {
    const notValid = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
    ];
    for (let i = 0; i < 64; i++) {
      if (notValid.includes(i)) {
        continue;
      }
      const rowOfThree = [i, i + 1, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;
      if (
        rowOfThree.every(
          (index) => currentColorArrangement[index] === decidedColor && !isBlank
        )
      ) {
        rowOfThree.forEach((index) => (currentColorArrangement[index] = Blank));
        setCurrentColorArrangement([...currentColorArrangement]);
        setScoreDisplay((prevScore) => prevScore + 3);
        return true;
      }
    }
  };

  const checkRowOfFour = () => {
    const notValid = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 62, 63, 64,
    ];
    for (let i = 0; i < 64; i++) {
      if (notValid.includes(i)) {
        continue;
      }
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;
      if (
        rowOfFour.every(
          (index) => currentColorArrangement[index] === decidedColor && !isBlank
        )
      ) {
        rowOfFour.forEach((index) => (currentColorArrangement[index] = Blank));
        setCurrentColorArrangement([...currentColorArrangement]);
        setScoreDisplay((prevScore) => prevScore + 4);
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i <= 55; i++) {
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangement[i] === Blank) {
        const randomColorIndex = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomColorIndex];
      }
      if (currentColorArrangement[i + width] === Blank) {
        [currentColorArrangement[i], currentColorArrangement[i + width]] = [
          currentColorArrangement[i + width],
          currentColorArrangement[i],
        ];
      }
    }
    setCurrentColorArrangement([...currentColorArrangement]);
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    e.preventDefault();
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const draggedId = parseInt(squareBeingDragged.getAttribute("data-id"));
    const replacedId = parseInt(squareBeingReplaced.getAttribute("data-id"));

    currentColorArrangement[draggedId] =
      squareBeingReplaced.getAttribute("src");
    currentColorArrangement[replacedId] =
      squareBeingDragged.getAttribute("src");

    const validMoves = [
      draggedId - 1,
      draggedId + 1,
      draggedId - width,
      draggedId + width,
    ];

    const isValidMove = validMoves.includes(replacedId);
    const isRowOfFour = checkRowOfFour();
    const isRowOfThree = checkRowOfThree();
    const isColumnOfFour = checkColumnOfFour();
    const isColumnOfThree = checkColumnOfThree();

    if (
      replacedId != undefined &&
      isValidMove &&
      (isRowOfFour || isRowOfThree || isColumnOfFour || isColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[replacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[draggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width ** 2; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkRowOfFour();
      checkRowOfThree();
      checkColumnOfFour();
      checkColumnOfThree();
      moveIntoSquareBelow();
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [
    checkColumnOfThree,
    checkColumnOfFour,
    checkRowOfThree,
    checkRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);
  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((color, index) => {
          return (
            <img
              key={index}
              src={color}
              alt={color}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;
