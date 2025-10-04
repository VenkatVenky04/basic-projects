import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables',
  imports: [CommonModule, FormsModule],
  templateUrl: './tables.html',
  styleUrl: './tables.css'
})
export class Tables {
  number: number = 5;
  limit: number = 10;
  range = Array.from({ length: this.limit }, (_, i) => i + 1);

  ngOnInit() { }

  updateRange() {
    this.range = Array.from({ length: this.limit }, (_, i) => i + 1);
  }

}
