import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr';

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
  timezone: string;
}

interface Idea {
  id: number;
  detail: string;
  uname: string;
  ulogo: string;
  uid: number;
  ctime: Date;
  collection: number;
}
interface IUser {
  id: number;
  name: string;
  bio: string;
  logo: string;
}

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public githubJSData: {};
  public articleList: Article[];
  public topMovies: IMovie[];
  public weather: IWeather = {
    icon: '',
    time: null,
    temperature: null,
    timezone: null
  };
  public editorConfig: any = {};
  public ideas: Idea[] = [];
  public initEditorContent: string = null;
  public isHasData: boolean = true;

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

  private editorDetail: string;
  private user: IUser;
  private currentPage: number = 1;

  constructor(private homeService: HomeService, private titleService: Title, public vRef: ViewContainerRef, private toastr: ToastsManager) {
    this.titleService.setTitle('Home - Honeymorning');
    this.toastr.setRootViewContainerRef(vRef);
    this.editorConfig = {
      toolbarOptions: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ['formula', 'blockquote', 'code-block']
      ],
     height: 100
    };
  }

  public ngOnInit() {
    this.initArticle();
    this.initMovie();
    this.initGeoLocation();
    this.analyseGithubJs();
    this.getIdea();
  }

  public getEditorDetail(detail: string) {
    this.editorDetail = JSON.parse(detail).detail;
  }

  public pushIdea() {
    if (!this.validateUser()) {
      this.toastr.warning('Please login first.', 'Warning');
      return;
    } else if (!this.editorDetail) {
      this.toastr.warning('Please white your idea.');
      return;
    }
    const param = {
      detail: this.editorDetail,
      uname: this.user.name,
      ulogo: this.user.logo,
      uid: this.user.id,
      collection: 0
    };
    this.homeService.addNewIdea(param).subscribe((result) => {
      if (2000 === result.code) {
        this.initEditorContent = null;
        this.editorDetail = null;
        this.toastr.success('Push success', 'Success');
        this.currentPage = 1;
        this.getIdea();
      }
    }, (error) => {
      console.warn(error);
    });
  }


  /**
   * 获取IDEA
   *
   * @returns
   * @memberof HomeComponent
   */
  public getIdea() {
    if (!this.isHasData) {
      this.toastr.warning('There does not has more data', 'Tip');
      return;
    }
    this.homeService.getIdea(this.currentPage).subscribe((result) => {
      if (2000 === result.code) {
        this.ideas = this.ideas.concat(result.data);

        if (result.data && result.data.length === 10) {
          this.currentPage++;
        } else if (result.data.length < 10 && result.data.length > 0) {
          this.isHasData = false;
        }
      }
    }, (error) => {
      console.warn(error);
    });
  }

  /**
   * 获取新的Idea
   *
   * @memberof HomeComponent
   */
  public getNewIdeas() {
    this.ideas = [].concat(this.ideas);
  }

  private validateUser() {
    const cookie = document.cookie;
    const user: IUser = JSON.parse(localStorage.getItem('user'));

    if (cookie && /isLogin=true/.test(cookie) && user && user.name) {
      this.user = user;
      return true;
    } else {
      return false;
    }
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
      this.weather.temperature = ((res.currently.temperature - 32) / 1.8).toFixed(2) + ' ℃';
      this.weather.timezone = res.timezone;
    }, (error) => {
      console.warn(error);
    });
  }

  /**
   * analyse githus js
   *
   * @private
   * @memberof HomeComponent
   */
  private analyseGithubJs() {
    this.homeService.analyseGithubJs().subscribe((result) => {
      const data: number[] = [];
      const labels: string[] = [];
      result.items.forEach((e: any) => {
        data.push(e.stargazers_count);
        labels.push(e.name);
      });

      this.githubJSData = {
        data,
        labels
      };
    }, (error) => {
      console.error(error);
    });
  }

}
