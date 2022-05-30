
import {Config} from "../services/service";

export namespace LSConfig{
    var name = "config"
    export function SetConfig(temp:Config){
    localStorage.setItem(name,JSON.stringify(temp))
}

    export  function getConfig(){
    var data = localStorage.getItem(name)
    if (data != null){
        return JSON.parse(data);
    }else{
        return null
    }
}

    export  function RemoveConfig(){
    localStorage.removeItem(name)
}
}