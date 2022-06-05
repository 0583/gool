import axios from 'axios';
import { Config } from './service';
import qs from 'qs';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

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

    export function string2binary(str: string): Uint8Array {
        var bufView = new Uint8Array(str.length);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return bufView;
    }
}


export namespace Request {
    export async function register_app(config: Config) {
        const { data } = await axios.post<Util.RegisterAppResponseDTO>(
            "/api/app",
            {},
            {
                params: {
                    appName: config.app_name,
                },
            }
        );
        config.app_id = data.appID;
    }

    export async function upload_schema(config: Config, content: string) {
        const { data } = await axios.put<Util.StringDTO>(
            "/api/schema",
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
                withCredentials: true,
            },
        );
    }

    export async function update_schema(config: Config) {
        const { data } = await axios.post<Util.StringDTO>(
            "/api/schema",
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
            "/api/record",
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
            "/api/record",
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
            "/api/query",
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    recordKey: key,
                },
                paramsSerializer: (params) => qs.stringify(params, { encode: false }),
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            },
        );

        return Util.string2binary(data);
    }

    export async function get_range_record_by_key
        (config: Config, schema_name: string,
            begin_key: string = Util.MaxRange.begin_key, end_key: string = Util.MaxRange.end_key): Promise<Uint8Array[]> {
        const { data } = await axios.get<Util.StringDTO>(
            "/api/query",
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

        const raw_content = Util.string2binary(data);;
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
