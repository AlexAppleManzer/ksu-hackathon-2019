(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
	(factory((global['angular-6-social-login'] = {}),global.core,global.common,global.rxjs));
}(this, (function (exports,core,common,rxjs) { 'use strict';

var AuthServiceConfig = (function () {
    /**
     * @param {?} providers
     */
    function AuthServiceConfig(providers) {
        this.providers = new Map();
        for (var i = 0; i < providers.length; i++) {
            var element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
    return AuthServiceConfig;
}());
var AuthService = (function () {
    /**
     * @param {?} config
     */
    function AuthService(config) {
        var _this = this;
        this._user = null;
        this._authState = new rxjs.BehaviorSubject(null);
        this.providers = config.providers;
        this.providers.forEach(function (provider, key) {
            provider.initialize().then(function (user) {
                user.provider = key;
                _this._user = user;
                _this._authState.next(user);
            }).catch(function (err) {
                // this._authState.next(null);
            });
        });
    }
    Object.defineProperty(AuthService.prototype, "authState", {
        /**
         * @return {?}
         */
        get: function () {
            return this._authState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} providerId
     * @return {?}
     */
    AuthService.prototype.signIn = function (providerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn().then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                });
            }
            else {
                reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._user && _this._user.provider) {
                var /** @type {?} */ providerId = _this._user.provider;
                var /** @type {?} */ providerObject = _this.providers.get(providerId);
                providerObject.signOut().then(function () {
                    _this._user = null;
                    _this._authState.next(null);
                    resolve();
                }).catch(function (err) {
                    _this._authState.next(null);
                });
            }
            else {
                reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    return AuthService;
}());
AuthService.LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
AuthService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
AuthService.ctorParameters = function () { return [
    { type: AuthServiceConfig, },
]; };

var SocialLoginModule = (function () {
    function SocialLoginModule() {
    }
    return SocialLoginModule;
}());
SocialLoginModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                providers: [
                    AuthService
                ]
            },] },
];
/**
 * @nocollapse
 */
SocialLoginModule.ctorParameters = function () { return []; };

var SocialUser = (function () {
    function SocialUser() {
    }
    return SocialUser;
}());
var LoginProviderClass = (function () {
    function LoginProviderClass() {
    }
    return LoginProviderClass;
}());
var LinkedInResponse = (function () {
    function LinkedInResponse() {
    }
    return LinkedInResponse;
}());

/**
 * @abstract
 */
var BaseLoginProvider = (function () {
    function BaseLoginProvider() {
    }
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.initialize = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.signIn = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.signOut = function () { };
    /**
     * @param {?} obj
     * @param {?} onload
     * @return {?}
     */
    BaseLoginProvider.prototype.loadScript = function (obj, onload) {
        if (document.getElementById(obj.name)) {
            return;
        }
        var /** @type {?} */ signInJS = document.createElement('script');
        signInJS.async = true;
        signInJS.src = obj.url;
        signInJS.onload = onload;
        if (obj.name === 'LINKEDIN') {
            signInJS.async = false;
            signInJS.text = ('api_key: ' + obj.id).replace('\'', '');
        }
        document.head.appendChild(signInJS);
    };
    return BaseLoginProvider;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GoogleLoginProvider = (function (_super) {
    __extends(GoogleLoginProvider, _super);
    /**
     * @param {?} clientId
     */
    function GoogleLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'google';
        _this.loginProviderObj.url = 'https://apis.google.com/js/platform.js';
        return _this;
    }
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                gapi.load('auth2', function () {
                    _this.auth2 = gapi.auth2.init({
                        client_id: _this.clientId,
                        scope: 'email'
                    });
                    _this.auth2.then(function () {
                        if (_this.auth2.isSignedIn.get()) {
                            resolve(_this.drawUser());
                        }
                    });
                });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.drawUser = function () {
        var /** @type {?} */ user = new SocialUser();
        var /** @type {?} */ profile = this.auth2.currentUser.get().getBasicProfile();
        var /** @type {?} */ authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.image = profile.getImageUrl();
        user.token = authResponseObj.access_token;
        user.idToken = authResponseObj.id_token;
        return user;
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ promise = _this.auth2.signIn();
            promise.then(function () {
                resolve(_this.drawUser());
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth2.signOut().then(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    return GoogleLoginProvider;
}(BaseLoginProvider));
GoogleLoginProvider.PROVIDER_ID = 'google';

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FacebookLoginProvider = (function (_super) {
    __extends$1(FacebookLoginProvider, _super);
    /**
     * @param {?} clientId
     */
    function FacebookLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'facebook';
        _this.loginProviderObj.url = 'https://connect.facebook.net/en_US/sdk.js';
        return _this;
    }
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                FB.init({
                    appId: _this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.10'
                });
                FB.AppEvents.logPageView();
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        var /** @type {?} */ accessToken_1 = FB.getAuthResponse()['accessToken'];
                        FB.api('/me?fields=name,email,picture', function (res) {
                            resolve(FacebookLoginProvider.drawUser(Object.assign({}, { token: accessToken_1 }, res)));
                        });
                    }
                });
            });
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    FacebookLoginProvider.drawUser = function (response) {
        var /** @type {?} */ user = new SocialUser();
        user.id = response.id;
        user.name = response.name;
        user.email = response.email;
        user.token = response.token;
        user.image = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
        return user;
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signIn = function () {
        return new Promise(function (resolve, reject) {
            FB.login(function (response) {
                if (response.authResponse) {
                    var /** @type {?} */ accessToken_2 = FB.getAuthResponse()['accessToken'];
                    FB.api('/me?fields=name,email,picture', function (res) {
                        resolve(FacebookLoginProvider.drawUser(Object.assign({}, { token: accessToken_2 }, res)));
                    });
                }
            }, { scope: 'email,public_profile' });
        });
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signOut = function () {
        return new Promise(function (resolve, reject) {
            FB.logout(function (response) {
                resolve();
            });
        });
    };
    return FacebookLoginProvider;
}(BaseLoginProvider));
FacebookLoginProvider.PROVIDER_ID = 'facebook';

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LinkedinLoginProvider = (function (_super) {
    __extends$2(LinkedinLoginProvider, _super);
    /**
     * @param {?} clientId
     */
    function LinkedinLoginProvider(clientId) {
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.loginProviderObj = new LoginProviderClass();
        _this.loginProviderObj.id = clientId;
        _this.loginProviderObj.name = 'linkedin';
        _this.loginProviderObj.url = 'https://platform.linkedin.com/in.js';
        return _this;
    }
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(_this.loginProviderObj, function () {
                IN.init({
                    api_key: _this.clientId,
                    authorize: true,
                    onLoad: _this.onLinkedInLoad()
                });
                IN.Event.on(IN, 'auth', function () {
                    if (IN.User.isAuthorized()) {
                        IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
                            resolve(_this.drawUser(res));
                        });
                    }
                });
            });
        });
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.onLinkedInLoad = function () {
        IN.Event.on(IN, 'systemReady', function () {
            IN.User.refresh();
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    LinkedinLoginProvider.prototype.drawUser = function (response) {
        var /** @type {?} */ user = new SocialUser();
        user.id = response.emailAddress;
        user.name = response.firstName + ' ' + response.lastName;
        user.email = response.emailAddress;
        user.image = response.pictureUrl;
        user.token = IN.ENV.auth.oauth_token;
        return user;
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.signIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            IN.User.authorize(function () {
                IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
                    resolve(_this.drawUser(res));
                });
            });
        });
    };
    /**
     * @return {?}
     */
    LinkedinLoginProvider.prototype.signOut = function () {
        return new Promise(function (resolve, reject) {
            IN.User.logout(function (response) {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    return LinkedinLoginProvider;
}(BaseLoginProvider));
LinkedinLoginProvider.PROVIDER_ID = 'linkedin';

exports.SocialLoginModule = SocialLoginModule;
exports.AuthService = AuthService;
exports.AuthServiceConfig = AuthServiceConfig;
exports.SocialUser = SocialUser;
exports.LoginProviderClass = LoginProviderClass;
exports.LinkedInResponse = LinkedInResponse;
exports.FacebookLoginProvider = FacebookLoginProvider;
exports.GoogleLoginProvider = GoogleLoginProvider;
exports.LinkedinLoginProvider = LinkedinLoginProvider;

Object.defineProperty(exports, '__esModule', { value: true });

})));
