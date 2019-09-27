import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';
export declare class GoogleLoginProvider extends BaseLoginProvider {
    private clientId;
    static readonly PROVIDER_ID: string;
    loginProviderObj: LoginProviderClass;
    private auth2;
    constructor(clientId: string);
    initialize(): Promise<SocialUser>;
    drawUser(): SocialUser;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
