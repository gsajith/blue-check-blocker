export enum Sender {
    Content,
}

export interface ChromeMessage {
    from: Sender
    message: any
    type: string
}
