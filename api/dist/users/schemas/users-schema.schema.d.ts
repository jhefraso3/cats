import { Document } from 'mongoose';
export declare class Users extends Document {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare const UsersSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, Document<unknown, any, Users, any, import("mongoose").DefaultSchemaOptions> & Users & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, Users>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {
    firstName?: import("mongoose").SchemaDefinitionProperty<string, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined;
    lastName?: import("mongoose").SchemaDefinitionProperty<string, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined;
    username?: import("mongoose").SchemaDefinitionProperty<string, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined;
    id?: import("mongoose").SchemaDefinitionProperty<string, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Users, Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined;
}, Users>;
