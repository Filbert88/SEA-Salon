import { Prisma } from '@prisma/client';
import { db } from './db';

// Define a type for the reservation including nested relations
type ReservationDetails = Prisma.ReservationGetPayload<{
  include: {
    user: true;
    branch: true;
    stylist: true;
    services: {
      include: {
        service: true;
      };
    };
  };
}>

export default ReservationDetails;
