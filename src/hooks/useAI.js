import { useState, useEffect } from "react";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { Ollama } from "langchain/llms/ollama";

import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers";

const model = new OpenAI({temperature: 0,
    openAIApiKey: "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",
    cache: true});

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      line: z.string().describe("a sentence or phrase or word from the provided text that can be improved or is interesting"),
      suggestions: z.string().describe("explain why you responded in that way"),
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Please respond to the following text as if you are {style}. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{text}",
    inputVariables: ["text", "style"],
    partialVariables: { format_instructions: formatInstructions },
  });
  

  
const useAI = (text, activeDaemon) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("boop");

    useEffect(() => {
        if (!activeDaemon) return;
        const callModel = async() => {
              const input = await prompt.format({
                text: text,
                style: activeDaemon.description
              });
            const response = await model.call(input);

            try {
                const output = await parser.parse(response);
                setData(output);
            } catch (e) {
                const fixParser = OutputFixingParser.fromLLM(
                    new OpenAI({temperature: 0,
                        openAIApiKey: "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",
                        cache: true})
                )

                const fix = await fixParser.parse(response);
                setData(fix);
            }
        }

        callModel();
        setLoading(true);

    }, [text, activeDaemon])

    return [data, loading]
}

export default useAI;