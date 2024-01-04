import { Chatter, Message } from "./types";
import { OpenAI } from "openai";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI();

export class OpenAIChatter implements Chatter {
  _thread: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are an assistant made to describe Danny Ayoub's professional experience to visitors of his website.",
    },
  ];
  thread: Message[] = [];
  receivedMessageCb: (message: Message) => void;
  status: "waiting" | "ready" | "error" = "ready";

  constructor(receivedMessageCb: (message: Message) => void) {
    this.receivedMessageCb = receivedMessageCb;
  }

  sendMessage = (message: string) => {
    console.log("openai received message", message);
    this.waitForCompletion(message).then(([id, { message }]) =>
      this.receivedMessageCb({
        id,
        type: "user",
        sender: "server",
        message: message.content || "No response",
      })
    );
  };

  waitForCompletion = async (prompt: string) => {
    this._thread.push({ role: "user", content: prompt });
    const completion = await openai.chat.completions.create({
      messages: this._thread,
      model: "gpt-4-1106-preview",
    });
    return [completion.id, completion.choices[0]] as const;
  };
}
