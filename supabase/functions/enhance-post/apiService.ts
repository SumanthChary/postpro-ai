
export class GeminiApiService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  async generateContent(promptText: string, platform: string): Promise<string | null> {
    const requestBody = {
      contents: [{
        parts: [{
          text: promptText
        }]
      }]
    };
    
    console.log(`Making API request for ${platform}`);
    
    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error for ${platform} (${response.status}):`, errorText);
        return null;
      }
      
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error(`No text generated for ${platform}`);
        return null;
      }
      
      console.log(`Successfully generated content for ${platform}`);
      return generatedText;
    } catch (fetchError) {
      console.error(`Network error for ${platform}:`, fetchError);
      return null;
    }
  }
}
