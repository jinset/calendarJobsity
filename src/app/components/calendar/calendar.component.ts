import { Component, OnInit, Input} from '@angular/core';
import { Day } from '../../interfaces/calendar.interface';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class CalendarComponent implements OnInit {
  @Input() month: number;
  @Input() year: number;
  showModal: boolean = false;
  arrayDays: Day[] = [];
  isNew: boolean = true;
  selectedDay: number;
  reminder: any = {};

  calendarDays = [{
    name: 'Sunday'
  }, {
    name: 'Monday'
  }, {
    name: 'Tuesday'
  }, {
    name: 'Wednesday'
  }, {
    name: 'Thursday'
  }, {
    name: 'Friday'
  }, {
    name: 'Saturday'
  }];
  trs: number[] = [0 , 1, 2, 4, 5, 6];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private rs: ReminderService)
  {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.generatedDates(this.year, this.month);
  }

  hideModal(hideModal){
    this.generatedDates(this.year, this.month);
  }

  getAllReminders() {
    return this.rs.getAllReminders();
  }

  open(content, data, isNew) {
    this.isNew = isNew;
    if(this.isNew){
      this.selectedDay = data.day;
    } else {
      this.reminder = data;
    }

    this.modalService.open(content);
  }

  generatedDates(year, month) {
    this.arrayDays = [];
    const reminderArray = this.getAllReminders();
    const d = new Date(year, month);
    let cont = -1;
    for (let i = 0; i < d.getDay(); i++) {
      cont = cont+1;
      this.arrayDays.push({day: null, reminders: []});
    }

    while (d.getMonth() === month) {
      cont = cont+1;
      let remindersDay = [];
      this.arrayDays.push({day: d.getDate(), reminders: []});
      reminderArray.map((element: any) => {
        if (element.day === d.getDate()) {
          remindersDay.push(element);
        }
      });

      if (remindersDay.length) {
        this.arrayDays[cont].reminders = remindersDay;
      }
      d.setDate(d.getDate() + 1);
    }

    for (let i = d.getDay(); i < 7; i++) {
      this.arrayDays.push({day: null, reminders: []});
    }
  }

  deleteReminder(id) {
    this.rs.deleteReminderByID(id);
    this.generatedDates(this.year, this.month);
  }

}
