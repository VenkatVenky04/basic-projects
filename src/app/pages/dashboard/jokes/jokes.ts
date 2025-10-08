import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasicService } from '../../../services/basic-service';
import { translations } from './../../../utils/translate';

@Component({
  selector: 'app-jokes',
  imports: [CommonModule, FormsModule],
  templateUrl: './jokes.html',
  styleUrl: './jokes.css'
})
export class Jokes {
  language: string = '';
  joke: string = '';
  loading: boolean = false;
  languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    // { code: 'fr', name: 'French' },
    // { code: 'es', name: 'Spanish' }
  ];
  category = '';
  categories = [
   { code: 'Any', name: 'Any'},
   { code: 'Programming', name: 'Programming'},
   { code: 'Misc', name: 'Misc'},
   { code: 'Pun', name: 'Pun'},
   { code: 'Spooky', name: 'Spooky'},
   { code: 'Christmas', name: 'Christmas'},
   { code: 'Dark', name: 'Dark'},
  ];

  constructor(private jokeService: BasicService){}

  getJoke() {
    this.loading = true;
    this.jokeService.getRandomJokes(this.language, this.category).subscribe({
      next: (jokeData) => {
        this.joke = translations[this.language] ? translations[this.language](jokeData) : jokeData;
        this.loading = false;
      },
      error: () => {
        this.joke = 'Failed to load Joke 😅';
        this.loading = false;
      }
    })
  }
}
