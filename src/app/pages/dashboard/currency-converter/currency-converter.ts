import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, FormsModule, MatSelectModule,],
  templateUrl: './currency-converter.html',
  styleUrl: './currency-converter.css'
})
export class CurrencyConverter {
  enterAmount: number = 1;
  fromCurrency: string = 'INR';
  toCurrency: string = 'USD';
  currencies: string[] = [];
  result: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        this.currencies = Object.keys(data.rates);
      },
      error: (err) => {
        console.error('Failed to load currencies:', err);
        alert('Error loading currency list');
      }
    })
  }

  convertCurrency() {
    if(!this.enterAmount || this.enterAmount <= 0) {
      alert('Please enter a valid Amount!');
      return;
    }

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`;

    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        const rate = data.rates[this.toCurrency];
        this.result = this.enterAmount * rate;
      },
      error: (err) => {
        console.error('Error fetching exchange rate:', err);
        alert('Failed to fetch exchange rate..');
      }
    })
  }

}
