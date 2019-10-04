//'use strict';
(function(window){
    /**
        ########   #     #####  ####### ######     #    #     #
        #         # #   #     #    #    #     #   # #    #   #  
        #        #   #  #          #    #     #  #   #    # #   
        #####   #     #  #####     #    ######  #     #    #    
        #       #######       #    #    #       #######    #    
        #       #     # #     #    #    #       #     #    #    
        #       #     #  #####     #    #       #     #    # 
   */
  var globalFastData;
  var _this = this;
  var iframe;
  /**
   * server origin
   */
  var origin = "https://fast-pay-server.herokuapp.com"; 
   /**
   * path to Fast Pay Form source
   */
  var fastPayModalFrame = "https://fast-pay-server.herokuapp.com/fast-pay-form";

  /**
   * path to Fast Pay Form source
   */
  var fastPayReturningModalFrame =  "https://fast-pay-server.herokuapp.com/quick-fill";

   /**
   * path to Fast Pay button source
   */
  var fastPayButtonFrame =  "https://fast-pay-server.herokuapp.com/fast-button";
  /**
 * path to Fast Pay Returning Checkout button source
 */
  var fastPayReturningButtonFrame = "https://fast-pay-server.herokuapp.com/fast-returning-button";
/**
 * fast pay styles
 */
var inlineButton = window.document.getElementsByTagName("fast-pay");

var message_handlers = {};

var cssStyles = {
    modalDiv:
      "display:none;margin:auto;width:100%!important; min-width: 100%; min-height:100%; height:100vh!important;position:fixed;top:0!important; z-index:99999999;top:0",
    modalFrame:
      "width: 100px!important;min-width: 100%; min-height:100%;height:100%!important;margin:auto;border:none!important;background: rgba(0,0,0,0.5)",
    fastButtonDiv:
      "display:table!important;width:100%!important;min-width: 100%; height:100vh!important;position:relative;z-index:16777271",
    iframeDiv:
      "width:100%!important;min-width: 100%;height:100%!important;border:none!important;position:relative!important;background: transparent!important;"
  };
    /**
     * fast languages
     */
  var fastLang= "en";

  function init(data) {
    //this is the good place to use cookie for determining new and existing user
    for (var i = 0; i < inlineButton.length; i++) {
      createFastPayButton(i,data);
      createFastFormModal(i,data)
    }
  };

  function createFastFrame(num,name,type) {
    var div = document.createElement("div"),
      iframe = document.createElement("iframe");
      inlineButton[num].appendChild(div);
    if (type === "button") {
      div.classList.add("fast-pay-button-container");
      div.style.cssText = cssStyles.fastButtonDiv;
      iframe.style.cssText = cssStyles.iframeDiv;
    }

    if (type === "modal") {
      div.classList.add("fast-pay-modal-container");
      div.style.cssText = cssStyles.modalDiv;
      iframe.style.cssText = cssStyles.modalFrame;
    }
    div.appendChild(iframe);
    iframe.setAttribute("id", name)
    iframe.name = name;
    return iframe;
  };


  function createFastPayButton(num, data) {
    iframe = createFastFrame(num, "fast-pay-button-iframe", 'button');
    loadIframe(iframe, data.key, fastPayButtonFrame);
    var frame = window.document.getElementById("fast-pay-button-iframe");
    console.log(window);
    window.postMessage({
        action:"config",
        values:globalFastData
    }, "*");
    //Todo: same origin for post message

  };
  function createReturningButton(num, data) {
    iframe = createFastFrame(num, "fast-pay-returning-checkout-button-iframe", 'button');
    loadIframe(iframe, data.key, fastPayReturningButtonFrame);
  };

  function createFastFormModal(num, data) {
    iframe = createFastFrame(num, "fast-pay-form-modal-iframe", "modal");
    loadIframe(iframe, data.key, fastPayModalFrame);
  };

  function createFastReturningUserFormModal(num, data) {
    //this will be replaced with returning form
    iframe = createFastFrame(num, "fast-pay-returning-checkout-modal-iframe", "modal");
    loadIframe(iframe, data.key, fastPayReturningModalFrame);
    
  };

  function loadIframe(iframe, key, url) {
    iframe.setAttribute("noresize", "yes");
    iframe.setAttribute("margin", "auto");
    iframe.setAttribute("allowfullscreen", "allowfullscreen");
    iframe.src = url + "?key=" + key;
    iframe.onload = loadedIframe(iframe);
  }

  function toggleFastFormModalVisibility(action) {
      var fastFormDisplay = window.document.querySelector(".fast-pay-modal-container");
    if (action === "editIconClick" || action === "paybuttonClick") {
        fastFormDisplay.style.display = "table";
      // Request for client Height on hidden form
    } else {
        fastFormDisplay.style.display = "none";
    }
  }

  function loadedIframe(iframe){
    window.addEventListener("message", function(event) {
        var action = event.data.action;
        if (event.origin !== origin) {
          return;
        } else {
          if (action === "editIconClick" || action === "paybuttonClick" || action === "closeModal" ) {
            toggleFastFormModalVisibility(action);
          }
        }
      });
  }

function loadSpinner() {
    console.log("iframe loaded completely");
}

window.getFastPaySetup = function(config){
    globalFastData = config;
 
    if (globalFastData && !globalFastData.onclose) {
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
    if(config.hasOwnProperty("amount") && config.hasOwnProperty("currency") & config.hasOwnProperty("key") ){
        init(config);
    }
} 

}(window));
