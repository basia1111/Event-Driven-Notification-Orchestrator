import { Express } from "express";
import { users } from "../storage/userPreferences";
import { userPreferencesSchema } from "../schemas/preferenceSchema";
import { z } from "zod";

export const preferencesControllerFactory = (app: Express) => {
  app.get("/preferences/:userId", (req, res) => {
    const userId = req.params.userId;

    const userPreferences = users.get(userId);
    if (!userPreferences) {
      return res.status(404).json({ message: `User ${userId} not found` });
    }

    res.status(200).json({ message: "User preferences found", data: userPreferences });
  });

  app.post("/preferences/:userId", (req, res) => {
    const userId = req.params.userId;
    const userPreferences = req.body;

    const result = userPreferencesSchema.safeParse(userPreferences);

    if (!result.success) {
      return res.status(400).send(z.prettifyError(result.error));
    }

    users.set(userId, result.data);
    res.status(200).json({ message: "User preferences set!" });
  });
};
