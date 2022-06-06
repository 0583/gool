import axios from 'axios';
import { Config } from './service';
import qs from 'qs';
import { Buffer } from 'buffer';
import { Schema } from "./schema/schema";


// @ts-ignore
window.Buffer = Buffer;

namespace Util {
    export type RegisterAppResponseDTO = {
        appID: string,
        appName: string,
    };
    export type RegisterNotificationDTO = {
        appID: string,
        notificationID: string,
        schemaName: string,
        recordKeys: string[],
    };
    export type RecordDTO = {
        appID: string,
        schema_name: string,
        record_key: string,
        record_value: string,
    };

    export type StringDTO = string;

    export type ObjectDTO = Schema.User | Schema.Article | Schema.Tag;

    export type ImageDTO = {
        status: string,
        uuid: string
    }

    export type ObjectArrayDTO = {
        more: string,
        entities: ObjectDTO[],
    };

    export type TransactionDto = {
        transactionID: string,
        success: boolean,
    };

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
                    'Content-Type': 'text/plain',
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

    export async function begin_transaction(): Promise<string> {
        const { data } = await axios.post<Util.TransactionDto>(
            "/api/transaction",
            {},
            {
                params: {
                    action: "begin",
                },
            },
        );

        return data.transactionID;
    }

    export async function commit_transaction(transaction_id: string): Promise<boolean> {
        const { data } = await axios.post<Util.TransactionDto>(
            "/api/transaction",
            {},
            {
                params: {
                    action: "commit",
                    transactionID: transaction_id,
                },
            },
        );

        return data.success;
    }

    export async function put_record_transactional
        (config: Config, content: string, schema_name: string, transaction_id: string) {
        const { data } = await axios.post<Util.RecordDTO>(
            "/api/record/transactional",
            content,
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    transactionID: transaction_id,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    export async function put_record
        (config: Config, content: string, schema_name: string) {
        const { data } = await axios.post<Util.RecordDTO>(
            "/api/record",
            content,
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                },
                headers: {
                    'Content-Type': 'application/json',
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
        (config: Config, key: string, schema_name: string): Promise<Util.ObjectDTO> {
        const { data } = await axios.get<Util.ObjectDTO>(
            "/api/query",
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    recordKey: key,
                },
                paramsSerializer: (params) => qs.stringify(params, { encode: false }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return data;
    }

    export async function get_range_record_by_key
        (config: Config, schema_name: string,
            begin_key: string = Util.MaxRange.begin_key, end_key: string = Util.MaxRange.end_key): Promise<Util.ObjectDTO[]> {
        const { data } = await axios.get<Util.ObjectArrayDTO>(
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
                    'Content-Type': 'application/json',
                },
            },
        );
        return data.entities;
    }

    export async function upload_image(image: File): Promise<string> {
        let formData = new FormData()
        formData.append('image', image)
        const { data } = await axios.post<Util.ImageDTO>(
            '/api/image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return data.uuid;
    }

    export async function register_notification(config: Config, schema_name: string, recordKeys: string[], notificationID?: string): Promise<string> {
        const { data } = await axios.post<Util.RegisterNotificationDTO>(
            "/webaas/notification",
            {
                    appID: config.app_id,
                    schemaName: schema_name,
                    notificationID: notificationID,
                    recordKeys: recordKeys,
                },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            },
        );
        return data.notificationID;
    }
}
