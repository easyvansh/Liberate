import { Configuration, OpenAIApi } from "openai";

// OpenAI Configuration with API Key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Example: Generate AI reflection for a user's journal entry
 * @param {string} text - User's journal entry or input text.
 * @returns {Promise<string>} - AI-generated reflection or insight.
 */
export async function getAIReflection(text: string): Promise<string> {
  try {
    const prompt = `You are a wise, empathetic companion. The user wrote:\n"${text}"\nProvide a short reflection or insight.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.data.choices?.[0]?.text?.trim() || "No insight generated.";
  } catch (error) {
    console.error("OpenAI Error in getAIReflection:", error);
    return "Couldn’t generate an insight at this time.";
  }
}

/**
 * Example: Generate thematic tags for a user's journal entry
 * @param {string} text - User's journal entry or input text.
 * @returns {Promise<string[]>} - AI-generated themes or tags.
 */
export async function getThemes(text: string): Promise<string[]> {
  try {
    const prompt = `Analyze the following journal entry:\n"${text}"\nExtract 3-5 themes or keywords that summarize the entry.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      max_tokens: 50,
    });

    const themes = response.data.choices?.[0]?.text?.trim().split(",") || [];
    return themes.map((theme) => theme.trim());
  } catch (error) {
    console.error("OpenAI Error in getThemes:", error);
    return [];
  }
}

/**
 * Example: Generate AI journaling prompt
 * @param {string} userMood - User's current mood (e.g., "anxious," "happy").
 * @returns {Promise<string>} - AI-generated journaling prompt.
 */
export async function getAIPrompt(userMood: string): Promise<string> {
  try {
    const prompt = `The user is feeling "${userMood}". Suggest a thoughtful journaling prompt tailored to this emotion.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.8,
      max_tokens: 100,
    });

    return response.data.choices?.[0]?.text?.trim() || "What’s on your mind today?";
  } catch (error) {
    console.error("OpenAI Error in getAIPrompt:", error);
    return "What’s on your mind today?";
  }
}

/**
 * Example: Summarize a saved article or journal entry
 * @param {string} text - Text of the article or journal entry.
 * @returns {Promise<string>} - AI-generated summary.
 */
export async function summarizeText(text: string): Promise<string> {
  try {
    const prompt = `Summarize the following text in 3-5 concise bullet points:\n"${text}"`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.3,
      max_tokens: 150,
    });

    return response.data.choices?.[0]?.text?.trim() || "No summary generated.";
  } catch (error) {
    console.error("OpenAI Error in summarizeText:", error);
    return "Couldn’t generate a summary at this time.";
  }
}
