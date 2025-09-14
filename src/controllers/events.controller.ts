import { Express } from "express";
import { z } from "zod";
import { eventSchema } from "../schemas/eventSchema";
import { users } from "../storage/userPreferences";
import { isInDND } from "../utils/isInDNS";

export const eventsControllerFactory = (app: Express) => {
  app.post("/events", (req, res) => {
    const result = eventSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).send(z.prettifyError(result.error));
    }

    const event = result.data;
    const user = users.get(event.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { dnd, eventSettings } = user;
    const settings = eventSettings[event.eventType];

    if (!settings) {
      return res.status(200).json({
        decision: "DO_NOT_NOTIFY",
        reason: "USER_HAS_NO_SETTINGS_FOR_EVENT",
      });
    }

    if (!settings.enabled) {
      return res.status(200).json({
        decision: "DO_NOT_NOTIFY",
        reason: "USER_UNSUBSCRIBED_FROM_EVENT",
      });
    }

    if (isInDND(event.timestamp, dnd.start, dnd.end)) {
      return res.status(200).json({
        decision: "DO_NOT_NOTIFY",
        reason: "DND_ACTIVE",
      });
    }

    res.status(202).json({
      decision: "PROCESS_NOTIFICATION",
    });
  });
};
