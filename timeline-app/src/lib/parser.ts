import { TimelineEvent } from "./data";
import Papa from "papaparse";

export async function parseFile(file: File): Promise<TimelineEvent[]> {
    const text = await file.text();

    if (file.type === "application/json" || file.name.endsWith(".json")) {
        return parseJSON(text);
    } else if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        return parseCSV(text);
    } else {
        throw new Error("Unsupported file type. Please upload a JSON or CSV file.");
    }
}

function parseJSON(text: string): TimelineEvent[] {
    try {
        const data = JSON.parse(text);
        if (!Array.isArray(data)) {
            throw new Error("JSON must be an array of events.");
        }
        return data.map((item: any) => normalizeEvent(item));
    } catch (e) {
        throw new Error("Invalid JSON format.");
    }
}

function parseCSV(text: string): TimelineEvent[] {
    const result = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase(),
        delimitersToGuess: [',', ';', '\t', '|'], // Auto-detect delimiter
    });

    if (result.errors.length > 0) {
        console.error("CSV Parsing Errors:", result.errors);
        // Only throw if we got NO data. Warnings shouldn't block.
        if (result.data.length === 0) {
            throw new Error(`Error parsing CSV: ${result.errors[0].message}`);
        }
    }

    return result.data.map((item: any) => normalizeEvent(item));
}

function normalizeEvent(item: any): TimelineEvent {
    // Helper to find value case-insensitively and with Spanish/English support
    const findValue = (keys: string[]) => {
        for (const key of keys) {
            // Check exact match or lowercase match
            if (item[key] !== undefined && item[key] !== "") return item[key];
            const lowerKey = key.toLowerCase();
            if (item[lowerKey] !== undefined && item[lowerKey] !== "") return item[lowerKey];
        }
        return undefined;
    };

    // Flexible mapping for headers
    const title = findValue(["title", "título", "titulo", "nombre", "event", "evento", "name"]) || "Untitled Event";
    const date = findValue(["date", "fecha", "year", "año", "time", "tiempo"]) || "Unknown Date";
    const description = findValue(["description", "descripción", "descripcion", "details", "detalle", "summary", "resumen"]) || "";
    const category = findValue(["category", "categoría", "categoria", "type", "tipo", "tag", "etiqueta"]) || "General";
    const imageUrl = findValue(["imageurl", "image", "imagen", "foto", "url", "link", "image_url", "img"]) || "";

    // Try to extract year from date if not provided
    let year = item.year || item.año ? parseInt(item.year || item.año) : new Date().getFullYear();
    if (!year && date !== "Unknown Date") {
        const yearMatch = date.match(/\d{4}/);
        if (yearMatch) {
            year = parseInt(yearMatch[0]);
        }
    }

    return {
        id: item.id || Math.random().toString(36).substr(2, 9),
        title,
        date,
        year,
        description,
        category,
        imageUrl,
    };
}
