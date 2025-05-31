"use client";
import { SetStateAction, useState } from "react";
import Editor from "@monaco-editor/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function Home() {
  const [code, setCode] = useState("print('Hello, World!')");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // 1. Add error state

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    setError(""); // clear previous error

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/run/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, input }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);     // 2. Handle errors
      setOutput("");
    } else {
      setOutput(data.output);
      setError("");
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">CodeCraft: Python Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Editor
            height="400px"
            defaultLanguage="python"
            defaultValue={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Input (optional)</label>
          <Textarea
            className="w-full bg-gray-800 mt-1"
            rows={6}
            value={input}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setInput(e.target.value)}
          />
          <Button className="mt-4 w-full" onClick={runCode} disabled={loading}>
            {loading ? "Running..." : "Run Code"}
          </Button>
          <div className="mt-4 bg-black p-4 rounded-lg min-h-[120px]">
            <h2 className="text-lg font-semibold">Output:</h2>
            {output && (
              <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
            )}
            {error && (
              <pre className="whitespace-pre-wrap text-red-500">{error}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}