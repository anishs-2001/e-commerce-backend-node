export type Config = {
    [key: string]: {
        mongoURI: string;
        port: number;
        secretKey: string;
    };
};

export interface EnvConfig {
    port: number;
    socket: number;
    mongodb_connection_string: string;
    mysql_host:string;
    mysql_password:string;
    mysql_username:string;
    mysql_port:number;
    jwt_secret_key: string;
    s3_secret_key: string;
    s3_access_key:string;
    stripe_secret_key: string;
    cors_origin: string;
  }