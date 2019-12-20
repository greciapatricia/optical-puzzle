var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
img.src = './img/puzzle.jpg'; //Cargar la imagen que quiero que se vea
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width; //Tamaño del tablero
var tileCount = document.getElementById('scale').value; //Número de cuadrados según la escala (3, 4 o 5)

var tileSize = boardSize / tileCount; //Tamaño de los cuadraditos

var clickLoc = new Object; //Donde se hace click
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object; //El cuadrado vacío, siempre en x-0 e y-0 al principio
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;

var boardParts; //Se definen y alamacenan las partes del tablero
setBoard(); //Se llama a la función para establecer las partes del tablero

document.getElementById('scale').onchange = function() { //Dibujar la cantidad de cuadraditos según el valor
  tileCount = this.value;
  tileSize = boardSize / tileCount;
  setBoard();
  drawTiles();
};

document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize); //Organizar de forma aleatoria los cuadraditos cada vez que se carga el juego en el eje x
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize); //Organizar de forma aleatoria los cuadraditos cada vez que se carga el juego en el eje y
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) { //Distancia del cuadrado al moverse los elementos
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {alert("You solved it!");}, 500);
  }
};

function setBoard() { //Establecer los cuadraditos del tablero
  boardParts = new Array(tileCount); //Se almacenan las partes del tablero creando un array según el nivel que se elija
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i; 
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x; //Se establece el espacio vacío
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

function drawTiles() { //Dibujar los cuadraditos según el movimiento
  context.clearRect ( 0 , 0 , boardSize , boardSize ); //Va renderizando
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
            i * tileSize, j * tileSize, tileSize, tileSize); //Va dibujando los movimientos
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() { 
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}
