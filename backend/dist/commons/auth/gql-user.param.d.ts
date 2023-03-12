export interface ICurrentUser {
    id?: string;
    email: string;
    name?: string;
    password?: string;
}
export declare const CurrentUser: (...dataOrPipes: any[]) => ParameterDecorator;
