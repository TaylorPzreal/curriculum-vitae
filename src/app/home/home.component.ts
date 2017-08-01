import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { Article } from './article';
import 'lazysizes'; // 图片懒加载
import 'weather-icons/css/weather-icons.min.css';

interface IMovie {
  id: number;
  name: string;
  yeay: number;
  summary: string;
  country: string;
  type: string;
  publicDate: Date;
  logo: string;
}

interface IWeather {
  icon: string;
  time: number;
  temperature: string;
}

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public articleList: Article[];
  public topMovies: IMovie[];
  public weather: IWeather = {
    icon: '',
    time: null,
    temperature: null
  };
  private icon = {
    'clear-day': 'wi wi-day-sunny',
    'clear-night': 'wi wi-night-clear',
    'rain': 'wi wi-rain',
    'snow': 'wi wi-snow',
    'select': 'wi wi-sleet',
    'wind': 'wi wi-windy',
    'fog': 'wi wi-fog',
    'cloudy': 'wi wi-cloudy',
    'partly-cloudy-day': 'wi wi-day-cloudy-gusts',
    'partly-cloudy-night': 'wi wi-night-alt-cloudy-gusts'
  };

  constructor(private homeService: HomeService) { }

  public ngOnInit() {
    this.initArticle();
    this.initMovie();
    this.initGeoLocation();
  }

  private initArticle() {
    this.homeService.getArticle().subscribe(
      (result: any) => {
        if (2000 === result.code) {
          this.articleList = result.data;
        } else {
          console.error(result.msg);
        }
      },
      (error: any) => {
        console.warn(error);
      }
    );
  }

  private initMovie() {
    this.homeService.getTopMovie().subscribe(
      (result: any) => {
        if (2000 === result.code) {
          this.topMovies = result.data;
        } else {
          console.error(result.msg);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  private initGeoLocation() {
    if ('geolocation' in navigator) { // use geolocation
      navigator.geolocation.getCurrentPosition((pos) => {
        return `${pos.coords.latitude},${pos.coords.longitude}`;
      }, (error) => {
        console.warn(error);
        this.homeService.getPositionByIp().subscribe((res) => {
          this.getWeather(res.loc);
        });
      }, {
        timeout: 3000,
        maximumAge: 75000,
        enableHighAccuracy: true
      });
    } else { // use ip
      this.homeService.getPositionByIp().subscribe((res) => {
        this.getWeather(res.loc);
      });
    }
  }

  private getWeather(loc: string) {
    this.homeService.getWeather(loc).subscribe((res) => {
      this.weather.icon = this.icon[res.currently.icon];
      this.weather.time = res.currently.time * 1000;
      this.weather.temperature = res.currently.temperature + ' ℉';
    }, (error) => {
      console.warn(error);
    });
  }
}
