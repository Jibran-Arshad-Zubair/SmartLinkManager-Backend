
import openai from "../../../config/openai.js";

export const generateAIDescription = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required" });
    }

    const prompt = `Generate a short, clear, and engaging 2-3 sentence description for a website called "${title}" that belongs to the "${category}" category. 
    The tone should be informative and inviting, suitable for a link directory website.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 80,
    });

    const description =
      response.choices?.[0]?.message?.content?.trim() ||
      "AI could not generate a description. Please try again.";

    res.json({ description });
  } catch (error) {
    console.error("AI Description Error:", error);
    res.status(500).json({ error: "Failed to generate AI description" });
  }
};
