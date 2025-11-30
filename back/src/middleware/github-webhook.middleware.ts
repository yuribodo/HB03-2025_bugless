import { Request, Response, NextFunction } from "express";
import githubService from "../services/github.service";

/**
 * Middleware to verify GitHub webhook signatures
 * This must be used with express.raw() to access raw body as Buffer
 */
export const verifyGitHubWebhook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const signature = req.headers["x-hub-signature-256"] as string;

  if (!signature) {
    res.status(401).json({
      success: false,
      message: "Missing X-Hub-Signature-256 header",
    });
    return;
  }

  // Get raw body as string from Buffer (express.raw gives us a Buffer)
  let rawBody: string;
  if (Buffer.isBuffer(req.body)) {
    rawBody = req.body.toString("utf8");
  } else if (typeof req.body === "string") {
    rawBody = req.body;
  } else {
    // Fallback - but this shouldn't happen with express.raw()
    rawBody = JSON.stringify(req.body);
  }

  const isValid = githubService.verifyWebhookSignature(rawBody, signature);

  if (!isValid) {
    console.warn("[GitHubWebhook] Invalid webhook signature");
    res.status(401).json({
      success: false,
      message: "Invalid webhook signature",
    });
    return;
  }

  // Parse the raw body to JSON
  try {
    req.body = JSON.parse(rawBody);
  } catch {
    res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
    return;
  }

  next();
};
