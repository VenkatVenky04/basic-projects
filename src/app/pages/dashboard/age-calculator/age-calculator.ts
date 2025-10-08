import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-age-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './age-calculator.html',
  styleUrl: './age-calculator.css'
})
export class AgeCalculator {
  enterDate!: string;
  ageResult: string = '';
  private intervalId: any;

  calculate() {
    if(!this.enterDate) {
      this.ageResult = 'Please Select Your Date of Birth...';
      return;
    }

    if(this.intervalId) clearInterval(this.intervalId);

    this.updateAge();
    this.intervalId = setInterval(() => {
      this.updateAge();
    }, 1000);
  }

  updateAge() {
    const today = new Date();
    const dob = new Date(this.enterDate);

    if(dob > today) {
      this.ageResult = 'Invalid date! You entered a future date.';
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    const diffMs = today.getTime() - dob.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor( totalMinutes / 60);

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    if(days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    }

    if(months < 0) {
      years--;
      months += 12;
    }

    this.ageResult = `${years} Years ${months} Months ${days} Days ${minutes} Minutes ${seconds} Seconds`
  }

  ngOnDestroy() {
    if(this.intervalId) clearInterval(this.intervalId);
  }
}
