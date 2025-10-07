import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo {
  task: string = '';
  tasks: { text: string, completed: boolean}[] = [];
  message: string = '';

  ngOnInit() {
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  addTask() {
    if(this.task === '') {
      this.message = "Plese add you task data";
    } else {
      this.message = ""
    }
    if(!this.task.trim()) return;
    this.tasks.push({text: this.task, completed: false})
    this.task = '';
    this.saveTasks();
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
