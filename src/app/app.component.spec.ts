// import '@angular/material/prebuilt-themes/indigo-pink.css';

import 'hammerjs';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule, ToastsManager } from 'ng2-toastr';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent Testing', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let appService: AppService;

  beforeEach(
    async(() => {
      const appServiceStub = {
        isLoggedIn: true,
        user: {
          name: 'test',
          bio: 'not has',
          logo: ''
        }
      };

      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [BrowserModule, FormsModule, RouterTestingModule, ToastModule.forRoot()],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true
          },
          {
            provide: AppService,
            useValue: appServiceStub
          }
        ]
      }).compileComponents(); // compile template and scss
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;

      // AppService from the root injector
      appService = fixture.debugElement.injector.get(AppService); // TestBed.get(AppService);

      de = fixture.debugElement.query(By.css('.user-logo>span'));
      el = de.nativeElement;
    })
  );
  it('should work', () => {
    comp.userInfo = {
      id: 1,
      name: 'test',
      bio: 'bio',
      logo: null
    };
    expect(el.textContent).toContain(comp.userInfo.name);
  });
});
