export interface Day {
  day: number;
  reminders?: Array<any>;
}

export interface Reminder {
  reminder: string;
  city: string;
  weather: string;
  color: string;
  day: number;
  hour: {
    hour: number,
    minute: number
  };
  id?: number;
}

