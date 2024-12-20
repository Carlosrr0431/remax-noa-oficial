"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CVMatcher() {
    const [files, setFiles] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const [results, setResults] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults([]);
        setErrors([]);

        if (files.length === 0 || !jobDescription.trim()) {
            setErrors([
                "Por favor, suba al menos un CV y proporcione una descripción del trabajo.",
            ]);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("cvs", file));
        formData.append("jobDescription", jobDescription);

        try {
            const response = await fetch("/api/match-cvs", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            // const response = await fetch("/api/biblia", {
            //     method: "GET",

            // });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                console.error("Error parsing JSON:", error);
                throw new Error("La respuesta del servidor no es JSON válido");
            }

            if (!response.ok) {
                throw new Error(data.error || `Error HTTP: ${response.status}`);
            }

            if (Array.isArray(data.matchedCVs)) {
                setResults(data.matchedCVs);
            }
            if (Array.isArray(data.errors) && data.errors.length > 0) {
                setErrors(data.errors);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors([
                error instanceof Error ? error.message : "Ocurrió un error desconocido",
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="cvs"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Subir CVs (PDF)
                    </label>
                    <Input
                        id="cvs"
                        type="file"
                        multiple
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="mt-1"
                    />
                </div>
                <div>
                    <label
                        htmlFor="jobDescription"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Descripción del trabajo
                    </label>
                    <Textarea
                        id="jobDescription"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="mt-1 text-gray-800"
                        rows={4}
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? "Procesando..." : "Comparar CVs"}
                </Button>
            </form>

            {errors.length > 0 && (
                <Alert variant="destructive">
                    <AlertTitle>Errores:</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc pl-5">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            {results.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">CVs coincidentes:</h2>
                    <div className="space-y-2">
                        {results.map((cv, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <p>{cv}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
