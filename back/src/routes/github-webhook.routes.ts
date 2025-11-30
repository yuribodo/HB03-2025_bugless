import { Router } from "express";
import githubWebhookController from "../controllers/github-webhook.controller";
import { verifyGitHubWebhook } from "../middleware/github-webhook.middleware";

const githubWebhookRouter = Router();

// GitHub webhook endpoint
// Note: Does not use authMiddleware - uses webhook signature verification instead
githubWebhookRouter.post(
  "/",
  verifyGitHubWebhook,
  githubWebhookController.handleWebhook.bind(githubWebhookController)
);

export default githubWebhookRouter;
