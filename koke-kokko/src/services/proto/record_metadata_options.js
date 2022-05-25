import * as dependency_2 from "./record_metadata";
import * as pb_1 from "google-protobuf";
export var webaas;
(function (webaas) {
    var db;
    (function (db) {
        var record;
        (function (record) {
            class SchemaOptions extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("split_long_records" in data && data.split_long_records != undefined) {
                            this.split_long_records = data.split_long_records;
                        }
                        if ("store_record_versions" in data && data.store_record_versions != undefined) {
                            this.store_record_versions = data.store_record_versions;
                        }
                    }
                }
                get split_long_records() {
                    return pb_1.Message.getField(this, 3);
                }
                set split_long_records(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get store_record_versions() {
                    return pb_1.Message.getField(this, 4);
                }
                set store_record_versions(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new SchemaOptions({});
                    if (data.split_long_records != null) {
                        message.split_long_records = data.split_long_records;
                    }
                    if (data.store_record_versions != null) {
                        message.store_record_versions = data.store_record_versions;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.split_long_records != null) {
                        data.split_long_records = this.split_long_records;
                    }
                    if (this.store_record_versions != null) {
                        data.store_record_versions = this.store_record_versions;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.split_long_records !== undefined)
                        writer.writeBool(3, this.split_long_records);
                    if (this.store_record_versions !== undefined)
                        writer.writeBool(4, this.store_record_versions);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SchemaOptions();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 3:
                                message.split_long_records = reader.readBool();
                                break;
                            case 4:
                                message.store_record_versions = reader.readBool();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return SchemaOptions.deserialize(bytes);
                }
            }
            record.SchemaOptions = SchemaOptions;
            class FieldOptions extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("primary_key" in data && data.primary_key != undefined) {
                            this.primary_key = data.primary_key;
                        }
                        if ("index" in data && data.index != undefined) {
                            this.index = data.index;
                        }
                    }
                }
                get primary_key() {
                    return pb_1.Message.getField(this, 1);
                }
                set primary_key(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get index() {
                    return pb_1.Message.getWrapperField(this, FieldOptions.IndexOption, 2);
                }
                set index(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new FieldOptions({});
                    if (data.primary_key != null) {
                        message.primary_key = data.primary_key;
                    }
                    if (data.index != null) {
                        message.index = FieldOptions.IndexOption.fromObject(data.index);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.primary_key != null) {
                        data.primary_key = this.primary_key;
                    }
                    if (this.index != null) {
                        data.index = this.index.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.primary_key !== undefined)
                        writer.writeBool(1, this.primary_key);
                    if (this.index !== undefined)
                        writer.writeMessage(2, this.index, () => this.index.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FieldOptions();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.primary_key = reader.readBool();
                                break;
                            case 2:
                                reader.readMessage(message.index, () => message.index = FieldOptions.IndexOption.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return FieldOptions.deserialize(bytes);
                }
            }
            record.FieldOptions = FieldOptions;
            (function (FieldOptions) {
                class IndexOption extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("type" in data && data.type != undefined) {
                                this.type = data.type;
                            }
                            if ("unique" in data && data.unique != undefined) {
                                this.unique = data.unique;
                            }
                            if ("options" in data && data.options != undefined) {
                                this.options = data.options;
                            }
                        }
                    }
                    get type() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set type(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get unique() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set unique(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get options() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.webaas.db.record.Index.Option, 3);
                    }
                    set options(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new IndexOption({});
                        if (data.type != null) {
                            message.type = data.type;
                        }
                        if (data.unique != null) {
                            message.unique = data.unique;
                        }
                        if (data.options != null) {
                            message.options = data.options.map(item => dependency_2.webaas.db.record.Index.Option.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.type != null) {
                            data.type = this.type;
                        }
                        if (this.unique != null) {
                            data.unique = this.unique;
                        }
                        if (this.options != null) {
                            data.options = this.options.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.type === "string" && this.type.length)
                            writer.writeString(1, this.type);
                        if (this.unique !== undefined)
                            writer.writeBool(2, this.unique);
                        if (this.options !== undefined)
                            writer.writeRepeatedMessage(3, this.options, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IndexOption();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.type = reader.readString();
                                    break;
                                case 2:
                                    message.unique = reader.readBool();
                                    break;
                                case 3:
                                    reader.readMessage(message.options, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.webaas.db.record.Index.Option.deserialize(reader), dependency_2.webaas.db.record.Index.Option));
                                    break;
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return IndexOption.deserialize(bytes);
                    }
                }
                FieldOptions.IndexOption = IndexOption;
            })(FieldOptions = record.FieldOptions || (record.FieldOptions = {}));
        })(record = db.record || (db.record = {}));
    })(db = webaas.db || (webaas.db = {}));
})(webaas || (webaas = {}));
