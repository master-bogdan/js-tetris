document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ];

// Прописываем позиции фигур массивом

const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width * 2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
];

const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ];

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ];

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  console.log(theTetrominoes[0][0]);

  //Рандомизация фигур
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
 
  //Функция отрисовки фигуры
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }
  
  //Функция отмены отрисовки
  function undraw() {
      current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino');
          squares[currentPosition + index].style.backgroundColor = '';
      });
  }

  //Функция двиганья фигур по нажатию клавиш
  function control(e) {
      if (e.keyCode === 37) {
          moveLeft();
      } else if (e.keyCode === 39) {
          moveRight();
      } else if (e.keyCode === 40) {
          moveDown();
      } else if (e.keyCode === 38) {
          rotate();
      }
  }
  document.addEventListener('keyup', control);

  // Функция движения фигуры
  function moveDown() {
      undraw();
      currentPosition += width;
      draw();
      freeze();
  }

  //Функция остановки падения фигуры
  function freeze() {
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
          current.forEach(index => squares[currentPosition + index].classList.add('taken'));
          //Делаем новое падение фигуры
          random = nextRandom;
          nextRandom = Math.floor(Math.random() * theTetrominoes.length);
          current = theTetrominoes[random][currentRotation];
          currentPosition = 4;
          draw();
          displayShape();
          addScore();
          gameOver();
      }
  }

  //Делаем функцию движения фигуры влево
  function moveLeft() {
      undraw();
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
      if (!isAtLeftEdge) { 
          currentPosition -= 1;
      }
      if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
      }
      draw();
  }

  //Делаем функцию движения фигуры вправо
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    if(!isAtRightEdge) {
    currentPosition += 1;
    }
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

//Функция вращать фигуру
    function rotate() {
        undraw();
        currentRotation ++;
        if (currentRotation === current.length) { // Заставяет вращать фигуру по кругу
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }


//Функция показа следующей фигуры
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;
    

//Показ фигуры без вращений
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ];

// 
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
        });
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        });
    }

    //Придаем кнопке функции старта и стопа
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    });

    //Добавляем счет
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = '';
                });
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }
    // GAME OVER
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId);
        }
    }

});