import {WebsocketBuilder} from 'websocket-ts';
import {LocalStoreConfig} from "../widgets/ConifgLocalstorageUtil";

export enum WebsocketEvents {
    open = 'open',          // Connection is opened or re-opened
    close = 'close',        // Connection is closed
    error = 'error',        // An error occurred
    message = 'message',    // A message was received
    retry = 'retry'         // A try to re-connect is made
}



export function makeWebSocket(onMessage: (ev: MessageEvent) => void) {
    console.log("makeWebSocket called!")
    const config = LocalStoreConfig.get_config()!
    new WebsocketBuilder('ws://202.120.40.82:11233/notification?appID=' + config.app_id + "&notificationID=" + config.notificationID)
        .onOpen((i, ev) => {
            console.log("opened")
        })
        .onClose((i, ev) => {
            console.log("closed")
        })
        .onError((i, ev) => {
            console.log("error")
        })
        .onMessage((i, ev) => {
            console.log("message", ev)
            onMessage(ev)
        })
        .build();
}