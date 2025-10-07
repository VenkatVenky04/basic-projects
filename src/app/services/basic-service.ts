import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  private weatherApi = 'https://api.open-meteo.com/v1/forecast';
  private geocodeApi = 'https://nominatim.openstreetmap.org/search';
  private apiDictionaryUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  private suggestionApi = 'https://api.datamuse.com/sug?s=';


  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.weatherApi}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
  }

  // Convert city name to lat/lon
  getCoordinates(city: string): Observable<{ lat: number; lon: number }> {
    return this.http.get<any[]>(`${this.geocodeApi}?q=${city}&format=json&limit=1`).pipe(
      map((res) => {
        if (res.length === 0) throw new Error('City not found');
        return { lat: parseFloat(res[0].lat), lon: parseFloat(res[0].lon) };
      })
    );
  }

  // Get weather by city name
  getWeatherByCity(city: string): Observable<any> {
    return this.getCoordinates(city).pipe(
      switchMap(({ lat, lon }) => this.getWeather(lat, lon))
    );
  }

  searchWord(word: string): Observable<any> {
    return this.http.get(`${this.apiDictionaryUrl}${word}`)
  }

  suggestionWords(relatedWords: string): Observable<any> {
    return this.http.get(`${this.suggestionApi}${relatedWords}`)
  }

}
