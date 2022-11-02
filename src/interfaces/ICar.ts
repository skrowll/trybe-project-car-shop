import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4).int(),
  seatsQty: z.number().min(2).max(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };