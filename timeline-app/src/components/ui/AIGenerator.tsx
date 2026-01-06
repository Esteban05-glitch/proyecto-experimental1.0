"use client";

import { useState } from "react";
import { Sparkles, Loader2, Send } from "lucide-react";
import { TimelineEvent } from "@/lib/data";

interface AIGeneratorProps {
    onDataGenerated: (data: TimelineEvent[]) => void;
}

export function AIGenerator({ onDataGenerated }: AIGeneratorProps) {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) throw new Error("Failed to generate");

            const data = await response.json();

            // Add dynamic IDs to the events
            const eventsWithIds = data.map((event: any, index: number) => ({
                ...event,
                id: `ai-${Date.now()}-${index}`,
            }));

            onDataGenerated(eventsWithIds);
            setPrompt("");
        } catch (error) {
            console.error("AI Generation failed:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <form onSubmit={handleGenerate} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-card border border-border/50 rounded-2xl p-2 shadow-xl">
                    <div className="flex-1 flex items-center px-4 gap-3">
                        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Escribe un tema (ej: Guerra de Independencia, Evolución humana...)"
                            className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground outline-none py-3"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>Generar</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
            <p className="text-center text-xs text-muted-foreground mt-4">
                ✨ Powered by Gemini AI. Describe el tema y nosotros haremos el resto.
            </p>
        </div>
    );
}
