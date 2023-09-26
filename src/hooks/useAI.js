import { useState, useEffect } from "react";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { Ollama } from "langchain/llms/ollama";

import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser, OutputFixingParser } from "langchain/output_parsers";


const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      line: z.string().describe("a selected line that needs the most edits"),
      suggestions: z.string().describe("editing suggestions based on the selected line"),
    })
  );


const model = new OpenAI({temperature: 0.5,
  modelName: 'gpt-3.5-turbo',
  cache: true});  

const getPrompt = async (text, activeDaemon) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following text like you are a {style}. \n{format_instructions}\n{text}",
    inputVariables: ["text", "style"],
    partialVariables: { format_instructions},
  });

  const input = await prompt.format({
    text: text,
    style: activeDaemon.description
  })

  return input;
}
  
const useAI = (text, activeDaemon) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("boop");

    useEffect(() => {
        if (!activeDaemon) return;
        const callModel = async() => {
            const input = await getPrompt(text, activeDaemon);
            const response = await model.call(input);

            try {
                const output = await parser.parse(response);
                setData(output);
                return;
            } catch (e) {
              console.log(e);
                const fixParser = OutputFixingParser.fromLLM(
                    new OpenAI({temperature: 0,
                        cache: true})
                )

                const fix = await fixParser.parse(response);
                setData(fix);
                return;
            }
        }

        callModel();
        setLoading(true);
    }, [activeDaemon])

    return [data, loading]
}

export default useAI;
