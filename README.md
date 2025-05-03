# 📘 Notewise: Lecture Notes Summarizer

**Notewise** is a powerful web application designed to help students and professionals effortlessly summarize and extract key information from lecture notes and educational PDF documents using Google's Gemini AI.

![Image](https://github.com/user-attachments/assets/c6b533f0-cec1-4b20-9878-96814c6737af)

---

## ✨ Features

- 📄 **PDF Processing**: Upload PDF lecture notes or educational materials
- 🤖 **AI-Powered Summaries**: Generate concise, AI-powered summaries using Google Gemini
- 🎯 **Multiple Summary Styles**:
  - ✂️ **Concise**: Brief overview with core concepts only
  - 🧠 **Detailed**: In-depth summary with examples and context
  - 📌 **Bullet Points**: Key points in easy-to-read bullet format
  - 📝 **Study Notes**: Organized by topic with definitions and key terms highlighted
- 🔍 **Comparison Mode**: Generate and compare two different summary styles side-by-side
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💻 **Modern UI**: Clean, intuitive interface built with Next.js and Tailwind CSS

---

## 🛠 Tech Stack

### 💻 Frontend

- ⚛️ [Next.js 15](https://nextjs.org/) – React framework
- 🧩 [React 19](https://react.dev/) – UI library
- 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- 🧱 [shadcn/ui](https://ui.shadcn.com/) – UI component system
- 🔔 [Lucide React](https://lucide.dev/) – Icon library

### 🧠 AI Integration

- 🌟 [Google Generative AI SDK](https://ai.google.dev/) – Gemini-1.5-flash model

### ⚙️ Build & Development

- 🧑‍💻 [TypeScript](https://www.typescriptlang.org/) – Type-safe JavaScript
- 📦 [pnpm](https://pnpm.io/) – Fast, disk space efficient package manager

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v8 or newer)

### 📦 Installation

```bash
git clone https://github.com/yourusername/notewise.git
cd notewise
```

```bash
pnpm install
```

📝 Create a `.env.local` file in the root directory with your Google Gemini API key:

```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

> 🔐 _For convenience, you can copy and rename the `.env.example` file to `.env.local` and add your API key._
> 🔑 _Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)._
> 🚨 _Never commit your `.env.local` file to version control!_

### ▶️ Start the Development Server

```bash
pnpm dev
```

🌐 Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Build for Production

```bash
pnpm build
```

```bash
pnpm start
```

---

## 🧑‍🏫 Usage

1. 📤 **Upload a PDF** – Click or drag-and-drop your document
2. 🎨 **Choose Summary Style** – Select from concise, detailed, bullet points, or study notes
3. 🆚 **Toggle Comparison Mode** _(optional)_
4. ⚡ **Click Generate Summary** – Let AI do the magic
5. 📋 **Review and Use** – Copy, download, or read the summary

---

## 🤝 Contributing

Contributions are welcome! 💡

1. 🍴 Fork the repo
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ Commit your changes (`git commit -m 'Add some amazing feature'`)
4. 🚀 Push to the branch (`git push origin feature/amazing-feature`)
5. 📬 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## 🙏 Acknowledgments

- ⚡ Built with [Next.js](https://nextjs.org/)
- 🧠 AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- 🧩 UI components from [shadcn/ui](https://ui.shadcn.com/)
