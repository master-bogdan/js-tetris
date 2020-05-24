document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;

// Прописываем позиции фигур массивом

const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width *2+2],
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

  //Рандомизация фигуры
  let random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[0][0];
 

  //Функция отрисовки фигуры

  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      
    });
  }
  


  //Функция отмены отрисовки
  function undraw() {
      current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino');
      });

  }

  //Делаем падение фигур каждую секунду

  const timerId = setInterval(moveDown, 1000);

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

  //Функция заморозки
  function freeze() {
      iTetromino(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))); {
          current.forEach(index => squares[currentPosition + index].classList.add('.taken'));
          //Делаем новое падение фигуры
          random = Math.floor(Math.random() * theTetrominoes.length);
          current = theTetrominoes[random][currentRotation];
          currentPosition = 4;
          draw();
      }
  }

  //Делаем функцию движения фигуры влево
  function moveLeft() {
      undraw();
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0 );

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
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1 );

    if (!isAtRightEdge) { 
        currentPosition += 1;
    }
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1;
    }

    draw();
}

});