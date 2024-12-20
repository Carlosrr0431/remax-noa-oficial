import { NextRequest, NextResponse } from "next/server";
import Configuration from "openai";
import pdf from "pdf-parse";
import OpenAIApi from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error("La clave API de OpenAI no está configurada");
  process.exit(1);
}

const configuration = new Configuration({
  apiKey:
    "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",
});
const openai = new OpenAIApi(configuration);

async function processPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const data = await pdf(uint8Array);
  return data.text;
}

async function matchCV(cvText, jobDescription) {
  const prompt = `
    Descripción del trabajo:
    ${jobDescription}

    Texto del CV:
    ${cvText}

    Basándote en la descripción del trabajo y el texto del CV, determina si este candidato es una buena coincidencia. 
    Responde solo con "MATCH" si el candidato es adecuado, o "NO MATCH" si no lo es.
  `;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 1,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    return response.data.choices[0].text?.trim() === "MATCH";
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error);
    throw new Error("Error al procesar el CV con IA");
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const cvFiles = formData.getAll("cvs");
    const jobDescription = formData.get("jobDescription");
    if (!cvFiles.length || !jobDescription) {
      return NextResponse.json(
        { error: "Faltan CVs o descripción del trabajo" },
        { status: 400 }
      );
    }

    const matchedCVs = [];
    const errors = [];

    await Promise.all(
      cvFiles.map(async (file) => {
        try {
          const cvText = await processPDF(file);
          const isMatch = await matchCV(cvText, jobDescription);
          if (isMatch) {
            matchedCVs.push(file.name);
          }
        } catch (error) {
          console.error(`Error procesando CV ${file.name}:`, error);
          errors.push(
            `Error procesando ${file.name}: ${
              error instanceof Error ? error.message : "Error desconocido"
            }`
          );
        }
      })
    );

    return NextResponse.json({ message: "Mensaje enviado correctamente." });

    // return NextResponse.json({ matchedCVs, errors });
  } catch (error) {
    console.error("Error del servidor:", error);
    return NextResponse.json(
      { error: "Ocurrió un error interno del servidor" },
      { status: 500 }
    );
  }
}
