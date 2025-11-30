import { GoogleGenAI } from '@google/genai';
import envLoader from '../services/env-loader.service';

/**
 * Gemini AI Configuration
 * Singleton pattern para gerenciar a conexão com Google Generative AI
 */
class GeminiConfig {
  private static instance: GeminiConfig;
  private googleAI: GoogleGenAI;
  private generativeModel: any;

  private constructor() {
    const apiKey = envLoader.getEnv('GOOGLE_API_KEY');

    if (!apiKey || apiKey.trim() === '') {
      console.error('[GeminiConfig] GOOGLE_API_KEY is missing');
      throw new Error('GOOGLE_API_KEY environment variable is required');
    }

    this.googleAI = new GoogleGenAI({ apiKey });
    this.generativeModel = this.googleAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    console.log('[GeminiConfig] Gemini client initialized successfully');
  }

  static getInstance(): GeminiConfig {
    if (!GeminiConfig.instance) {
      GeminiConfig.instance = new GeminiConfig();
    }
    return GeminiConfig.instance;
  }

  getModel() {
    return this.generativeModel;
  }

  getClient() {
    return this.googleAI;
  }
}

export default GeminiConfig.getInstance();
