import { SubmissionModeEnum } from '../generated/prisma/enums';
import geminiConfig from '../config/gemini.config';

class GeminiAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'GeminiAPIError';
  }
}


class GeminiPromptService {
  private static instance: GeminiPromptService;
  private model: any;


  private readonly PR_DIFF_PROMPT = `
# CONTEXT
You are a Senior Software Engineer conducting a thorough code review on a Pull Request diff. The changes are critical for production deployment.

# OBJECTIVE
Analyze the git diff and produce a comprehensive code review focused on:
1. Security vulnerabilities (SQL injection, XSS, authentication flaws)
2. Performance bottlenecks (N+1 queries, inefficient algorithms, memory leaks)
3. Code quality issues (SOLID violations, code smells, anti-patterns)
4. Architectural concerns (breaking changes, coupling, scalability)

# OUTPUT FORMAT REQUIREMENT

You MUST format your response EXACTLY as follows:

Review Summary

Score: [0-100]/100

Issues: [X] critical, [Y] warnings, [Z] suggestions, [W] info

Files reviewed: [N]

[1-2 sentence overall assessment based on score and findings]

________________________________________________

Issues Found ([TOTAL]):

[!!] CRITICAL (security)
file/path.ts:42
Issue title
Detailed explanation of the critical security issue.

Suggestion: How to fix it securely.

---

[!] WARNING (performance)
file/path.ts:15
Issue title
Performance concern description.

Suggestion: Optimization recommendation.

---

[*] SUGGESTION (maintainability)
file/path.ts:8
Issue title
Code quality improvement opportunity.

Suggestion: Refactoring idea.

---

[i] INFO (positive)
Well-implemented pattern or improvement noted.

________________________________________________

# SEVERITY GUIDELINES
- CRITICAL (!!): Security vulnerabilities, data loss, crashes, breaking changes
- WARNING (!): Performance issues, deprecated APIs, bad practices
- SUGGESTION (*): Code quality, refactoring, style improvements
- INFO (i): Positive highlights, patterns used, good practices

# SCORING RUBRIC
Calculate score (0-100):
- Start at 100
- Subtract 20-25 per CRITICAL security/breaking issue
- Subtract 10-15 per other CRITICAL issue
- Subtract 5-10 per WARNING
- Subtract 2-5 per SUGGESTION
- Minimum: 0

# FILE COUNTING
Count unique files in the diff (files with +++ markers).

Now analyze the following diff:

`;

  private readonly UNCOMMITTED_PROMPT = `
# Pair Programming Assistant - Bug Detection & Logic Analysis

You are helping debug and improve uncommitted code. Analyze systematically to find bugs and logic issues.

# ANALYSIS FOCUS
- Null/undefined reference errors
- Off-by-one errors
- Incorrect conditional logic
- Type mismatches
- Race conditions / async issues
- Missing validation
- Complex logic that can be simplified

# OUTPUT FORMAT REQUIREMENT

You MUST format your response EXACTLY as follows:

Review Summary

Score: [0-100]/100

Issues: [X] critical, [Y] warnings, [Z] suggestions, [W] info

Files reviewed: [N]

[1-2 sentence assessment of code quality and bugs found]

________________________________________________

Issues Found ([TOTAL]):

[!!] CRITICAL (null-safety)
file.ts:23
Bug title
Detailed explanation of the bug and its impact.

Suggestion: How to fix the bug.

---

[!] WARNING (logic-error)
file.ts:45
Logic issue title
Description of the potential problem.

Suggestion: Recommended fix.

---

[*] SUGGESTION (complexity)
file.ts:12
Improvement title
Refactoring opportunity explanation.

Suggestion: How to simplify.

---

[i] INFO (testing)
Testing recommendation or positive observation.

________________________________________________

# SEVERITY GUIDELINES
- CRITICAL (!!): Bugs causing crashes, data corruption, runtime errors
- WARNING (!): Logic errors, edge case failures, potential bugs
- SUGGESTION (*): Code simplification, better naming, refactoring
- INFO (i): Testing recommendations, positive patterns

# SCORING RUBRIC
- Start at 100
- Subtract 20-25 per CRITICAL bug
- Subtract 5-10 per WARNING
- Subtract 2-5 per SUGGESTION
- Minimum: 0

Now analyze this uncommitted code:

`;

  private readonly COMMIT_PROMPT = `
# Conventional Commit Message Generator

You are a Git workflow expert tasked with generating a properly formatted conventional commit message based on the provided code changes.

## Conventional Commits Format

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

## Types (use most appropriate):
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, no logic change)
- refactor: Code refactoring (no functional change)
- perf: Performance improvements
- test: Adding or modifying tests
- build: Build system or dependency changes
- ci: CI/CD configuration changes
- chore: Other changes (tooling, etc.)

## Rules:
1. Use lowercase for type and description
2. No period at end of description
3. Description should complete: "This commit will..."
4. Body should explain WHAT and WHY, not HOW
5. Keep description under 72 characters
6. Reference issue numbers in footer if applicable

## Analysis Process:

1. Review the changes to understand their purpose
2. Identify the primary type of change
3. Determine appropriate scope (component/file area affected)
4. Write concise description
5. Add body only if context is needed
6. Include breaking changes in footer if applicable

## Response Format:

Provide ONLY the commit message in this format (no additional commentary):

<type>(scope): <description>

<body - optional, explain what and why>

<footer - optional, breaking changes or issue references>

Now analyze these changes and generate a conventional commit message:

`;

  private readonly CUSTOM_PROMPT = `
# Code Explanation Assistant

You are a knowledgeable software engineer providing clear, comprehensive explanations of code for developers who want to understand what they're looking at.

## Analysis Approach

Provide a thorough explanation covering:

1. **High-Level Overview**
   - What is the purpose of this code?
   - What problem does it solve?

2. **Code Structure**
   - Main components (functions, classes, modules)
   - How they interact with each other
   - Data flow and transformations

3. **Technical Details**
   - Key algorithms or patterns used
   - Important logic or business rules
   - External dependencies or integrations

4. **Complexity & Quality Assessment**
   - Code complexity level (simple/moderate/complex)
   - Notable patterns or anti-patterns
   - Potential areas of concern

5. **Usage Context**
   - How this code would typically be used
   - Expected inputs and outputs
   - Common scenarios or use cases

## Response Format

### Overview
[High-level explanation in 2-3 sentences]

### Detailed Explanation
[Comprehensive breakdown of the code structure and logic]

### Key Components
- Component 1: [Description]
- Component 2: [Description]

### Technical Highlights
[Notable patterns, algorithms, or implementation details]

### Quality Notes
[Assessment of code quality and potential improvements]

Now explain the following code:

`;


  private constructor() {
    // Obter modelo do config centralizado
    this.model = geminiConfig.getModel();
    console.log('[GeminiPromptService] Service initialized successfully');

  }


  static getInstance(): GeminiPromptService {
    if (!GeminiPromptService.instance) {
      GeminiPromptService.instance = new GeminiPromptService();
    }
    return GeminiPromptService.instance;
  }

  async generateAnalysis(
    codeContent: string,
    submissionMode: SubmissionModeEnum
  ): Promise<string> {
    try {
      const systemInstruction = this.getSystemInstructions(submissionMode);

      const fullPrompt = systemInstruction + codeContent;

      const result = await this.model.generateContent(fullPrompt);
      const response = result.response;
      const analysisText = response.text();

      return analysisText;
    } catch (error) {
      return this.handleAPIError(error);
    }
  }

  private getSystemInstructions(mode: SubmissionModeEnum): string {
    switch (mode) {
      case SubmissionModeEnum.PR_DIFF:
        return this.PR_DIFF_PROMPT;

      case SubmissionModeEnum.UNCOMMITTED:
        return this.UNCOMMITTED_PROMPT;

      case SubmissionModeEnum.COMMIT:
        return this.COMMIT_PROMPT;

      case SubmissionModeEnum.CUSTOM:
        return this.CUSTOM_PROMPT;

      default:
        // Exhaustive check - TypeScript will error if new mode added
        const exhaustiveCheck: never = mode;
        throw new Error(`Unhandled submission mode: ${exhaustiveCheck}`);
    }
  }


  private handleAPIError(error: unknown): never {
    console.error('[GeminiPromptService] Error occurred:', {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : error
    });

    if (
      error instanceof TypeError &&
      (error.message.includes('fetch') || error.message.includes('network'))
    ) {
      throw new GeminiAPIError(
        'Network error: Unable to reach Gemini API',
        503,
        error
      );
    }

    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const statusCode = (error as any).statusCode;

      if (statusCode === 429) {
        throw new GeminiAPIError(
          'Rate limit exceeded. Please try again later',
          429,
          error
        );
      }

      if (statusCode === 401 || statusCode === 403) {
        throw new GeminiAPIError(
          'Invalid or unauthorized API key',
          401,
          error
        );
      }
    }

    // Content safety filtering
    if (error instanceof Error && error.message.includes('SAFETY')) {
      throw new GeminiAPIError(
        'Content filtered by safety settings',
        400,
        error
      );
    }

    // Generic error fallback
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new GeminiAPIError(`Gemini API error: ${message}`, 500, error);
  }
}

export default GeminiPromptService.getInstance();
