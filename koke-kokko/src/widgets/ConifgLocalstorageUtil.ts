
import { Config } from '../services/service';
import { csdi } from "../services/proto/koke_kokko";

export namespace LocalStoreConfig {
    export function set_config(config: Config) {
        localStorage.setItem('config', JSON.stringify(config));
    }

    export function get_config(): Config | null {
        let conifg_str = localStorage.getItem('config');
        if (conifg_str) {
            let configFromStorage = JSON.parse(conifg_str) as Config;
            let config = new Config()
            let user = new csdi.User()
            Object.assign(user, configFromStorage['user'])
            Object.assign(config, configFromStorage)
            config.user = user
            return config
        }
        else {
            return null;
        }
    }

    export function remove_config() {
        localStorage.removeItem('config');
    }

}

