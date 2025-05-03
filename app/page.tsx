import { PdfUploader } from "@/components/pdf-uploader";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-100 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="text-center mb-8 md:mb-10">
          <div className="bg-white inline-flex rounded-full px-4 py-2 text-sm font-medium text-emerald-700 mb-4 shadow-sm border border-emerald-100">
            Powered by Google Gemini
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4 md:text-4xl lg:text-5xl">
            Lecture Notes Summarizer
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Upload your PDF lecture notes and get an AI-generated summary with
            key points extracted using Gemini AI. Perfect for quick review and
            study sessions.
          </p>
        </div>

        <PdfUploader />

        <div className="text-center mt-8 opacity-80">
          <p className="text-sm text-slate-500">
            This application extracts text from PDFs and uses Google Gemini to
            generate concise summaries
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
