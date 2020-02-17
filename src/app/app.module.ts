import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { WeatherService } from './services/weather.service';
import { AppComponent } from './app.component';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { reducer } from './store/reminder.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    HttpClientModule,
    StoreModule.forRoot({reducer})
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
