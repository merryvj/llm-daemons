import { useState, useEffect } from "react";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { Ollama } from "langchain/llms/ollama";

import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers";

const model = new OpenAI({temperature: 0,
    openAIApiKey: "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",});

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      line: z.string().describe("a selected sentence or phrase or word from the provided text that could be improved"),
      suggestions: z.string().describe("explain potential fixes to the selected"),
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following text as if you are a writing editor. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{text}",
    inputVariables: ["text"],
    partialVariables: { format_instructions: formatInstructions },
  });
  

  
const useAI = (text) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("boop");

    useEffect(() => {
        if (loading) return;
        setLoading(true);

        const callModel = async() => {
              const input = await prompt.format({
                text: text
              });
            const response = await model.call(input);
            console.log(response);

            try {
                const output = await parser.parse(response);
                setData(output);
            } catch (e) {
                const fixParser = OutputFixingParser.fromLLM(
                    new OpenAI({ temperature: 0}),
                    parser
                )

                const fix = await fixParser.parse(response);
                setData(fix);
            }
        }

        callModel();

    }, [text])

    return [data, loading]
}

export default useAI;