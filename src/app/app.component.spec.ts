import '@angular/material/prebuilt-themes/indigo-pink.css';

import 'hammerjs';
import { TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  });
  it ('should work', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
