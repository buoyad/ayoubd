export enum MessageType {
    HELLO = 'HELLO',
    MESSAGE = 'MESSAGE',
    ERROR = 'ERROR',
}

export type Message = {
    type: MessageType,
    content: string,
}