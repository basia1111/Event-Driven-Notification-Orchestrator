import { z } from "zod";

const dndTime = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "Time must be provided and fllow 24-hour HH:MM format" });

const dndSchema = z.object({
  start: dndTime,
  end: dndTime,
});

const eventSettingsSchema = z.record(
  z.string(),
  z.object({
    enabled: z.boolean({ message: "Setting must be true or false" }),
  })
);

export const userPreferencesSchema = z.object({
  dnd: dndSchema,
  eventSettings: eventSettingsSchema,
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;
