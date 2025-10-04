import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { Calculator } from './pages/dashboard/calculator/calculator';
import { BmiCalculator } from './pages/dashboard/bmi-calculator/bmi-calculator';
import { Todo } from './pages/dashboard/todo/todo';
import { AgeCalculator } from './pages/dashboard/age-calculator/age-calculator';
import { CurrencyConverter } from './pages/dashboard/currency-converter/currency-converter';
import { Dictionary } from './pages/dashboard/dictionary/dictionary';
import { Jokes } from './pages/dashboard/jokes/jokes';
import { Notes } from './pages/dashboard/notes/notes';
import { SnakeGame } from './pages/dashboard/snake-game/snake-game';
import { Stopwatch } from './pages/dashboard/stopwatch/stopwatch';
import { Weather } from './pages/dashboard/weather/weather';
import { Tables } from './pages/dashboard/tables/tables';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'calculator', component: Calculator },
    { path: 'bmi-calculator', component: BmiCalculator },
    { path: 'age-calculator', component: AgeCalculator },
    { path: 'currency', component: CurrencyConverter },
    { path: 'dictionary', component: Dictionary },
    { path: 'jokes', component: Jokes },
    { path: 'notes', component: Notes },
    { path: 'snake-game', component: SnakeGame },
    { path: 'stopwatch', component: Stopwatch },
    { path: 'weather', component: Weather },
    { path: 'todo', component: Todo },
    { path: 'tables', component: Tables}
];

