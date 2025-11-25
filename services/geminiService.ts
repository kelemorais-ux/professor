import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLessonPlan = async (theme: string, ageGroup: string, duration: string): Promise<LessonPlan | null> => {
  try {
    const prompt = `Crie um plano de aula detalhado para Educação Infantil seguindo a BNCC (Base Nacional Comum Curricular) do Brasil.
    Tema: ${theme}
    Faixa Etária: ${ageGroup}
    Duração: ${duration}
    
    Retorne APENAS um JSON com a seguinte estrutura, sem markdown:
    {
      "theme": "Tema da aula",
      "ageGroup": "Faixa etária",
      "bnccCodes": ["Código 1", "Código 2"],
      "objectives": ["Objetivo 1", "Objetivo 2"],
      "resources": ["Recurso 1", "Recurso 2"],
      "steps": ["Passo 1", "Passo 2"],
      "evaluation": "Como será a avaliação"
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            ageGroup: { type: Type.STRING },
            bnccCodes: { type: Type.ARRAY, items: { type: Type.STRING } },
            objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            resources: { type: Type.ARRAY, items: { type: Type.STRING } },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            evaluation: { type: Type.STRING },
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as LessonPlan;
    }
    return null;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw error;
  }
};

export const generateReport = async (name: string, positive: string, needsImprovement: string, social: string): Promise<string> => {
  try {
    const prompt = `Escreva um relatório descritivo individual para um aluno de educação infantil. Use uma linguagem pedagógica, acolhedora e profissional.
    Nome do aluno: ${name}
    Pontos fortes/Interesses: ${positive}
    Pontos a desenvolver/Dificuldades: ${needsImprovement}
    Socialização: ${social}
    
    O texto deve ter cerca de 2 parágrafos.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar o relatório.";
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};

export const generateActivityIdea = async (topic: string, isInclusive: boolean = false): Promise<string> => {
  try {
    const prompt = `Sugira 3 atividades lúdicas e criativas para educação infantil sobre o tema: "${topic}".
    ${isInclusive ? 'IMPORTANTE: As atividades devem ser adaptadas para educação inclusiva, considerando alunos com necessidades especiais diversas.' : ''}
    Formate como uma lista HTML simples (<ul><li>...).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating activities:", error);
    throw error;
  }
};

export const generateStory = async (topic: string): Promise<string> => {
  try {
    const prompt = `Escreva uma história infantil curta, envolvente e educativa sobre: "${topic}". A história deve ter um final feliz e uma lição moral simples.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
     console.error("Error generating story:", error);
     throw error;
  }
}

export const generateVisualResource = async (description: string): Promise<string | null> => {
  try {
    // Using flash-image for efficiency for simple resources
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Desenho vetorial simples, preto e branco, estilo linha (outline) para colorir ou recortar. Objeto: ${description}. Fundo branco.` }
        ]
      }
    });
    
    // Extract image from response parts
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
         return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;

  } catch (error) {
    console.error("Error generating visual:", error);
    throw error;
  }
};
