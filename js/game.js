class Game {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.fps = 60;
      this.framesCounter = 0;
      this.player;
    }
  
    init() {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
  
      this.start();
    }
  
    start() {
      this.reset();
      this.interval = setInterval(() => {
        this.framesCounter++;
  
        this.clear();
        this.drawAll();
        this.moveAll();
        if (this.framesCounter === Math.floor(Math.random()*(150 - 50)) + 50) this.generateObstacles();
      }, 1000 / this.fps);
    }
    reset() {
      this.background = new Background(this.ctx, this.width, this.height);
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  
    drawAll() {
      this.background.draw();
    }
  
    moveAll() {
      this.background.move();
    }
  
    gameOver() {
      clearInterval(this.interval);
    }
  }