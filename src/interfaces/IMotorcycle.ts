import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().max(2500).positive().int(),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { motorcycleZodSchema, IMotorcycle };