import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Sparkles } from "lucide-react";

type AnalysisResult = {
  summary: string;
  strengths: string[];
  improvements: string[];
  careerAdvice: string[];
};

const CVReview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTextFromFile = (selectedFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(typeof reader.result === "string" ? reader.result : "");
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(selectedFile);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAnalysis(null);
    setRawResponse("");

    try {
      setLoading(true);

      let text = cvText.trim();
      if (!text && file) {
        text = (await extractTextFromFile(file)).slice(0, 20000);
      }

      if (!text) {
        setError("Zəhmət olmasa CV-ni PDF kimi yüklə və ya mətnini aşağıya yapışdır.");
        setLoading(false);
        return;
      }

      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        setError("OpenRouter API açarı tapılmadı. Zəhmət olmasa .env faylında VITE_OPENROUTER_API_KEY dəyərini təyin et.");
        setLoading(false);
        return;
      }

      const prompt = `
You are a professional career coach and CV consultant.
The user has provided the following CV text. Analyze it and respond in Azerbaijani.

CV:
${text}

Tasks:
1) 2–3 cümləlik ümumi qiymətləndirmə ver.
2) Güclü tərəfləri maddə-maddə yaz.
3) CV-ni təkmilləşdirmək üçün 5–10 konkret, əməli tövsiyə ver (struktur, məzmun, dil).
4) Uyğun ola biləcək 3–5 karyera istiqamətini və niyə uyğun olduğunu qısa izah et.

Format (strict JSON):
{
  "summary": "qısa mətin",
  "strengths": ["...","..."],
  "improvements": ["...","..."],
  "careerAdvice": ["...","..."]
}
`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "PathFinder CV Review",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful, honest career coach and CV consultant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      setRawResponse(content);

      try {
        const parsed = JSON.parse(content) as AnalysisResult;
        setAnalysis(parsed);
      } catch {
        setError("Modeldən gələn cavabı JSON kimi oxumaq mümkün olmadı. Aşağıda xam mətn kimi göstərilir.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bilinməyən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 max-w-5xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI CV Yoxlama & Karyera Məsləhəti
          </h1>
          <p className="text-muted-foreground">
            CV-ni PDF kimi yüklə və ya aşağıya mətnini yapışdır, OpenRouter AI onu analiz etsin, sənə həm CV-ni təkmilləşdirmək, həm də karyera istiqaməti üçün tövsiyə versin.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card shadow-card p-6 mb-8 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              CV faylı (PDF və ya .txt)
            </label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              Qeyd: Hal-hazırda fayldan sadə mətn çıxarılır, mürəkkəb PDF-lərdə nəticə tam dəqiq olmaya bilər. Ən yaxşı nəticə üçün CV-ni aşağıya da mətn kimi yapışdır.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">CV mətni (istəyə görə)</label>
            <Textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="CV-ni bura yapışdır (təcrübə, təhsil, bacarıqlar və s.)"
              className="min-h-[160px] text-sm"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              CV-nin mətni təhlükəsiz şəkildə yalnız analiz üçün OpenRouter AI modelinə göndərilir.
            </p>
            <Button type="submit" disabled={loading} className="rounded-xl">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              CV-ni analiz et
            </Button>
          </div>
        </motion.form>

        {analysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="rounded-2xl bg-card shadow-card p-6 border border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-2">Ümumi qiymətləndirmə</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{analysis.summary}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-card shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Güclü tərəflər</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  {analysis.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-card shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Təkmilləşdirmə üçün tövsiyələr</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  {analysis.improvements.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-card shadow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Karyera istiqaməti üzrə məsləhətlər</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                {analysis.careerAdvice.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {!analysis && rawResponse && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="rounded-2xl bg-card shadow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Model cavabı (xam mətn)</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{rawResponse}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CVReview;

