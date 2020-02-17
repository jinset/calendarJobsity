import { TestBed, inject } from '@angular/core/testing';
import { ReminderService } from './reminder.service';
import { Store } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reminder.reducer';

fdescribe('ReminderService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        HttpClientModule,
        StoreModule.forRoot({reducer})
      ],
    });

  });
  it('should be created', () => {
    const service: ReminderService = TestBed.get(ReminderService);
    expect(service).toBeTruthy();
  });

  it('should be add data', () => {
    const service: ReminderService = TestBed.get(ReminderService);

    const reminderServiceSpy: jasmine.Spy = spyOn<any>(service, 'addReminder').and.callThrough();
    const reminderData = {
      id: 'id', reminder: 'reminder data', city: 'city', weather: 'weather', color: 'color', day: 'day', hour: 'hour'
    };
    
    expect(reminderServiceSpy).toHaveBeenCalledWith(reminderData);
  });
});
