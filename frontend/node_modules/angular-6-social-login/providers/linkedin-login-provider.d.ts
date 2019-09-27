import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass, LinkedInResponse } from '../entities/user';
export declare class LinkedinLoginProvider extends BaseLoginProvider {
    private clientId;
    static readonly PROVIDER_ID: string;
    loginProviderObj: LoginProviderClass;
    constructor(clientId: string);
    initialize(): Promise<SocialUser>;
    onLinkedInLoad(): void;
    drawUser(response: LinkedInResponse): SocialUser;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
