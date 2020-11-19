import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Create a new appointment
appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
