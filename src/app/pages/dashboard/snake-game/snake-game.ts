import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

interface Point { x: number, y: number }

@Component({
  selector: 'app-snake-game',
  imports: [],
  templateUrl: './snake-game.html',
  styleUrl: './snake-game.css'
})
export class SnakeGame {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  private lastTime = 0;
  private accumulated = 0;
  highScore = 0;
  isStarted = false;


  // Game settings
  private readonly gridSize = 20;
  private readonly cols = 30;
  private readonly rows = 20;
  private readonly stepMs = 150;

  // Game state
  snake: Point[] = [];
  direction: Point = { x: 1, y: 0 };
  nextDirection: Point | null = null;
  food: Point | null = null;
  score = 0;
  isRunning = true;
  isGameOver = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.gridSize * this.cols;
    canvas.height = this.gridSize * this.rows;
    this.ctx = canvas.getContext('2d');

    this.resetGame();
    requestAnimationFrame(this.loop.bind(this));
    this.loadHighScore();
    this.isRunning = false;
    this.isStarted = false;
  }

  resetGame() {
    this.snake = [
      { x: Math.floor(this.cols / 2), y: Math.floor(this.rows / 2) },
      { x: Math.floor(this.cols / 2) - 1, y: Math.floor(this.rows / 2) },
      { x: Math.floor(this.cols / 2) - 2, y: Math.floor(this.rows / 2) }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = null;
    this.spawnFood();
    this.score = 0;
    this.isRunning = true;
    this.isGameOver = false;
    this.lastTime = performance.now();
    this.accumulated = 0;
  }

  private spawnFood() {
    const occupied = new Set(this.snake.map(p => `${p.x},${p.y}`));
    let px: number, py: number;
    do {
      px = Math.floor(Math.random() * this.cols);
      py = Math.floor(Math.random() * this.rows);
    } while (occupied.has(`${px},${py}`));
    this.food = { x: px, y: py };
  }

  private loadHighScore() {
    const saved = localStorage.getItem('snake_high_score');
    this.highScore = saved ? parseInt(saved, 10) : 0;
  }

  private saveHighScore() {
    localStorage.setItem('snake_high_score', this.highScore.toString());
  }


  private loop(time: number) {
    if (!this.ctx) return;
    const delta = time - this.lastTime;
    this.lastTime = time;
    if (this.isRunning && !this.isGameOver) {
      this.accumulated += delta;
      while (this.accumulated >= this.stepMs) {
        this.update();
        this.accumulated -= this.stepMs;
      }
    }

    if (!this.isStarted) {
      this.draw(); // still render 'Press Enter to Start'
      requestAnimationFrame(this.loop.bind(this));
      return;
    }

    this.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  private update() {
    // apply nextDirection if set
    if (this.nextDirection) {
      // prevent reversing
      if (!(this.nextDirection.x === -this.direction.x && this.nextDirection.y === -this.direction.y)) {
        this.direction = this.nextDirection;
      }
      this.nextDirection = null;
    }

    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

    // wrap around screen (classic snake) — change to game over on walls if you prefer
    head.x = (head.x + this.cols) % this.cols;
    head.y = (head.y + this.rows) % this.rows;

    // check collision with self
    if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
      this.isGameOver = true;
      this.isRunning = false;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        this.saveHighScore();
      }
      return;
    }

    // move snake
    this.snake.unshift(head);

    // check food
    if (this.food && head.x === this.food.x && head.y === this.food.y) {
      this.score += 1;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        this.saveHighScore();
      }
      this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  private draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const width = this.gridSize * this.cols;
    const height = this.gridSize * this.rows;

    // clear
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);

    if (!this.isStarted) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.font = '24px monospace';
      ctx.fillText('Press Enter to Start', width / 2, height / 2);
      ctx.textAlign = 'left';
      return;
    }

    // draw grid (optional subtle lines)
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= this.cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * this.gridSize, 0);
      ctx.lineTo(x * this.gridSize, height);
      ctx.stroke();
    }
    for (let y = 0; y <= this.rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * this.gridSize);
      ctx.lineTo(width, y * this.gridSize);
      ctx.stroke();
    }

    // draw food
    if (this.food) {
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(this.food.x * this.gridSize + 2, this.food.y * this.gridSize + 2, this.gridSize - 4, this.gridSize - 4);
    }

    // draw snake
    for (let i = 0; i < this.snake.length; i++) {
      const s = this.snake[i];
      if (i === 0) ctx.fillStyle = '#2ecc71';
      else ctx.fillStyle = '#16a085';
      ctx.fillRect(s.x * this.gridSize + 1, s.y * this.gridSize + 1, this.gridSize - 2, this.gridSize - 2);
    }

    // HUD
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.fillText(`Score: ${this.score}`, 8, 18);
    if (this.isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(width / 4, height / 3, width / 2, height / 3);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.font = '24px monospace';
      ctx.fillText('Game Over', width / 2, height / 2 - 8);
      ctx.font = '16px monospace';
      ctx.fillText('Press R to Restart', width / 2, height / 2 + 20);
      ctx.textAlign = 'left';
      ctx.fillText(`High Score: ${this.highScore}`, 8, 38);
    }

    if (!this.isRunning && !this.isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(4, height - 36, 140, 28);
      ctx.fillStyle = '#fff';
      ctx.font = '14px monospace';
      ctx.fillText('Paused - Press Space to resume', 8, height - 16);
    }
  }

  // keyboard handlers
  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (this.isGameOver) {
      if (event.key.toLowerCase() === 'r') {
        this.resetGame();
      }
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.setNextDirection(0, -1);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        this.setNextDirection(0, 1);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.setNextDirection(-1, 0);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.setNextDirection(1, 0);
        break;
      case ' ': // space -> pause/resume
        this.isRunning = !this.isRunning;
        break;
      case 'Enter':
        if (!this.isStarted) {
          this.isStarted = true;
          this.isRunning = true;
        }
        break;
    }
  }

  setNextDirection(x: number, y: number) {
    this.nextDirection = { x, y };
  }

  startGame() {
    if (!this.isStarted) {
      this.isStarted = true;
      this.isRunning = true;
    }
  }

  togglePause() {
    if (this.isStarted && !this.isGameOver) {
      this.isRunning = !this.isRunning;
    }
  }

}
