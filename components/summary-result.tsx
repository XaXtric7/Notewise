import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download } from "lucide-react";

interface SummaryResultProps {
  summary: string;
}

export function SummaryResult({ summary }: SummaryResultProps) {
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle download as text file
  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Convert the summary into a properly formatted output
  const formatSummary = () => {
    // Remove leading/trailing whitespace and split by new lines
    const lines = summary.trim().split("\n");

    // Find the title/heading
    let heading = "Key Points:";
    let content = lines;

    // Extract heading if it exists
    if (
      lines[0] &&
      (lines[0].includes("Key Points:") ||
        lines[0].includes("Detailed Summary:") ||
        lines[0].includes("Study Notes:"))
    ) {
      heading = lines[0];
      content = lines.slice(1);
    }

    return { heading, content };
  };

  const { heading, content } = formatSummary();

  // Detect if this is a bullet-point style summary
  const isBulletPointStyle = content.some(
    (line) =>
      line.trim().startsWith("•") ||
      line.trim().startsWith("-") ||
      line.trim().startsWith("*")
  );

  // Check if this is a study notes format with potential headers
  const hasHeaders = content.some(
    (line) =>
      line.trim().startsWith("#") || /^[A-Z][A-Za-z\s]+:$/.test(line.trim())
  );

  return (
    <Card className="border-slate-200 shadow-md rounded-xl overflow-hidden bg-white">
      <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold text-slate-800">
          {heading}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-slate-600"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 text-slate-600"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="text-xs">Download</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <div className="text-slate-700 leading-relaxed space-y-3">
          {content.map((line, index) => {
            if (!line.trim()) return <div key={index} className="h-2"></div>;

            // Handle bullet points
            if (
              isBulletPointStyle &&
              (line.startsWith("•") ||
                line.startsWith("-") ||
                line.startsWith("*"))
            ) {
              return (
                <div key={index} className="flex items-start">
                  <span className="mr-2 text-emerald-600 font-bold">
                    {line.charAt(0)}
                  </span>
                  <span>{line.slice(1).trim()}</span>
                </div>
              );
            }

            // Handle headings for study notes
            if (
              hasHeaders &&
              (line.trim().startsWith("#") ||
                /^[A-Z][A-Za-z\s]+:$/.test(line.trim()))
            ) {
              return (
                <div
                  key={index}
                  className="font-semibold text-slate-800 text-lg mt-4 border-b border-slate-100 pb-1"
                >
                  {line.replace(/^#+\s/, "")}
                </div>
              );
            }

            // Handle normal paragraphs
            if (!isBulletPointStyle) {
              return <p key={index}>{line}</p>;
            }

            // Default display for other lines
            return (
              <div key={index} className="flex items-start">
                <span className="mr-2 text-emerald-600 font-bold">•</span>
                <span>{line.trim()}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
