export const reducer = (state = [], action) => {
  switch (action.type) {
    case 'addReminder':
      return [...state, action.payload];
    case 'removeReminder':
      return state.filter(reminder => reminder.id !== action.payload.id);
    case 'updateReminder':
        return state.filter(reminder => reminder.id !== action.payload.id);
    default:
      return state;
  }
};
