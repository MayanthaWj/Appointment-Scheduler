export type Slot = {
  id: number;
  dateTime: string;
  isBooked: boolean;
  booking?: Appointment;
};

export type Appointment = {
  id: number;
  name: string;
  email: string;
  slotId: number;
};
