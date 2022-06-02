
import {Config} from "../services/service";
import {csdi} from "../services/proto/koke_kokko";

export namespace LSConfig{
    var store = require('store')

    export function SetConfig(temp:Config){
        store.set("config",temp)
}

    export function GetConfig(){
        return store.get("config")
}

    export  function RemoveAll(){
        store.remove("config")
        store.remove("user")
}
    export function SetUser(user:csdi.User){
        store.set("user",user)
}
    export function GetUser(){
        return store.get("user")
}

}