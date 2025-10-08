import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-converter.html',
  styleUrl: './currency-converter.css'
})
export class CurrencyConverter {

}
