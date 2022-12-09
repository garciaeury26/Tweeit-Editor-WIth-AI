// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  result: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const userInput = req.body.text;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    prompt: `Create a tweet from the topic below. It must be easy to understand and highly readable for anyone. No hashtag. Topic:
		${userInput}
		Tweet:`,
  });

  console.log("completion.data", completion.data);

  res.status(200).json({ result: completion.data.choices[0].text ?? "" });
};

export default handler;
