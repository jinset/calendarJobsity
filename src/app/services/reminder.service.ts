import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  reminder: any[] = [];

  constructor(private _store: Store<any>) {
    _store.select('reducer').subscribe(reminder => {
      this.reminder = reminder;
    });
  }

  addReminder(reminder: any): void {
    this._store.dispatch({
      type: 'addReminder',
      payload: {
        id: uuid.v4(),
        reminder: reminder.reminderValue,
        city: reminder.cityValue,
        weather: reminder.weatherValue,
        color: reminder.colorValue,
        day: reminder.selectDay,
        hour: reminder.timeValue
      }
    });
  }

  deleteReminderByID(reminderId: number): void {
    this._store.dispatch({
      type: 'removeReminder',
      payload: {id: reminderId}
    });
  }

  updateReminder(id, reminder:any): void {
    const indexArray = this.reminder.findIndex((data:any) => data.id === id);

    const data = {
      reminder: reminder.reminderValue,
      city: reminder.cityValue,
      weather: reminder.weatherValue,
      color: reminder.colorValue,
      day: reminder.selectDay,
      hour: reminder.timeValue,
      id: reminder.id
    }
    this.reminder[indexArray] = data;
  }

  getAllReminders() {
    return this.reminder;
  }
}
