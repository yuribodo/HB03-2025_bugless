import { z } from "zod";

// Pull Request Event Schema
export const pullRequestPayloadSchema = z.object({
  action: z.string(),
  number: z.number(),
  pull_request: z.object({
    head: z.object({
      ref: z.string(),
      sha: z.string(),
    }),
    base: z.object({
      ref: z.string(),
    }),
    title: z.string(),
    body: z.string().nullable(),
  }),
  repository: z.object({
    name: z.string(),
    owner: z.object({
      login: z.string(),
    }),
  }),
  installation: z.object({
    id: z.number(),
  }),
});

export type PullRequestPayload = z.infer<typeof pullRequestPayloadSchema>;

// Installation Event Schema
export const installationPayloadSchema = z.object({
  action: z.string(),
  installation: z.object({
    id: z.number(),
    account: z.object({
      login: z.string(),
      type: z.string(),
    }),
  }),
});

export type InstallationPayload = z.infer<typeof installationPayloadSchema>;

// Generic Webhook Event Schema (for routing)
export const webhookEventSchema = z.object({
  action: z.string().optional(),
});

export type WebhookEvent = z.infer<typeof webhookEventSchema>;
