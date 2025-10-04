import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-bmi-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './bmi-calculator.html',
  styleUrl: './bmi-calculator.css'
})
export class BmiCalculator {
  weight: string = '';
  height: string = '';
  bmi: number | null = null;
  message: string = '';

  calculateBMI() {
    const weight = parseFloat(this.weight);
    const height = parseFloat(this.height);

    if (!weight && !height) {
      this.message = 'Please enter Weight & Height';
      this.bmi = null;
      return;
    }

    const heightInMeters = height / 100;
    this.bmi = weight / (heightInMeters * heightInMeters);
    if (this.bmi < 18.5) {
      this.message = 'under Weight';
    } else if (this.bmi < 24.9) {
      this.message = 'Normal Weight';
    } else if (this.bmi < 29.9) {
      this.message = 'Over Weight';
    }
    else {
      this.message = 'Obese';
    }
  }

  bmiClass() {
    if (!this.bmi) return '';
    if (this.bmi < 18.5) return 'warning';
    else if (this.bmi < 24.9) return 'fine';
    else if (this.bmi < 29.9) return 'danger';
    else return 'moreDanger'
  }

  reset() {
    this.weight = '';
    this.height = '';
    this.message = '';
    this.bmi = null;
  }

}
