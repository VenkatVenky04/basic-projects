import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class Notes {
  text: string = '';
  notes: string[] = [];
  isEditing: boolean = false;
  editIndex: number = -1;

  ngOnInit() {
    const savedNotes = localStorage.getItem('myNotes');
    if(savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }

  addNote() {
    if(this.text.trim() !== '') {
      this.notes.push(this.text.trim());
      this.text = '';
      localStorage.setItem('myNotes', JSON.stringify(this.notes))
    }

  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    localStorage.setItem('myNotes', JSON.stringify(this.notes));
  }

  editNote(index: number) {
    this.isEditing = true;
    this.editIndex = index;
    this.text = this.notes[index]
  }

  updateNote() {
    if(this.text.trim() !== ''){
      this.notes[this.editIndex] = this.text.trim();
      this.isEditing = false;
      this.text = '';
      this.editIndex = -1;
      this.saveToLocalStorage()
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('myNotes', JSON.stringify(this.notes));
  }
}
