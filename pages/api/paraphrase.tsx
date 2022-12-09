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
    prompt: `Rephrase the text in other words in the style of Paul Graham for a startup company.

    Text: Supercharge your writing with the most advanced AI writing assistant.
    Rephrase: Give your writing a turbo boost with the most innovative AI writing companion.
    Text: Build in a weekend. Scale to millions.
    Rephrase: Construct in a matter of days. Expand to a huge customer base.
    Text: The fastest way to combine your favorite tools and APIs to build the fastest sites, stores, and apps for the web.
    Rephrase: The quickest way to join together your most-used tools and APIs to construct the swiftest websites, stores, and applications for online use.
    Text: ${userInput}
    Rephrase:`,
  });

  console.log("completion.data", completion.data);

  res.status(200).json({ result: completion.data.choices[0].text ?? "" });
};

export default handler;
