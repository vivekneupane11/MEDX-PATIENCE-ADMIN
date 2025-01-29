export type UserRole = 'coordinator' | 'technician' | 'doctor';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  specialization?: string;
  licenseNumber?: string;
  zone?: string;
  certifications?: string[];
}

export interface OnboardingState {
  step: number;
  role?: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialization: string;
  licenseNumber: string;
  zone: string;
  certifications: string[];
}