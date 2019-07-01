/**
 * Fast login plugin
 * Add <script> tag to the page footer, before the closing </body> tag
 */


var fastButton = {
    /**
     * path to Round Icon iframe source
     */
    iconFramePath: "https://js.fast.co/images/icon.html",
    /**
     * path to Form iframe source
     */
    formFramePath: "https://api.fast.co/api/buttonframe",
    /**
     * path to Inline Button iframe source
     */
    buttonFramePath: "https://api.fast.co/api/inlinebuttonframe",
    /**
     * space between icon and window border 
     */
    iconPadding: 15,
    /**
     * default width of Form
     */
    defaultFormWidth: 380,

    apiKey: "",
    iconDiv: null,
    iframeDiv: {},
    iframeOpenTime: 0,
    formInlineBtnId: null,
    inlineButtons: [],
    randomSeed: (new Date()).getTime(),
    customIcon: false,

    fastlang: 'en',

    /**
     * Initialization of plugin
     */
    init: function() {
        this.fastlang = navigator.languages
            ? navigator.languages[0]
            : (navigator.language || navigator.userLanguage);

        if (this.fastlang) {
            if (this.fastlang.length < 1) {
                this.fastlang = 'en';
            }
            this.fastlang = this.fastlang.slice(0, 2);
        }

        this.apiKey = this.getParams("key", this.currentScript().src);
        if (this.apiKey) {
            this.showIcon(this.getParams("icon", this.currentScript().src));
            this.showForm({left: 0, bottom: 0, width: this.defaultFormWidth}, true);
        }

        var div;
        var iframe;
        var identifier;
        var inlineApiKey;
        var rows = document.getElementsByTagName("fast-button");
        for (var i = 0; i < rows.length; i++) {
            identifier = rows[i].getAttribute("data-identifier-value") || "";
            inlineApiKey = rows[i].getAttribute("data-api-key") || "";
            div = document.createElement("div");
            iframe = document.createElement('iframe');
            div.style.cssText = "height:70px;position:relative;";
            rows[i].appendChild(div);
            iframe.style.cssText = "display: initial!important;width: 100%!important;height: 100%!important;border: none!important;position: absolute!important;bottom: 0!important;right: 0!important;background: transparent!important;";
            div.appendChild(iframe);

            this.createInlineButton(iframe, i, identifier, inlineApiKey);

            this.inlineButtons[i] = {div: div, identifier: identifier, inlineApiKey: inlineApiKey};
            this.showForm({left: 0, bottom: 0, width: this.defaultFormWidth, inlineBtnId: i}, true);
                        
        }

        var me = this;
        // install event listeners
        window.addEventListener('message', function(event) {
            if (event.data
                && (me.iconFramePath.indexOf(event.origin) === 0
                || me.formFramePath.indexOf(event.origin) === 0)
            ) {
                if (event.data.action == "iconClick") {
                    me.iconClick();
                } else if (event.data.action == "inlineButtonClick") {
                    me.inlineButtonClick(event.data.buttonIndex);
                } else if (event.data.action == "adjustFormHeight") {
                    me.adjustFormHeight(event.data.height, event.data.apiKey);
                } else if (event.data.action == "translate" && event.source) {
                    var translated = me.translate(event.data.key);
                    event.source.postMessage({
                        action: 'translated',
                        selector: event.data.selector,
                        text: translated
                    }, '*');
                } else if (event.data.action == "closeForm") {
                    me.hideForms();
                }
            } else {
                // The data hasn't been sent from your site!
                // Do not use it.
                return;
            }
        });
        document.addEventListener('click', function(event) {
            // prevent doubleclicks
            if ((new Date()).getTime() - me.iframeOpenTime < 300) return;

            me.hideForms();
        });
        document.addEventListener('touchstart', function(event) {
            // prevent doubleclicks
            if ((new Date()).getTime() - me.iframeOpenTime < 300) return;

            me.hideForms();
        });
        document.addEventListener('keyup', function(event) {
            // Esc key pressed
            if (event.keyCode == 27) {
                me.hideForms();
            }
        });
        
        if (this.apiKey) {
	        var xhr = new XMLHttpRequest();
		    xhr.withCredentials = true;
		    xhr.responseType = 'text';
			xhr.open("GET", "https://api.fast.co/api/button2/?key="+this.apiKey+"&proto="+window.location.protocol.substring(0, window.location.protocol.length-1));
			xhr.onload = function () {
				if (xhr.readyState === xhr.DONE) {
			        
			    }	
			};
			xhr.send();
		}
    },

    /**
     * Create inline button content
     * @param iframe
     * @param inlineBtnId
     * @param identifier
     * @param inlineApiKey
     */
    createInlineButton: function(iframe, inlineBtnId, identifier, inlineApiKey) {
        var apiKey = inlineApiKey || this.apiKey;

        iframe.src = this.buttonFramePath
            + "?key=" + apiKey
            + "&identifier=" + identifier
            + "&button_index=" + inlineBtnId
            + "&r=" + this.randomSeed;
    },

    /**
     * Shows Round Icon
     * @param display (left|right|none)
     */
    showIcon: function(display) {
        var me = this;
        var div = document.createElement("div");
        var iframe = document.createElement('iframe');
        div.id = "fast-login-container";
        div.style.cssText = "width:90px;height:90px;position:fixed;z-index:999999;";
        if (display == "right") {
            div.style.cssText += "bottom:0;right:0;";
        } else if (display == "left" || display == "") {
            div.style.cssText += "bottom:0;left:0;";
        } else if (display == "topleft") {
            div.style.cssText += "top:0;left:0;";
        } else if (display == "topright") {
            div.style.cssText += "top:0;right:0;";
        } else if (display == "none") {
            div.style.cssText += "bottom:0;display:none;";
        } else if (document.getElementById(display)) {
            // custom icon
            this.customIcon = true;
            this.iconDiv = document.getElementById(display);
            this.iconDiv.addEventListener('click', function(evt) {
                var e = evt || window.event;
                e.stopPropagation();
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                me.iconClick();
            });
            return;
        }
        document.body.appendChild(div);
        iframe.style.cssText = "display: initial!important;width: 100%!important;height: 100%!important;border: none!important;position: absolute!important;bottom: 0!important;right: 0!important;background: transparent!important;";
        iframe.src = this.iconFramePath + "?key=" + this.apiKey + "&v=15";
        div.appendChild(iframe);
        this.iconDiv = div;
    },

    /**
     * Process click on icon
     */
    iconClick: function() {
        var formLeft, pos;
        var iconPadding = this.iconPadding;
        var windowWidth = (document.documentElement && document.documentElement.clientWidth)
            ? document.documentElement.clientWidth : window.innerWidth;
        var windowHeight = window.innerHeight;
        var formWidth = Math.min(this.defaultFormWidth, windowWidth);
        if (windowWidth < 2 * formWidth) {
            formWidth = windowWidth - 2 * iconPadding;
        }
        var iconPos = this.iconDiv.getBoundingClientRect();
        if (this.customIcon) {
            if (iconPos.left < windowWidth / 2) {
                formLeft = iconPos.left;
            } else {
                formLeft = iconPos.right - formWidth;
            }
            if (formLeft < 0 || 2 * formLeft + formWidth > windowWidth) {
                formLeft = Math.floor((windowWidth - formWidth) / 2);
            }
            if (iconPos.top < windowHeight / 2) {
                pos = {left: formLeft, top: iconPos.bottom + iconPadding, width: formWidth};
            } else {
                pos = {left: formLeft, bottom: windowHeight - iconPos.top + iconPadding, width: formWidth};
            }
        } else {
            if (iconPos.left < windowWidth / 2) {
                formLeft = iconPos.left + iconPadding;
            } else {
                formLeft = iconPos.right - iconPadding - formWidth;
            }
            if (formLeft < 0 || formLeft + formWidth > windowWidth) {
                formLeft = Math.floor((windowWidth - formWidth) / 2);
            }
            if (iconPos.top < windowHeight / 2) {
                pos = {left: formLeft, top: iconPos.height, width: formWidth};
            } else {
                pos = {left: formLeft, bottom: iconPos.height, width: formWidth};
            }
        }
        if (this.showForm(pos, false)) {
            this.recoverInlineButtons();
        } else {
            if (!this.customIcon
                && this.iconDiv.getElementsByTagName("iframe")[0]
                && this.iconDiv.getElementsByTagName("iframe")[0].contentWindow
                && this.iconDiv.getElementsByTagName("iframe")[0].contentWindow.postMessage) {
                this.iconDiv.getElementsByTagName("iframe")[0].contentWindow.postMessage({action: 'removeFocus'}, '*');
            }
        }
    },

    /**
     * Process click on inline button
     * @param inlineButtonId
     */
    inlineButtonClick: function(inlineButtonId) {
        var btn = this.inlineButtons[inlineButtonId].div;
        var btnPos = btn.getBoundingClientRect();
        var iconPadding = this.iconPadding;
        var formLeft, formTop;
        var windowWidth = (document.documentElement && document.documentElement.clientWidth)
            ? document.documentElement.clientWidth : window.innerWidth;
        var formWidth = Math.min(Math.max(btnPos.width, this.defaultFormWidth), windowWidth);
        if (windowWidth < 2 * formWidth) {
            formWidth = windowWidth - 2 * iconPadding;
            formLeft = iconPadding;
        } else {
            formLeft = btnPos.left;
            if (formLeft + formWidth + iconPadding > windowWidth) {
                formLeft = windowWidth - formWidth - iconPadding;
            }
        }
        formTop = Math.max(btnPos.top - 150, iconPadding);
        if (this.showForm({left: formLeft, top: formTop, width: formWidth, inlineBtnId: inlineButtonId}, false)) {
            this.recoverInlineButtons();
            btn.style.visibility = "hidden";
        }
    },

    /**
     * Show Login Form
     * @param pos Position of form {left, top, width, inlineBtnId}
     * @param preload Preload form
     */
    showForm: function(pos, preload) {
        var div;
        var apiKey = this.apiKey;
        var inlineBtnId = null;
        if (typeof pos.inlineBtnId !== "undefined" && pos.inlineBtnId !== null) {
            inlineBtnId = pos.inlineBtnId;
            if (this.inlineButtons[inlineBtnId].inlineApiKey) {
                apiKey = this.inlineButtons[inlineBtnId].inlineApiKey;
            }
        }
        if (!apiKey) {
            apiKey = "";
        }
        div = this.iframeDiv[apiKey];
        if (div && this.formInlineBtnId === inlineBtnId && div.style.display !== "none") {
            div.style.display = "none";
            return false;
        }

        if (inlineBtnId !== null) {
            this.formInlineBtnId = inlineBtnId;
        } else {
            this.formInlineBtnId = null;
        }

        if (div) {
            div.style.width = pos.width + "px";
            div.style.left = pos.left + "px";
            if (pos.top) {
                div.style.top = pos.top + "px";
                div.style.bottom = "";
            } else {
                div.style.bottom = pos.bottom + "px";
                div.style.top = "";
            }
            if (!preload) {
                div.style.display = "block";
                this.adjustFormHeight(parseInt(div.style.height), apiKey);

                if (div.getElementsByTagName("iframe")[0].contentWindow
                    && div.getElementsByTagName("iframe")[0].contentWindow.postMessage) {
                    div.getElementsByTagName("iframe")[0].contentWindow.postMessage({action: 'setFocus'}, '*');
                }
            }
        } else {
            div = document.createElement("div");
            var iframe = document.createElement('iframe');
            div.className = "fast-login-form";
            div.style.cssText = "width:" + pos.width + "px;height:100px;position:fixed;display:block;left:" + pos.left + "px;overflow:hidden;border-radius:5px;box-shadow: 0 0 30px rgba(255,255,255,0.75);z-index:999999;";
            if (preload) {
                div.style.visibility = "hidden";
            }
            if (pos.top) {
                div.style.cssText += "top:" + pos.top + "px;";
            } else {
                div.style.cssText += "bottom:" + pos.bottom + "px;";
            }
            document.body.appendChild(div);
            iframe.style.cssText = "display: initial!important;width: 100%!important;height: 100%!important;border: none!important;position: absolute!important;bottom: 0!important;right: 0!important;background: transparent!important;";
            div.appendChild(iframe);
            iframe.src = this.formFramePath + "?key=" + apiKey + "&r=" + (new Date()).getTime();
            this.iframeDiv[apiKey] = div;
        }

        this.iframeOpenTime = (new Date()).getTime();
        return true;
    },

    /**
     * Adjust iFrame height after loading content
     * @param newHeight
     * @param apiKey
     */
    adjustFormHeight: function(newHeight, apiKey) {
        var iframeDiv = this.iframeDiv[apiKey];

        var oldHeight = parseInt(iframeDiv.style.height);
        iframeDiv.style.height = newHeight + "px";
        if (this.formInlineBtnId !== null) {
            var iconPadding = this.iconPadding;
            var windowHeight = window.innerHeight;
            var btn = this.inlineButtons[this.formInlineBtnId].div;
            var btnPos = btn.getBoundingClientRect();
            var formTop;
            formTop = Math.floor(Math.max(btnPos.top - newHeight / 2, iconPadding));
            if (formTop + newHeight > windowHeight) {
                formTop = windowHeight - newHeight - 2;
            }
            iframeDiv.style.top = formTop + "px";
        } else {
            iframeDiv.style.top = parseInt(iframeDiv.style.top) + oldHeight - newHeight + "px";
        }

        if (iframeDiv.style.visibility == "hidden") {
            iframeDiv.style.visibility = "";
            iframeDiv.style.display = "none";
        }
    },

    /**
     * Hide opened forms
     */
    hideForms: function() {
        var forms = document.getElementsByClassName("fast-login-form");
        if (forms) {
            for (var i = 0; i < forms.length; i++) {
                forms[i].style.display = "none";
            }
        }
        this.recoverInlineButtons();
    },

    /**
     * Recovers inline buttons from hidden state
     */
    recoverInlineButtons: function() {
        for (var i = 0; i < this.inlineButtons.length; i++) {
            if (this.inlineButtons[i].div) {
                this.inlineButtons[i].div.style.visibility = "";
            }
        }
    },

    /**
     * Localization
     * @param input
     * @returns {string}
     */
    translate: function(input) {
        var translated = input;

        switch(this.fastlang) {
            case "zh": //chinese
                switch(input) {
                    case "login_without_password":
                        translated = "无密码登录";
                        break;
                    case "logging_in":
                        translated = "在登录";
                        break;
                    case "login_with":
                        translated = "登录";
                        break;
                    case "email_address":
                        translated = "电子邮件地址";
                        break;
                }
                break;

            case "es": //spanish
                switch(input) {
                    case "login_without_password":
                        translated = "Iniciar sesión sin contraseña";
                        break;
                    case "logging_in":
                        translated = "Iniciar sesión";
                        break;
                    case "login_with":
                        translated = "Inicia con";
                        break;
                    case "email_address":
                        translated = "Dirección de correo electrónico";
                        break;
                }
                break;

            case "hi": //hindi
                switch(input) {
                    case "login_without_password":
                        translated = "पासवर्ड के बिना लॉगिन करें";
                        break;
                    case "logging_in":
                        translated = "प्रवेश किया";
                        break;
                    case "login_with":
                        translated = "से लोगिन करें";
                        break;
                    case "email_address":
                        translated = "ईमेल पता";
                        break;
                }
                break;

            case "ar": //arabic
                switch(input) {
                    case "login_without_password":
                        translated = "تسجيل الدخول بدون كلمة مرور";
                        break;
                    case "logging_in":
                        translated = "تسجيل الدخول";
                        break;
                    case "login_with":
                        translated = "تسجيل الدخول مع";
                        break;
                    case "email_address":
                        translated = "عنوان بريد الكتروني";
                        break;
                }
                break;

            case "pt": //portugese
                switch(input) {
                    case "login_without_password":
                        translated = "Login sem senha";
                        break;
                    case "logging_in":
                        translated = "Login";
                        break;
                    case "login_with":
                        translated = "Login com";
                        break;
                    case "email_address":
                        translated = "Endereço de e-mail";
                        break;
                }
                break;

            case "bn": ////bn - bengali
                switch(input) {
                    case "login_without_password":
                        translated = "পাসওয়ার্ড ছাড়া লগইন করুন";
                        break;
                    case "logging_in":
                        translated = "লগ ইন";
                        break;
                    case "login_with":
                        translated = "সঙ্গে লগইন করুন";
                        break;
                    case "email_address":
                        translated = "ইমেইল ঠিকানা";
                        break;
                }
                break;

            case "ru": //russian
                switch(input) {
                    case "login_without_password":
                        translated = "Войти без пароля";
                        break;
                    case "logging_in":
                        translated = "Вход в систему";
                        break;
                    case "login_with":
                        translated = "Войти";
                        break;
                    case "email_address":
                        translated = "Адрес электронной почты";
                        break;
                }
                break;

            case "fr": //french
                switch(input) {
                    case "login_without_password":
                        translated = "Connexion sans mot de passe";
                        break;
                    case "logging_in":
                        translated = "Se connecter";
                        break;
                    case "login_with":
                        translated = "Connectez-vous avec";
                        break;
                    case "email_address":
                        translated = "Adresse électronique";
                        break;
                }
                break;

            case "id": //indonesian
            case "in": //indonesian
                switch(input) {
                    case "login_without_password":
                        translated = "Login tanpa kata sandi";
                        break;
                    case "logging_in":
                        translated = "Masuk";
                        break;
                    case "login_with":
                        translated = "Masuk dengan";
                        break;
                    case "email_address":
                        translated = "Alamat email";
                        break;
                }
                break;

            case "ja": //japanese
            case "jp": //japanese
                switch(input) {
                    case "login_without_password":
                        translated = "パスワードなしでログイン";
                        break;
                    case "logging_in":
                        translated = "ログイン中";
                        break;
                    case "login_with":
                        translated = "でログイン";
                        break;
                    case "email_address":
                        translated = "電子メールアドレス";
                        break;
                }
                break;

            case "de": //german
                switch(input) {
                    case "login_without_password":
                        translated = "Login ohne Passwort";
                        break;
                    case "logging_in":
                        translated = "Einloggen";
                        break;
                    case "login_with":
                        translated = "Einloggen mit";
                        break;
                    case "email_address":
                        translated = "E-Mail-Addresse";
                        break;
                }
                break;

            case "jv": //javanese
                switch(input) {
                    case "login_without_password":
                        translated = "Mlebu tanpa tembung sandhi";
                        break;
                    case "logging_in":
                        translated = "Mlebu ing";
                        break;
                    case "login_with":
                        translated = "Mlebu karo";
                        break;
                    case "email_address":
                        translated = "Alamat email";
                        break;
                }
                break;

            case "ko": //korean
                switch(input) {
                    case "login_without_password":
                        translated = "비밀번호없이 로그인";
                        break;
                    case "logging_in":
                        translated = "로그인 중";
                        break;
                    case "login_with":
                        translated = "로 로그인";
                        break;
                    case "email_address":
                        translated = "이메일 주소";
                        break;
                }
                break;

            case "vi": //vietnamese
                switch(input) {
                    case "login_without_password":
                        translated = "Đăng nhập mà không cần mật khẩu";
                        break;
                    case "logging_in":
                        translated = "Đăng nhập";
                        break;
                    case "login_with":
                        translated = "Đăng nhập với";
                        break;
                    case "email_address":
                        translated = "Địa chỉ email";
                        break;
                }
                break;



            default:  //en - english
                switch(input) {
                    case "login_without_password":
                        translated = "Login without password";
                        break;
                    case "logging_in":
                        translated = "Logging in";
                        break;
                    case "login_with":
                        translated = "Login with";
                        break;
                    case "email_address":
                        translated = "Email address";
                        break;
                }
        }

        return translated;
    },

    /**
     * Returns reference to current script tag
     * @returns {HtmlElement}
     */
    currentScript: function() {
        if (document.currentScript) {
            return document.currentScript;
        } else {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        }
    },

    /**
     * Extracts parameters from URL
     * @param paramName Parameter to extract
     * @param str URL string
     * @returns {*}
     */
    getParams: function (paramName, str) {
        var re = new RegExp('&' + paramName + '=([^&]*)', 'i');
        return (str = str.replace(/\?/, '&').match(re)) ? str[1] : '';
    }

};

fastButton.init();