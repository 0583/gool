import axios from 'axios';
import { Config } from './service';
import qs from 'qs';
import { Buffer } from 'buffer';
import { Schema } from "./schema/schema";


// @ts-ignore
window.Buffer = Buffer;

export namespace YuanZhuoUtil {

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

    export interface NewsApiDTO {
        data: {
            newsList: NewsDTO[]
        }
    }

    export interface NewsDTO {
        title: string,
        url: string,
        category: string
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

    import NewsDTO = YuanZhuoUtil.NewsDTO;
    import NewsApiDTO = YuanZhuoUtil.NewsApiDTO;

    export async function say_hello() {
        const { data } = await axios.get<string>(
            "/api/hello"
        );
        return data;
    }

    export async function get_news() {
        const {data} = await axios.get<NewsApiDTO>(
            "/news/api"
        );
        return data.data.newsList ?? []
    }

    export async function register_app(config: Config) {
        const { data } = await axios.post<YuanZhuoUtil.RegisterAppResponseDTO>(
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
        const { data } = await axios.put<YuanZhuoUtil.StringDTO>(
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
        const { data } = await axios.post<YuanZhuoUtil.StringDTO>(
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
        const { data } = await axios.post<YuanZhuoUtil.TransactionDto>(
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
        const { data } = await axios.post<YuanZhuoUtil.TransactionDto>(
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

    export async function abort_transaction(transaction_id: string): Promise<boolean> {
        const { data } = await axios.post<YuanZhuoUtil.TransactionDto>(
            "/api/transaction",
            {},
            {
                params: {
                    action: "abort",
                    transactionID: transaction_id,
                },
            },
        );

        return data.success;
    }

    export async function put_record_transactional
        (config: Config, content: string, schema_name: string, transaction_id: string) {
        const { data } = await axios.post<YuanZhuoUtil.RecordDTO>(
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
        const { data } = await axios.post<YuanZhuoUtil.RecordDTO>(
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
        const { data } = await axios.delete<YuanZhuoUtil.RecordDTO>(
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
        (config: Config, key: string, schema_name: string): Promise<YuanZhuoUtil.ObjectDTO> {
        const { data } = await axios.get<YuanZhuoUtil.ObjectDTO>(
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
         begin_key: string = YuanZhuoUtil.MaxRange.begin_key, end_key: string = YuanZhuoUtil.MaxRange.end_key): Promise<YuanZhuoUtil.ObjectDTO[]> {

        const { data } = await axios.get<YuanZhuoUtil.ObjectArrayDTO>(
            "/api/query",
            {
                params: {
                    appID: config.app_id,
                    schemaName: schema_name,
                    range: true,
                    beginKey: begin_key,
                    endKey: end_key,
                    iteration: 255,
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
        const { data } = await axios.post<YuanZhuoUtil.ImageDTO>(
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
        const { data } = await axios.post<YuanZhuoUtil.RegisterNotificationDTO>(
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
