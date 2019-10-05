var fastpay = {
    /**
     * server origin
     */
     origin : "https://fast-pay-server.herokuapp.com",
    /**
     * path to Fast Pay Form source
     */
  
    fastPayModalFrame: "https://fast-pay-server.herokuapp.com/fast-pay-form",
    /**
     * path to Fast Pay Form source
     */
  
    fastPayReturningModalFrame: "https://fast-pay-server.herokuapp.com/fast-pay-form",
    /**
    /**
     * path to Fast Pay button source
     */
     fastPayButtonFrame :  "https://fast-pay-server.herokuapp.com/fast-button",
      /**
     * path to Fast Pay Returning Checkout button source
     */
    fastPayReturningButtonFrame:
      "https://fast-pay-server.herokuapp.com/fast-returning-button",
    /**
     * path to Fast Pay empty source
     */
    fastPayEmptyFrame: "https://fast-pay-server.herokuapp.com/init",
    /**
     * fast pay styles
     */

    globalFastData: null,
    cssStyles: {
        modalDiv:
          "display:none;margin:auto;width:100%!important; min-width: 100%; min-height:100%; height:100vh!important;position:fixed;top:0!important; z-index:99999999;top:0",
        modalFrame:
          "width: 100px!important;min-width: 100%; min-height:100%;height:100%!important;margin:auto;border:none!important;background: rgba(0,0,0,0.5)",
        fastButtonDiv:
          "display:table!important;width:100%!important;min-width: 100%; height:100vh!important;position:relative;z-index:16777271",
        iframeDiv:
          "width:100%!important;min-width: 100%;height:100%!important;border:none!important;position:relative!important;background: transparent!important;"
      },
    fastLang: "en",
    inlineButton: document.getElementsByTagName("fast-pay"),

    init: function init() {
        var _this = this;
        //make _this.inlineButton iterable then loop through it
        var iterableCollection = [].slice.call(_this.inlineButton);
        iterableCollection.forEach((element, i) => {
            var config = _this.extractAttributes(_this.inlineButton[i],[
                "key", "amount"
            ]);
            if(Object.keys(config).length !== 0 && config.constructor === Object){
                _this.globalFastData = config;
                _this.createInitButton(i, config);
            }else{
                window.getFastPaySetup = function(config){
                    _this.globalFastData = config;
                 
                    if ( _this.globalFastData && ! _this.globalFastData.onclose) {
                        /**
                         * close the modal when everthing is successfull, come back to this later
                         */
                        
                    }
                    for (var c in config) {
                        if (c === "meta") {
                        /**
                         * if user passes the meta object, this should be an array of extra info about the product
                         */
                        }
                    }

                    if(config.hasOwnProperty("amount") && config.hasOwnProperty("currency") && config.hasOwnProperty("key") ){
                        _this.createInitButton(i, config);
                    }
                }
            }
            
        });
    },

    extractAttributes: function (element, attributes) {
        var obj = {};
        attributes.forEach(function(attrib) {
            var aa = element.getAttribute("data-" + attrib);
            if (aa) obj[attrib] = aa;
        });
        return obj;
    },
    
    createFastPayButton: function(id, config) {
      var _this = this;
      var iframe = _this.createFastFrame(id, "fast-pay-button-iframe", "button");
      _this.loadIframe(iframe, config, _this.fastPayButtonFrame);
      //var button = document.getElementById("fast-pay-button-iframe").contentWindow;
     
    },
  
    createFastFrame: function(id, name, type) {
      var _this = this;
      var div = document.createElement("div"),
        iframe = document.createElement("iframe");
      _this.inlineButton[id].appendChild(div);
  
      if (type === "button") {
        div.classList.add("fast-pay-button-container");
        div.style.cssText = _this.cssStyles.fastButtonDiv;
        iframe.style.cssText = _this.cssStyles.iframeDiv;
      }
  
      if (type === "init-frame") {
        div.id = "init-frame";
        div.classList.add("fast-pay-button-container");
        div.style.cssText = _this.cssStyles.fastButtonDiv;
        iframe.style.cssText = _this.cssStyles.iframeDiv;
      }
  
      if (type === "modal") {
        div.classList.add("fast-pay-modal-container");
        div.style.cssText = _this.cssStyles.modalDiv;
        iframe.style.cssText = _this.cssStyles.modalFrame;
        iframe.onload = _this.loadSpinner;
      }
  
      div.appendChild(iframe);
      iframe.id = name;
      iframe.name = name;
      return iframe;
    },
  
    createReturningButton: function(id, config) {
      var _this = this;
  
      var iframe = _this.createFastFrame(
        id,
        "fast-pay-returning-checkout-button-iframe",
        "button"
      );
      _this.loadIframe(iframe, config, _this.fastPayReturningButtonFrame);
    },
  
    createInitButton: function(id, config) {
      var _this = this;
  
      var iframe = _this.createFastFrame(id, "fast-pay-init-iframe", "init-frame");
  
      _this.loadIframe(iframe, config, _this.fastPayEmptyFrame);

      window.addEventListener("message", function(event) {
          //TODO Check origin source and iframe origin
        if (event.origin !== _this.origin) {
          return;
        } else {
          if (event.data.action === "load-cookie") {
            const cookie = event.data.cookie;
            _this.removeElement();
            for (var i = 0; i < _this.inlineButton.length; i++) {
              if (cookie) {
                _this.createReturningButton(i,  _this.globalFastData);
                _this.createFastReturningUserFormModal(i,  _this.globalFastData);
              } else {
                _this.createFastPayButton(i,  _this.globalFastData);
                _this.createFastFormModal(i,  _this.globalFastData);
              }
            }
          }
        }
      });
    },
  
    removeElement: function() {
      // Removes an element from the document
      var element = document.getElementById('init-frame');
      element.parentNode.removeChild(element);
    },
  
    createFastFormModal: function(id, config) {
      var _this = this;
      var iframe = _this.createFastFrame(id, "fast-pay-form-modal-iframe", "modal");
  
      _this.loadIframe(iframe,config, _this.fastPayModalFrame);
      iframe.onload = _this.loadedIframe()
    },
  
    createFastReturningUserFormModal: function(id, config) {
      var _this = this;
      //this will be replaced with returning form
      var iframe = _this.createFastFrame(id, "fast-pay-form-modal-iframe", "modal");
      _this.loadIframe(iframe, config , _this.fastPayReturningModalFrame);
      window.addEventListener("message", function(event) {
        if (event.origin !== _this.origin) {
          return;
        } else {
          if (event.data.action === "editIconClick") {
            _this.toggleFastFormModalVisibility();
          }
        }
      });
    },
  
    loadIframe: function(iframe,config, url) {
      iframe.setAttribute("noresize", true);
      iframe.setAttribute("allowfullscreen", true);
      iframe.src = url + "?key=" + config.key + "&amount=" + config.amount;
    },
  
    toggleFastFormModalVisibility: function() {
      var FastFormModal = document.querySelector(".fast-pay-modal-container");
      if (FastFormModal.style.display === "none") {
        FastFormModal.style.display = "block"; // Request for client Height on hidden form
      } else {
        FastFormModal.style.display = "none";
      }
    },
  
    loadedIframe: function(){
      var _this = this;
      window.addEventListener("message", function(event) {
          console.log(event);
          if (event.origin !== _this.origin) {
            return;
          } else {
            if (event.data.action === "editIconClick" || "paybuttonClick" || "closeModal" ) {
              _this.toggleFastFormModalVisibility();
            }
          }
        });
    },
    loadSpinner: function loadSpinner() {
      console.log("iframe loaded completely");
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
  
  fastpay.init();