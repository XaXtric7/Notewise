export function Footer() {
  return (
    <footer className="py-6 border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-slate-500">
          <div>
            <span className="font-medium text-emerald-600">Notewise</span> •
            Built by Sarthak Dharmik
          </div>
          <div className="hidden md:block">•</div>
          <div>Using Next.js, Tailwind CSS, and Google Gemini</div>
        </div>
      </div>
    </footer>
  );
}
