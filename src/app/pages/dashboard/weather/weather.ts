import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasicService } from '../../../services/basic-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class Weather {
  weatherData: any;
  hourly: any[] = [];
  daily: any[] = [];
  loading = true;
  error = '';
  city = '';
  locationName: string = '';

  constructor(private weatherService: BasicService) { }

  ngOnInit() {
    this.getWeatherByLocation();
  }

  getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.fetchWeather(latitude, longitude)
        },
        (error) => {
          this.error = 'Geolocation Permission Denined or unavailable..';
          this.loading = false;
        }
      )
    } else {
      this.error = 'Geolocation is not supported by this browser';
      this.loading = false;
    }
  }

  searchCityWeather() {
    if (!this.city) return
    console.log("city data", this.city)
    this.loading = true;
    this.error = '';
    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => this.processWeather(data),
      error: (err) => {
        this.error = 'City Not Found OR Failed To Load Weather';
        this.loading = false;
      }
    })
  }

  private processWeather(data: any) {
    console.log("weather data", data)
    this.weatherData = data.current_weather;
    // Prepare hourly data (next 24 hours)
    if(data.hourly && data.hourly.time) {
      this.hourly = data.hourly.time.map((t: string, i: number) => ({
        time: t,
        temperature: data.hourly.temperature_2m[i],
        wind: data.hourly.wind_speed_10m[i],
        precipitation: data.hourly.precipitation[i]
      })).slice(0, 24);
    } else {
      this.hourly = [];
    }

    // Prepare daily data (next 7 days)
    if(data.daily && data.daily.time){
      this.daily = data.daily.time.map((t: string, i: number) => ({
        date: t,
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        precipitation: data.daily.precipitation_sum[i]
      }));
    } else {
      this.daily = [];
    }

    this.loading = false;
  }

  private fetchWeather(latitude: number, longitude: number) {
    this.weatherService.getWeather(latitude, longitude).subscribe({
      next: (data) => {
        this.weatherData = data.current_weather;
        this.loading = false;
      },
      error: () => {
        this.error = 'failed to load weather data..';
        this.loading = false;
      }
    })
  }
}
