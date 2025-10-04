import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css'
})
export class Stopwatch {
  time: number = 0;
  intervalId: any;
  running: boolean = false;
  laps: string[] = [];

  start() {
    if(!this.running) {
      this.running = true;
      const startTime = Date.now() - this.time;
      this.intervalId = setInterval(() => {
        this.time = Date.now() - startTime
      }, 10)
    }
  } 
  
  stop() {
    this.running = false;
    clearInterval(this.intervalId)
  }

  reset() {
    this.stop();
    this.time = 0;
    this.laps = [];
  }

  lap() {
    if(this.running) {
      this.laps.push(this.formattime(this.time))
    }
  }

  formattime(mS: number): any {
    const milliseconds = Math.floor((mS % 1000) / 10);
    const seconds = Math.floor((mS / 1000) % 60);
    const minutes = Math.floor((mS / (1000 * 60)) % 60);
    const hours = Math.floor((mS / (1000 * 60 * 60)));
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}:${this.pad(milliseconds)}`
  }

  pad(number: number): any {
    return number.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
