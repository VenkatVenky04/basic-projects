import { Component, HostListener } from '@angular/core';
import { evaluate } from 'mathjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {
  constructor(private dialog: MatDialog){}
  display:string = '';
  showHelp: boolean = false;
  memory: number = 0;

  append(value: string) {
    this.display += value;
  }

  clear() {
    this.display = '';
  }

  deletedata() {
    this.display = this.display.slice(0, -1);
  }

  equal() {
    try {
      let expression = this.display.replace(/%/g, '/100') 
      this.display = evaluate(expression).toString();
    } catch (error) {
      this.display = 'Error';
    }
  }

  sqrt() {
    if(this.display){
      this.display = Math.sqrt(Number(this.display)).toString();
    }
  }

  square() {
    const num = Number(this.display); // convert string to number
  if (!isNaN(num)) {               // check for valid number
    this.display = (num ** 2).toString();
  } else {
    this.display = 'Error';
  }
  }

 memoryStore() {
  if (this.display) {
    this.memory += parseFloat(this.display);
    this.display = '';
  }
}

memoryRecall() {
  this.display = this.memory.toString();
}

memoryClear() {
  this.memory = 0; // reset memory
}


  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  // Listen to keyboard events
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const key = event.key;

    if (!isNaN(Number(key))) {
      // If number key pressed (0-9)
      this.append(key);
    } else if (['+', '-', '*', '/','.','%'].includes(key)) {
      this.append(key);
    } else if (key === 'Enter' || key === '=') {
      this.equal();
      event.preventDefault(); // prevent form submit
    } else if (key === 'Backspace') {
      this.deletedata();
    } else if (key.toLowerCase() === 'c') {
      this.clear();
    }  else if (key.toLowerCase() === 's') {
      this.square();
    } else if (key.toLowerCase() === 'r') {
      this.sqrt();
    } else if (key.toLowerCase() === 'm' && event.shiftKey) {
      this.memoryStore();   // Shift+M = M+
    } else if (key.toLowerCase() === 'm') {
      this.memoryRecall();  // M = MR
    } else if (key.toLowerCase() === 'x') {
      this.memoryClear();   // X = MC
    } else if (key.toLowerCase() === 'h') {
      this.toggleHelp();   // Press H to open/close help
    }
  }

}
