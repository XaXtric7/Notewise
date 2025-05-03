"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileIcon, UploadCloudIcon, Split } from "lucide-react";
import { SummaryResult } from "@/components/summary-result";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export type SummaryStyle =
  | "concise"
  | "detailed"
  | "bullet-points"
  | "study-notes";

export function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [compareSummary, setCompareSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [summaryStyle, setSummaryStyle] =
    useState<SummaryStyle>("bullet-points");
  const [compareMode, setCompareMode] = useState(false);
  const [compareStyle, setCompareStyle] = useState<SummaryStyle>("detailed");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else if (selectedFile) {
      setError("Please upload a PDF file");
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    setIsUploading(true);
    setSummary(null);
    setCompareSummary(null);
    setError(null);

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("style", summaryStyle);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      }

      const data = await response.json();
      setSummary(data.summary);

      if (compareMode) {
        const compareFormData = new FormData();
        compareFormData.append("pdf", file);
        compareFormData.append("style", compareStyle);

        const compareResponse = await fetch("/api/summarize", {
          method: "POST",
          body: compareFormData,
        });

        if (!compareResponse.ok) {
          throw new Error("Failed to generate comparison summary");
        }

        const compareData = await compareResponse.json();
        setCompareSummary(compareData.summary);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing your file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const summaryStyleOptions = [
    {
      value: "concise",
      label: "Concise",
      description: "Brief overview with core concepts only",
    },
    {
      value: "detailed",
      label: "Detailed",
      description: "In-depth summary with examples and context",
    },
    {
      value: "bullet-points",
      label: "Bullet Points",
      description: "Key points in easy-to-read bullet format",
    },
    {
      value: "study-notes",
      label: "Study Notes",
      description:
        "Organized by topic with definitions and key terms highlighted",
    },
  ];

  const compareStyleOptions = summaryStyleOptions.filter(
    (option) => option.value !== summaryStyle
  );

  return (
    <div className="space-y-8">
      <Card className="border-slate-200 shadow-md rounded-xl overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100/80"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
                  <UploadCloudIcon className="h-8 w-8" />
                </div>
                <div className="text-sm text-slate-700">
                  <span className="font-semibold text-emerald-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-slate-500">
                  PDF lecture notes only (max 10MB)
                </p>
              </div>
            </div>

            {file && (
              <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg border border-slate-200">
                <div className="bg-slate-200 p-2 rounded">
                  <FileIcon className="h-5 w-5 text-slate-700" />
                </div>
                <span className="text-sm text-slate-700 font-medium flex-1 truncate">
                  {file.name}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  onClick={() => setFile(null)}
                >
                  Remove
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="summary-style"
                  className="text-sm font-medium text-slate-700"
                >
                  Summarization Style
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="compare-mode"
                    checked={compareMode}
                    onCheckedChange={setCompareMode}
                  />
                  <Label
                    htmlFor="compare-mode"
                    className="text-xs text-slate-600"
                  >
                    Compare styles
                  </Label>
                </div>
              </div>
              <Tabs
                defaultValue="bullet-points"
                className="w-full"
                value={summaryStyle}
                onValueChange={(value) =>
                  setSummaryStyle(value as SummaryStyle)
                }
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-2">
                  {summaryStyleOptions.map((option) => (
                    <TabsTrigger
                      key={option.value}
                      value={option.value}
                      className="text-xs md:text-sm"
                    >
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {summaryStyleOptions.map((option) => (
                  <TabsContent
                    key={option.value}
                    value={option.value}
                    className="mt-0"
                  >
                    <p className="text-xs text-slate-500">
                      {option.description}
                    </p>
                  </TabsContent>
                ))}
              </Tabs>

              {compareMode && (
                <div className="mt-4 rounded-lg border border-slate-200 p-3 bg-slate-50">
                  <Label
                    htmlFor="compare-style"
                    className="text-sm font-medium text-slate-700 mb-2 block"
                  >
                    Compare with
                  </Label>
                  <Select
                    value={compareStyle}
                    onValueChange={(value) =>
                      setCompareStyle(value as SummaryStyle)
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select comparison style" />
                    </SelectTrigger>
                    <SelectContent>
                      {compareStyleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
                <div className="w-1 h-full bg-red-500 rounded-full"></div>
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-all hover:shadow disabled:opacity-70"
                disabled={!file || isUploading}
              >
                {isUploading
                  ? "Processing..."
                  : compareMode
                  ? "Generate Comparisons"
                  : "Summarize Notes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isUploading && (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="h-6 w-6 text-emerald-600 animate-spin" />
            <p className="text-slate-700 font-medium">
              {compareMode
                ? "Generating comparison summaries..."
                : "Analyzing your lecture notes..."}
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 max-w-md">
            <div className="bg-emerald-500 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {compareMode && summary && compareSummary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryResult summary={summary} />
          <SummaryResult summary={compareSummary} />
        </div>
      ) : summary ? (
        <SummaryResult summary={summary} />
      ) : null}
    </div>
  );
}
