  
import { AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("484056696958-v822b4u41uflhddsh5jsugm7jnpb4fpd.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}