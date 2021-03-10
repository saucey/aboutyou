import { GlobalMessageType } from './global-message-type';

export interface GlobalMessageData {
  message: string;
  type: GlobalMessageType.ERROR | GlobalMessageType.SUCCESS;
}
