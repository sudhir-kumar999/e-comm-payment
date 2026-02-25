import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const getBookAnalysis = async (book) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a book analyst AI.

Analyze this book:

Title: ${book.title}
Author: ${book.author}
Description: ${book.longDescription}

Give:
1. Short summary
2. Who should read this
3. Difficulty level
4. Key learning outcomes
5. Overall recommendation

Keep response clean and readable.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};