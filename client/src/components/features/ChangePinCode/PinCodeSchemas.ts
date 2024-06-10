import { z } from 'zod';

export const EnterPinCodeSchema = z.object({
  pinCode: z
    .string()
    .min(0, 'Pin-code is required')
    .regex(/^[0-9]+$/, 'Pin-code must contain only digits')
    .min(4, 'Code length must be at least 4')
    .max(8, 'Maximum length is 8'),
});

export const CurrentPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Max length is 20'),
});

export const PinCodePasswordSchema = EnterPinCodeSchema.extend({
  currentPassword: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Max length is 20'),
});

export type CurrentPasswordValues = z.infer<typeof CurrentPasswordSchema>;
export type EnterPinCodeValues = z.infer<typeof EnterPinCodeSchema>;
export type PinCodePasswordValues = z.infer<typeof PinCodePasswordSchema>;

export const getSetPinCodeSchema = (resetMode: boolean) => {
  if (resetMode) {
    return CurrentPasswordSchema;
  }

  return PinCodePasswordSchema;
};

export type EnterPinCodeType = z.infer<typeof EnterPinCodeSchema>;
