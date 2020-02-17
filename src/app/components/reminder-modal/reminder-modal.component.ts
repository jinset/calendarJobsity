import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {WeatherService} from '../../services/weather.service';
import {ReminderService} from '../../services/reminder.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reminder } from 'src/app/interfaces/calendar.interface';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss'],
})
export class ReminderModalComponent implements OnInit {
  @Output() hideModal: EventEmitter<boolean> = new EventEmitter();
  @Input() show: boolean = false;
  @Input() isNew: boolean;
  @Input() selectedDay: number;
  @Input() reminder: Reminder;
  @Input() month: number;
  @Input() year: number;

  reminderForm: FormGroup;
  citiesList = [{name: 'London'}, {name: 'San Jose'}, {name: 'Bogota'}, {name: 'Hamburg'}, {name: 'Munich'}, {name: 'Paris'}];
  color: string;
  selectedCity: string = 'London' ;
  weatherValue: string;
  time = {hour: 13, minute: 30};
  meridian:boolean = true;
  constructor(private ws: WeatherService, private rs: ReminderService, private modalService: NgbModal) { }

  ngOnInit() {
    this.reminderForm = new FormGroup({
      'reminderData': new FormGroup({
        'reminderValue': new FormControl(this.reminder.reminder, [Validators.required]),
        'colorValue': new FormControl(this.reminder.color , [Validators.required]),
        'cityValue': new FormControl(this.reminder.city, [Validators.required]),
        'weatherValue': new FormControl(this.reminder.weather, [Validators.required]),
        'timeValue': new FormControl(this.reminder.hour,[Validators.required]),
        'selectDay': new FormControl(this.selectedDay, [Validators.required]),
        'id': new FormControl(null, [Validators.required])
      })
    });

    if (!this.isNew) {
      this.color = this.reminder.color;
      this.selectedCity = this.reminder.city;
      this.time = {hour: this.reminder.hour.hour, minute: this.reminder.hour.minute}
    }

  }

  converTime() {
    if(this.selectedDay) {
      return new Date(`${this.year}.${this.month}.${this.selectedDay}`).getTime() / 1000;
    } else {
      return new Date(`${this.year}.${this.month}.${this.reminder.day}`).getTime() / 1000;
    }
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  dataChanged(city: string): void {
    let time = this.converTime();
    this.ws.searchWeatherData(city, time).pipe().subscribe(
      data => {
        this.weatherValue = data.weather[0].description;
      }
    );
  }

  closeModal(): void {
    this.reminderForm.reset();
    this.modalService.dismissAll();
  }

  onSubmit(): void {
    this.reminderForm.patchValue({
      'reminderData': {
        'colorValue': this.color,
        'weatherValue': this.weatherValue
      }
    });

    if (this.isNew) {
      this.rs.addReminder(this.reminderForm.value.reminderData);
    } else {
      this.reminderForm.patchValue({
        'reminderData': {
          'id': this.reminder.id
        }
      });
      this.rs.updateReminder(this.reminder.id , this.reminderForm.value.reminderData);
    }
    this.hideModal.emit(false);
    this.closeModal();
  }

}
