import axios from 'axios';
import { Config } from './service';
import { Logger } from "tslog";
import { TextEncoder } from 'util';
const log: Logger = new Logger();

namespace Util {
    export type RegisterAppResponseDTO = {
        appID: string,
        appName: string,
    };

    export type RecordDTO = {
        appID: string,
        schema_name: string,
        record_key: string,
        record_value: string,
    };

    export type StringDTO = string;

    export enum MaxRange {
        begin_key = "0",
        end_key = "z",
    }
}

export namespace Request {
    export async function register_app(config: Config) {
        const { data } = await axios.post<Util.RegisterAppResponseDTO>(
            config.endpoint + "/app",
            {},
            {
                params: {
                    appName: config.app_name,
                },
            }
        );
        config.app_id = data.appID;
    }

    export async function upload_schema(config: Config, content: Buffer) {
        const { data } = await axios.put<Util.StringDTO>(
            config.endpoint + "/schema",
            content,
            {
                params: {
                    appID: config.app_id,
                    fileName: config.filename,
                    version: config.version,
                },
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            },
        );
    }

    export async function update_schema(config: Config) {
        const { data } = await axios.post<Util.StringDTO>(
            config.endpoint + "/schema",
            {},
            {
                params: {
                    appID: config.app_id,
                    version: config.version,
                },
            },
        );
    }

    export async function put_record
        (config: Config, content: Uint8Array, schema_name: string) {
        const { data } = await axios.post<Util.RecordDTO>(
            config.endpoint + "/record",
            content,
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                },
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            },
        );
    }

    export async function delete_record
        (config: Config, key: string, schema_name: string) {
        const { data } = await axios.delete<Util.RecordDTO>(
            config.endpoint + "/record",
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    recordKey: key,
                },
            },
        );
    }

    export async function get_record_by_key
        (config: Config, key: string, schema_name: string): Promise<Uint8Array> {
        const { data } = await axios.get<Util.StringDTO>(
            config.endpoint + "/query",
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    recordKey: key,
                },
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            },
        );

        return new TextEncoder().encode(data);
    }

    export async function get_range_record_by_key
        (config: Config, schema_name: string,
            begin_key: string = Util.MaxRange.begin_key, end_key: string = Util.MaxRange.end_key): Promise<Uint8Array[]> {
        const { data } = await axios.get<Util.StringDTO>(
            config.endpoint + "/query",
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    range: true,
                    beginKey: begin_key,
                    endKey: end_key,
                    iteration: 1,
                },
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            },
        );

        let res: Uint8Array[] = [];

        const raw_content = new TextEncoder().encode(data);
        let buffer = Buffer.from(raw_content);

        const length = buffer.length;
        let offset = 1; // ignore more
        while (offset < length) {
            let record_length = buffer.readUInt16BE(offset);
            offset += 2;
            res.push(raw_content.slice(offset, offset + record_length));
            offset += record_length;
        }

        return res;
    }
}
