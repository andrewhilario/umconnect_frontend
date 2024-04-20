export interface Message {
  sender: string;
  receiver: string;
  timestamp: string;
  message: MessageClass[];
}

export interface MessageClass {
  text: string;
  user: string;
  images: string[];
}
