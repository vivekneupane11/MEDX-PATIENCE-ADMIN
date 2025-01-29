import { z } from 'zod';

export const coordinatorSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phoneNumber: z.string().regex(/^[0-9+\s-]{10,}$/, 'Numéro de téléphone invalide'),
  role: z.literal('coordinator')
});

export const technicianSchema = coordinatorSchema.extend({
  role: z.literal('technician'),
  zone: z.string().min(2, 'Zone d\'intervention requise'),
  certifications: z.array(z.string()).optional()
});

export const doctorSchema = coordinatorSchema.extend({
  role: z.literal('doctor'),
  specialization: z.string().min(2, 'Spécialisation requise'),
  licenseNumber: z.string().min(5, 'Numéro RPPS invalide')
});