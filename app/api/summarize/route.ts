import { type NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Get the API key from environment variables
const apiKey = process.env.GOOGLE_GEMINI_API_KEY || "";

// Validate API key
if (!apiKey) {
  console.warn(
    "Warning: GOOGLE_GEMINI_API_KEY environment variable is not set. API calls will fail."
  );
}

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

// Define prompts for different summarization styles
type SummaryStyle = "concise" | "detailed" | "bullet-points" | "study-notes";

const summaryPrompts: Record<SummaryStyle, string> = {
  concise:
    "Create a concise summary of these lecture notes, focusing only on the most important concepts. Keep it brief but ensure all critical points are covered. Title the section 'Key Points:'",

  detailed:
    "Create a comprehensive summary of these lecture notes. Include main concepts, supporting details, examples, and any context that helps understand the material. Format with clear headings and subheadings where appropriate. Title the main section 'Detailed Summary:'",

  "bullet-points":
    "Extract the key points from these lecture notes and create a concise summary. Format the output as bullet points that capture the main concepts and important details. Each bullet point should be brief but informative. Title the section 'Key Points:'",

  "study-notes":
    "Transform these lecture notes into organized study notes. Include definitions of key terms, important concepts, and highlight relationships between ideas. Format in a way that facilitates learning and retention. Include headings, subheadings, and bullet points where appropriate. Title the main section 'Study Notes:'",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;
    const style = (formData.get("style") as SummaryStyle) || "bullet-points";

    if (!pdfFile || pdfFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please provide a valid PDF file" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer for processing
    const fileBuffer = await pdfFile.arrayBuffer();
    const uint8Array = new Uint8Array(fileBuffer);

    // Initialize the model (Gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Configure safety settings
    const generationConfig = {
      temperature: style === "concise" ? 0.2 : style === "detailed" ? 0.7 : 0.4,
      topK: 32,
      topP: 0.95,
      maxOutputTokens:
        style === "detailed" || style === "study-notes" ? 4096 : 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Create a file part for the PDF
    const filePart = {
      inlineData: {
        data: Buffer.from(uint8Array).toString("base64"),
        mimeType: "application/pdf",
      },
    };

    // Get the appropriate prompt based on the selected style
    const prompt = summaryPrompts[style] || summaryPrompts["bullet-points"];

    // Generate content
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }, filePart],
        },
      ],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    const text = response.text();

    return NextResponse.json({ summary: text });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process the PDF file" },
      { status: 500 }
    );
  }
}
