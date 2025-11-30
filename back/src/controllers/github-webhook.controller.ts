import { Request, Response } from "express";
import { ZodError } from "zod";
import githubWebhookService from "../services/github-webhook.service";
import {
  pullRequestPayloadSchema,
  installationPayloadSchema,
} from "../schemas/github-webhook.schema";

class GitHubWebhookController {
  /**
   * Handle incoming GitHub webhook events
   */
  async handleWebhook(req: Request, res: Response): Promise<void> {
    const eventType = req.headers["x-github-event"] as string;
    const deliveryId = req.headers["x-github-delivery"] as string;

    console.log(`[GitHubWebhook] Received event: ${eventType} (${deliveryId})`);

    try {
      switch (eventType) {
        case "pull_request":
          await this.handlePullRequest(req, res);
          break;

        case "installation":
          await this.handleInstallation(req, res);
          break;

        case "ping":
          // GitHub sends a ping event when webhook is first configured
          console.log("[GitHubWebhook] Ping received - webhook configured successfully");
          res.status(200).json({
            success: true,
            message: "Pong! Webhook configured successfully",
          });
          break;

        default:
          console.log(`[GitHubWebhook] Ignoring event type: ${eventType}`);
          res.status(200).json({
            success: true,
            message: `Event type '${eventType}' is not handled`,
          });
      }
    } catch (error) {
      console.error("[GitHubWebhook] Error processing webhook:", error);

      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid payload structure",
          errors: error.errors,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error processing webhook",
      });
    }
  }

  /**
   * Handle pull_request events
   */
  private async handlePullRequest(req: Request, res: Response): Promise<void> {
    const payload = pullRequestPayloadSchema.parse(req.body);

    // Process asynchronously - return 200 immediately
    res.status(200).json({
      success: true,
      message: `Processing pull_request.${payload.action} event`,
    });

    // Handle the event in the background
    githubWebhookService.handlePullRequestEvent(payload).catch((error) => {
      console.error("[GitHubWebhook] Error processing pull_request event:", error);
    });
  }

  /**
   * Handle installation events
   */
  private async handleInstallation(req: Request, res: Response): Promise<void> {
    const payload = installationPayloadSchema.parse(req.body);

    // Process asynchronously - return 200 immediately
    res.status(200).json({
      success: true,
      message: `Processing installation.${payload.action} event`,
    });

    // Handle the event in the background
    githubWebhookService.handleInstallationEvent(payload).catch((error) => {
      console.error("[GitHubWebhook] Error processing installation event:", error);
    });
  }
}

export default new GitHubWebhookController();
