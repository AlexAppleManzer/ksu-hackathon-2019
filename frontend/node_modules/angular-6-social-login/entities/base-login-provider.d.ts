import { LoginProvider } from './login-provider';
import { SocialUser, LoginProviderClass } from './user';
export declare abstract class BaseLoginProvider implements LoginProvider {
    constructor();
    abstract initialize(): Promise<SocialUser>;
    abstract signIn(): Promise<SocialUser>;
    abstract signOut(): Promise<any>;
    loadScript(obj: LoginProviderClass, onload: any): void;
}
