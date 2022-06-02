import * as pb_1 from "google-protobuf";
export var csdi;
(function (csdi) {
    class User extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 4], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("username" in data && data.username !== undefined) {
                    this.username = data.username;
                }
                if ("password" in data && data.password !== undefined) {
                    this.password = data.password;
                }
                if ("follow_tag_arr" in data && data.follow_tag_arr !== undefined) {
                    this.follow_tag_arr = data.follow_tag_arr;
                }
                if ("article_id_arr" in data && data.article_id_arr !== undefined) {
                    this.article_id_arr = data.article_id_arr;
                }
            }
        }
        get username() {
            return pb_1.Message.getField(this, 1);
        }
        set username(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get password() {
            return pb_1.Message.getField(this, 2);
        }
        set password(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get follow_tag_arr() {
            return pb_1.Message.getField(this, 3);
        }
        set follow_tag_arr(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get article_id_arr() {
            return pb_1.Message.getField(this, 4);
        }
        set article_id_arr(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new User({});
            if (data.username != null) {
                message.username = data.username;
            }
            if (data.password != null) {
                message.password = data.password;
            }
            if (data.follow_tag_arr != null) {
                message.follow_tag_arr = data.follow_tag_arr;
            }
            if (data.article_id_arr != null) {
                message.article_id_arr = data.article_id_arr;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.username != null) {
                data.username = this.username;
            }
            if (this.password != null) {
                data.password = this.password;
            }
            if (this.follow_tag_arr != null) {
                data.follow_tag_arr = this.follow_tag_arr;
            }
            if (this.article_id_arr != null) {
                data.article_id_arr = this.article_id_arr;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.username === "string" && this.username.length)
                writer.writeString(1, this.username);
            if (typeof this.password === "string" && this.password.length)
                writer.writeString(2, this.password);
            if (this.follow_tag_arr !== undefined)
                writer.writeRepeatedString(3, this.follow_tag_arr);
            if (this.article_id_arr !== undefined)
                writer.writeRepeatedString(4, this.article_id_arr);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new User();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.username = reader.readString();
                        break;
                    case 2:
                        message.password = reader.readString();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    case 4:
                        pb_1.Message.addToRepeatedField(message, 4, reader.readString());
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
            return User.deserialize(bytes);
        }
    }
    csdi.User = User;
    class Article extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("article_id" in data && data.article_id !== undefined) {
                    this.article_id = data.article_id;
                }
                if ("title" in data && data.title !== undefined) {
                    this.title = data.title;
                }
                if ("author" in data && data.author !== undefined) {
                    this.author = data.author;
                }
                if ("content" in data && data.content !== undefined) {
                    this.content = data.content;
                }
                if ("post_time" in data && data.post_time !== undefined) {
                    this.post_time = data.post_time;
                }
                if ("related_tag_arr" in data && data.related_tag_arr !== undefined) {
                    this.related_tag_arr = data.related_tag_arr;
                }
            }
        }
        get article_id() {
            return pb_1.Message.getField(this, 1);
        }
        set article_id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get title() {
            return pb_1.Message.getField(this, 2);
        }
        set title(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get author() {
            return pb_1.Message.getField(this, 3);
        }
        set author(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get content() {
            return pb_1.Message.getField(this, 4);
        }
        set content(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get post_time() {
            return pb_1.Message.getField(this, 5);
        }
        set post_time(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get related_tag_arr() {
            return pb_1.Message.getField(this, 6);
        }
        set related_tag_arr(value) {
            pb_1.Message.setField(this, 6, value);
        }
        static fromObject(data) {
            const message = new Article({});
            if (data.article_id != null) {
                message.article_id = data.article_id;
            }
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.author != null) {
                message.author = data.author;
            }
            if (data.content != null) {
                message.content = data.content;
            }
            if (data.post_time != null) {
                message.post_time = data.post_time;
            }
            if (data.related_tag_arr != null) {
                message.related_tag_arr = data.related_tag_arr;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.article_id != null) {
                data.article_id = this.article_id;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.author != null) {
                data.author = this.author;
            }
            if (this.content != null) {
                data.content = this.content;
            }
            if (this.post_time != null) {
                data.post_time = this.post_time;
            }
            if (this.related_tag_arr != null) {
                data.related_tag_arr = this.related_tag_arr;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.article_id === "string" && this.article_id.length)
                writer.writeString(1, this.article_id);
            if (typeof this.title === "string" && this.title.length)
                writer.writeString(2, this.title);
            if (typeof this.author === "string" && this.author.length)
                writer.writeString(3, this.author);
            if (typeof this.content === "string" && this.content.length)
                writer.writeString(4, this.content);
            if (typeof this.post_time === "string" && this.post_time.length)
                writer.writeString(5, this.post_time);
            if (this.related_tag_arr !== undefined)
                writer.writeRepeatedString(6, this.related_tag_arr);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Article();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.article_id = reader.readString();
                        break;
                    case 2:
                        message.title = reader.readString();
                        break;
                    case 3:
                        message.author = reader.readString();
                        break;
                    case 4:
                        message.content = reader.readString();
                        break;
                    case 5:
                        message.post_time = reader.readString();
                        break;
                    case 6:
                        pb_1.Message.addToRepeatedField(message, 6, reader.readString());
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
            return Article.deserialize(bytes);
        }
    }
    csdi.Article = Article;
    class Tag extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("tagname" in data && data.tagname !== undefined) {
                    this.tagname = data.tagname;
                }
                if ("article_id_arr" in data && data.article_id_arr !== undefined) {
                    this.article_id_arr = data.article_id_arr;
                }
            }
        }
        get tagname() {
            return pb_1.Message.getField(this, 1);
        }
        set tagname(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get article_id_arr() {
            return pb_1.Message.getField(this, 2);
        }
        set article_id_arr(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new Tag({});
            if (data.tagname != null) {
                message.tagname = data.tagname;
            }
            if (data.article_id_arr != null) {
                message.article_id_arr = data.article_id_arr;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.tagname != null) {
                data.tagname = this.tagname;
            }
            if (this.article_id_arr != null) {
                data.article_id_arr = this.article_id_arr;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.tagname === "string" && this.tagname.length)
                writer.writeString(1, this.tagname);
            if (this.article_id_arr !== undefined)
                writer.writeRepeatedString(2, this.article_id_arr);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Tag();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.tagname = reader.readString();
                        break;
                    case 2:
                        pb_1.Message.addToRepeatedField(message, 2, reader.readString());
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
            return Tag.deserialize(bytes);
        }
    }
    csdi.Tag = Tag;
})(csdi || (csdi = {}));
