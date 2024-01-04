import { WebSocketServer, WebSocket, MessageEvent } from "ws";
import { v4 as uuidv4 } from "uuid";
import { Chatter, Message } from "./chat/types";
import { OpenAIChatter } from "./chat/openai-chatter";

export const wss = new WebSocketServer({ noServer: true, path: "/api" });

// WebSocket listener
wss.on("connection", (ws) => {
  const id = uuidv4();
  console.log("connected: " + id);

  const client = new Client(
    id,
    ws,
    (receive: (m: Message) => void) => new OpenAIChatter(receive)
  );
  clients[id] = client;

  ws.onmessage = client.receivedMessage;
  ws.onclose = () => handleDisconnect(id);

  ws.send(
    JSON.stringify({
      type: "system",
      message: `assigned id ${id}`,
    })
  );
});

const handleDisconnect = (userID: string) => {
  console.log(`disconnected: ${userID}`);
  delete clients[userID];
};

// === User management ===
class Client {
  id: string;
  ws: WebSocket;
  chatter: Chatter;

  _idleTimeoutSeconds = 120;
  _idleTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    id: string,
    ws: WebSocket,
    ChatterConstructor: (receive: (m: Message) => void) => Chatter
  ) {
    this.id = id;
    this.ws = ws;
    this.chatter = ChatterConstructor(this.sendFromChatter);
    this.resetIdleTimeout();
  }

  resetIdleTimeout = () => {
    if (this._idleTimeout) {
      clearTimeout(this._idleTimeout);
    }
    if (this.ws.readyState !== this.ws.OPEN) {
      return;
    }
    this._idleTimeout = setTimeout(() => {
      console.log(`idle timeout: ${this.id}`);
      this.sendMessage({
        id: "0",
        sender: "server",
        type: "system",
        message: "idle",
      });
      this.ws.close();
    }, this._idleTimeoutSeconds * 1000);
  };

  sendFromChatter = (m: Message) => {
    this.sendMessage(m);
    this.resetIdleTimeout();
  };

  sendMessage = (data: Message) => {
    this.ws.readyState === this.ws.OPEN && this.ws.send(JSON.stringify(data));
  };

  receivedMessage = (event: MessageEvent) => {
    this.resetIdleTimeout();
    const message = JSON.parse(event.data.toString());
    this.chatter.status === "ready" &&
      this.chatter.sendMessage(message.message);
  };
}
const clients: { [id: string]: Client } = {};
