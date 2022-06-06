import { WebsocketBuilder } from 'websocket-ts';

export enum WebsocketEvents {
    open = 'open',          // Connection is opened or re-opened
    close = 'close',        // Connection is closed
    error = 'error',        // An error occurred
    message = 'message',    // A message was received
    retry = 'retry'         // A try to re-connect is made
}

const ws = new WebsocketBuilder('')
    .onOpen((i, ev) => { console.log("opened") })
    .onClose((i, ev) => { console.log("closed") })
    .onError((i, ev) => { console.log("error") })
    .onMessage((i, ev) => { console.log("message") })
    .build();