import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ message: "Symptoms are required" });
  }

  // Check if API key exists
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "API key not configured" });
  }

  try {
    // Initialize Google Generative AI client with environment variable
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the refined prompt
    const refinedPrompt = `
      Based on the following symptoms:
      "${symptoms}"
      Please provide:
      1. The type of doctor specialist the patient should consult.
      2. Basic over-the-counter medications or remedies that might help.
      3. Immediate and simple tips to help alleviate the symptoms and feel better right now.
      Respond in JSON format like this:
      {
        "specialist": "Name of specialist",
        "medications": ["Medication 1", "Medication 2", "Medication 3"],
        "instantReliefTips": ["Tip 1", "Tip 2", "Tip 3"]
      }`;

    // Generate content using Gemini API
    const result = await model.generateContent(refinedPrompt);
    let responseText = result.response.text(); // Fetch the response as text

    // Remove markdown formatting from the response
    responseText = responseText.replace(/```json|```/g, "").trim();

    // Parse the response into JSON
    const parsedResponse = JSON.parse(responseText);

    // Ensure the response includes expected properties
    const { specialist, medications, instantReliefTips } = parsedResponse;
    if (!specialist || !Array.isArray(medications) || !Array.isArray(instantReliefTips)) {
      throw new Error("Invalid response structure from Gemini API");
    }

    res.status(200).json({ specialist, medications, instantReliefTips });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
