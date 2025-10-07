import { Component } from '@angular/core';
import { BasicService } from '../../../services/basic-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-dictionary',
  imports: [CommonModule, FormsModule],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.css'
})
export class Dictionary {
  word: string = '';
  loading: boolean = false;
  error: string | null = null;
  meaning: any = null;
  suggestions: any[] = [];
  private searchTerms$ = new Subject<string>();
  private cache: Record<string, any[]> = {};

  constructor(public dictionary: BasicService) {
    this.searchTerms$.pipe(debounceTime(100),
      distinctUntilChanged(),
      switchMap((term) => this.dictionary.suggestionWords(term)))
      .subscribe((data) => {
        this.suggestions = data;
      })
  }

  onInputChange() {
    if (this.word.trim().length > 0) {
      this.searchTerms$.next(this.word);
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestions(suggestion: string) {
    this.word = suggestion;
    this.suggestions = [];
    this.searchWord();
  }

  ngOnInit() {

  }

  searchWord() {
    if (!this.word.trim()) return;
    this.loading = true;
    this.error = null;
    this.meaning = null;

    this.dictionary.searchWord(this.word).subscribe({
      next: (data) => {
        this.meaning = data[0];
        this.loading = false;
      },
      error: (err) => {
        this.error = "Word Not Found.. Please Try Another One..";
        this.loading = true;
      }
    })

  }
}
