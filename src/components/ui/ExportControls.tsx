"use client";

import { useState } from "react";
import { Download, FileImage, FileText, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

interface ExportControlsProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportControls({ targetRef }: ExportControlsProps) {
    const [isExporting, setIsExporting] = useState(false);

    const prepareOptions = () => ({
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
        logging: false,
        onclone: (clonedDoc: Document) => {
            const elements = clonedDoc.querySelectorAll(".timeline-item-content");
            elements.forEach((el) => {
                const element = el as HTMLElement;
                element.style.opacity = "1";
                element.style.transform = "none";
            });
        },
    });

    const handleExportImage = async () => {
        if (!targetRef.current) return;
        setIsExporting(true);

        try {
            const canvas = await html2canvas(targetRef.current, prepareOptions());

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `timeline-export-${new Date().toISOString().split("T")[0]}.png`;
            link.click();
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export image. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPDF = async () => {
        if (!targetRef.current) return;
        setIsExporting(true);

        try {
            const canvas = await html2canvas(targetRef.current, prepareOptions());

            const imgData = canvas.toDataURL("image/png");

            // Calculate dimensions to fit the content exactly
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const pdf = new jsPDF({
                orientation: imgWidth > imgHeight ? "landscape" : "portrait",
                unit: "px",
                format: [imgWidth, imgHeight], // Custom format matching the canvas
            });

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(`timeline-export-${new Date().toISOString().split("T")[0]}.pdf`);
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export PDF. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
            <button
                onClick={handleExportImage}
                disabled={isExporting}
                className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300",
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                title="Export as Image"
            >
                {isExporting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <FileImage className="w-5 h-5" />
                )}
                <span className="font-medium hidden md:inline">Save Image</span>
            </button>

            <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300",
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                title="Export as PDF"
            >
                {isExporting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <FileText className="w-5 h-5" />
                )}
                <span className="font-medium hidden md:inline">Save PDF</span>
            </button>
        </div>
    );
}
