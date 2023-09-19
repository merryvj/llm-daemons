import { useState, useEffect } from "react";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { Ollama } from "langchain/llms/ollama";

import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      line: z.string().describe("section of text that should be edited"),
      suggestions: z.string().describe("explain potential fixes to the section"),
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following text as if you are a writing editor. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{text}",
    inputVariables: ["text"],
    partialVariables: { format_instructions: formatInstructions },
  });
  

  
const useAI = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("boop");

    useEffect(() => {
        setLoading(true);

        const callModel = async() => {
            const model = new OpenAI({ temperature: 0, 
                openAIApiKey: "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",});
              
            // const model = new Ollama({
            //     baseUrl: "http://localhost:11434", // Default value
            //     model: "llama2", // Default value
            //   });

              const input = await prompt.format({
                text: "Went to the Kernel magazine launch today. First one there! Met nice people, talked about the difficulties of text messaging as a communication medium...with confusion and frustration from the different levels of intimacy all expected to take place in chat form. Deblina was super nice as a greeter and I felt more comfortable. Maybe I should have been more enthusiastic to say hi to Omar?",
              });
            const response = await model.call(input);

            const parsed = await parser.parse(response);
            setData(parsed);
        }

        callModel();

    }, [])

    return [data, loading]
}

export default useAI;