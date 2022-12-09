import { Box, Button, Paper, Text, Textarea, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import CustomizedCopyButton from "../components/CustomizedCopyButton";

const Home: NextPage = () => {
  const formRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isParaphrazing, setIsParaphrazing] = useState(false);
  const [isSummarizing, setSummarizing] = useState(false);
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  const paraphrase = async () => {
    setIsParaphrazing(true);
    setResult(null);
    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        body: JSON.stringify({ text: userInput }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      console.log({ res });

      setResult(res.result);
    } catch (err) {
      console.error({ err });
    } finally {
      setIsParaphrazing(false);
    }
  };

  const summarize = async () => {
    setSummarizing(true);
    setResult(null);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({ text: userInput }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result.replace(/^\s+/, ""));
    } catch (err) {
      console.error({ err });
    } finally {
      setSummarizing(false);
    }
  };

  const createStory = async () => {
    setIsCreatingStory(true);
    setResult(null);
    try {
      const res = await fetch("/api/createStory", {
        method: "POST",
        body: JSON.stringify({ text: userInput }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result.replace(/^\s+/, ""));
    } catch (err) {
      console.error({ err });
    } finally {
      setIsCreatingStory(false);
    }
  };

  return (
    <Box
      w="100%"
      h="100%"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box w={600}>
        <Title order={1} mb={30}>
          Tweet Editor with AI
        </Title>
        <Textarea
          ref={formRef}
          placeholder="Your comment"
          label="Your tweet"
          radius="md"
          size="md"
          withAsterisk
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          minRows={10}
        />
        <Box mt={20} sx={{ display: "flex", gap: 10 }}>
          <Button
            color="yellow"
            radius="xl"
            size="md"
            onClick={paraphrase}
            loading={isParaphrazing}
          >
            Paraphrase
          </Button>
          <Button
            color="violet"
            radius="xl"
            size="md"
            onClick={summarize}
            loading={isSummarizing}
          >
            Summarize
          </Button>
          <Button
            color="lime"
            radius="xl"
            size="md"
            onClick={createStory}
            loading={isCreatingStory}
          >
            Create a story
          </Button>
        </Box>
        {result && (
          <Box mt={20}>
            <Box ta="right">
              <CustomizedCopyButton value={result} />
            </Box>
            <Paper
              sx={(theme) => ({ backgroundColor: theme.black })}
              mt={5}
              shadow="md"
              radius="md"
              p="lg"
            >
              <Text>{result}</Text>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
