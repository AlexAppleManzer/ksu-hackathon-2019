import { Observable } from 'rxjs';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/user';
export interface AuthServiceConfigItem {
    id: string;
    provider: LoginProvider;
}
export declare class AuthServiceConfig {
    providers: Map<string, LoginProvider>;
    constructor(providers: AuthServiceConfigItem[]);
}
export declare class AuthService {
    private static readonly LOGIN_PROVIDER_NOT_FOUND;
    private providers;
    private _user;
    private _authState;
    readonly authState: Observable<SocialUser>;
    constructor(config: AuthServiceConfig);
    signIn(providerId: string): Promise<SocialUser>;
    signOut(): Promise<any>;
}
