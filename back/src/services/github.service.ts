import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import crypto from "crypto";
import envLoader from "./env-loader.service";

class GitHubService {
  private static instance: GitHubService;
  private appId: string | null = null;
  private privateKey: string | null = null;

  private constructor() {
    this.initializeApp();
  }

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  private initializeApp(): void {
    const appId = envLoader.getEnv("GITHUB_APP_ID");
    const privateKey = envLoader.getEnv("GITHUB_PRIVATE_KEY");

    if (!appId || !privateKey) {
      console.warn("[GitHubService] GitHub App not configured - missing GITHUB_APP_ID or GITHUB_PRIVATE_KEY");
      return;
    }

    // Handle private key with escaped newlines
    this.appId = appId;
    this.privateKey = privateKey.replace(/\\n/g, "\n");

    console.log("[GitHubService] GitHub App configured successfully");
  }

  /**
   * Verify webhook signature using X-Hub-Signature-256
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const secret = envLoader.getEnv("GITHUB_WEBHOOK_SECRET");

    if (!secret) {
      console.error("[GitHubService] GITHUB_WEBHOOK_SECRET not configured");
      return false;
    }

    const expectedSignature = `sha256=${crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex")}`;

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Get an authenticated Octokit client for a specific installation
   */
  async getInstallationClient(installationId: string): Promise<Octokit | null> {
    if (!this.appId || !this.privateKey) {
      console.error("[GitHubService] GitHub App not configured");
      return null;
    }

    try {
      const octokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId: this.appId,
          privateKey: this.privateKey,
          installationId: Number(installationId),
        },
      });

      return octokit;
    } catch (error) {
      console.error("[GitHubService] Failed to create installation client:", error);
      return null;
    }
  }

  /**
   * Get the diff content of a pull request
   */
  async getPullRequestDiff(
    installationId: string,
    owner: string,
    repo: string,
    prNumber: number
  ): Promise<string | null> {
    const octokit = await this.getInstallationClient(installationId);

    if (!octokit) {
      return null;
    }

    try {
      const response = await octokit.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
        mediaType: {
          format: "diff",
        },
      });

      return response.data as unknown as string;
    } catch (error) {
      console.error("[GitHubService] Failed to get PR diff:", error);
      return null;
    }
  }

  /**
   * Post a comment on a pull request
   */
  async postComment(
    installationId: string,
    owner: string,
    repo: string,
    prNumber: number,
    body: string
  ): Promise<boolean> {
    const octokit = await this.getInstallationClient(installationId);

    if (!octokit) {
      return false;
    }

    try {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body,
      });

      console.log(`[GitHubService] Posted comment on ${owner}/${repo}#${prNumber}`);
      return true;
    } catch (error) {
      console.error("[GitHubService] Failed to post comment:", error);
      return false;
    }
  }

  /**
   * Get pull request details
   */
  async getPullRequest(
    installationId: string,
    owner: string,
    repo: string,
    prNumber: number
  ) {
    const octokit = await this.getInstallationClient(installationId);

    if (!octokit) {
      return null;
    }

    try {
      const response = await octokit.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
      });

      return response.data;
    } catch (error) {
      console.error("[GitHubService] Failed to get PR:", error);
      return null;
    }
  }

  /**
   * Check if the GitHub App is configured
   */
  isConfigured(): boolean {
    return this.appId !== null && this.privateKey !== null;
  }

  /**
   * Create a Check Run with "in_progress" status
   */
  async createCheckRun(
    installationId: string,
    owner: string,
    repo: string,
    headSha: string,
    name: string = "BugLess Code Review"
  ): Promise<number | null> {
    const octokit = await this.getInstallationClient(installationId);

    if (!octokit) {
      return null;
    }

    try {
      const response = await octokit.checks.create({
        owner,
        repo,
        name,
        head_sha: headSha,
        status: "in_progress",
        started_at: new Date().toISOString(),
        output: {
          title: "Analyzing code...",
          summary: "BugLess is reviewing your pull request.",
        },
      });

      console.log(`[GitHubService] Created check run ${response.data.id} for ${owner}/${repo}`);
      return response.data.id;
    } catch (error) {
      console.error("[GitHubService] Failed to create check run:", error);
      return null;
    }
  }

  /**
   * Update a Check Run with the final result
   */
  async updateCheckRun(
    installationId: string,
    owner: string,
    repo: string,
    checkRunId: number,
    conclusion: "success" | "failure" | "neutral",
    output: {
      title: string;
      summary: string;
      text?: string;
    }
  ): Promise<boolean> {
    const octokit = await this.getInstallationClient(installationId);

    if (!octokit) {
      return false;
    }

    try {
      await octokit.checks.update({
        owner,
        repo,
        check_run_id: checkRunId,
        status: "completed",
        conclusion,
        completed_at: new Date().toISOString(),
        output,
      });

      console.log(`[GitHubService] Updated check run ${checkRunId} with conclusion: ${conclusion}`);
      return true;
    } catch (error) {
      console.error("[GitHubService] Failed to update check run:", error);
      return false;
    }
  }
}

export default GitHubService.getInstance();
