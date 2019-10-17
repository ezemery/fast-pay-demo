//'use strict';
(function(window) {
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
  var iframe;
  var div;
  var source;
  /**
   * server origin
   */
   // https://fast-pay-server.herokuapp.com
  var origin = "https://fast-pay-server.herokuapp.com";
  /**
   * path to Fast Pay Form source
   */
  var fastPayModalFrame = origin +  "/fast-pay-form";

  /**
   * path to Fast Pay Form source
   */
  var fastPayReturningModalFrame = origin  + "/fast-returning-form";

  /**
   * path to Fast Pay button source
   */
  var fastPayButtonFrame = origin + "/fast-pay-button";
  /**
   * path to Fast Pay Returning Checkout button source
   */
  var fastPayReturningButtonFrame =
  origin + "/fast-returning-button";

  var fastPayEmptyFrame = origin+ "/init";
  /**
   * fast pay styles
   */
  var inlineButton = window.document.getElementsByTagName("fast-pay");

  var message_handlers = {};

   /**
	 * message handler for allcontentloaded info from iframe
	 * @params message object
	 */
  message_handlers.allcontentloaded = function(data){
	source = data.source
	data.source.postMessage(
		{
			 action: "clickreport",
			 config: globalFastData
		},
		data.origin
  );
  }

  /**
	 * message handler for paybuttonClick
	 * @params message object
	 */
  message_handlers.paybuttonClick = function(data){
   toggleFastFormModalVisibility()   
	}

	/**
	 * message handler for editIconClick
	 * @params message object
	 */
  message_handlers.editIconClick = function(data){
    toggleFastFormModalVisibility()
	}
	/**
	 * message handler for closeModal
	 * @params message object
	 */
  message_handlers.closeModal = function(data){
      toggleFastFormModalVisibility()
	}
	/**
	 * message handler for loadCookie
	 * @params message object
	 */
	
	message_handlers.loadCookie = function(data){
		const cookie = data.data.cookie;
		removeElement('init-frame');
		for (var i = 0; i < inlineButton.length; i++) {
		  if (cookie) {
			 createReturningButton(i,  globalFastData);
			 createFastReturningUserFormModal(i,  globalFastData);
		  } else {
			 createFastPayButton(i,  globalFastData);
			createFastFormModal(i,  globalFastData);
		  }
		}
	}
  
	/**
	 * iframe styles
	 */
  var cssStyles = {
      modalDiv:
        "display:none;min-width:100% !important; min-height:100% important; width: 100%!important;height:100vh!important;position:fixed;top:0!important;right:0 !important; left:0 !important; bottom:0!important; z-index:99999999;overflow: hidden !important;",
      modalFrame:
        "display:table;min-width:100% !important; min-height:100% important; width: 100%!important;height:100%!important;margin:auto;border:none!important;position:absolute!important; right: 0!important;top:0!important; left:0 !important; bottom: 0 !important; background: rgba(0,0,0,0.5)",
      fastButtonDiv:
        "display:table;min-width:100% !important; min-height:100% important;width:100%!important;height:100vh!important;position:relative;z-index:16777271",
      iframeDiv:
        "display:table;min-width:100% !important; min-height:100% important;width:100%!important;height:100%!important;border:none!important;poasition:relative!important;background: transparent!important;"
	 };
	 
      /**
       * fast languages
       */
	 var fastLang = {
		 "en": "en"
	 };
	 
	  /**
		* Initialise the fast pay form when initated with data attributes or initialisation function
     * @params null
	  * @return null
     */
  
    function init() {
		var iterableCollection = [].slice.call(inlineButton);
		iterableCollection.forEach((element, i) => {
			 var config = extractAttributes(inlineButton[i],[
				  "key", "amount"
			 ]);
			 if(Object.keys(config).length !== 0 && config.constructor === Object){
				  globalFastData = config;
				  createInitButton(i, config);
			 }else{
				  window.getFastPaySetup = function(config){
						globalFastData = config;
					
						if ( globalFastData && ! globalFastData.onclose) {
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
							 createInitButton(i, config);
						}else{
							console.error("All parameters are required for fast pay button to initiate", ["key", "currency", "amount"])
						}
				  }
			 }
			 
		});
	 };

	 /**
	  * Extracts attribute from the button element
     * @params element button node
	  * @params attributes array of values to extract
	  * @return object of extracted values
     */
  
	 
	 function extractAttributes(element, attributes) {
		var obj = {};
		attributes.forEach(function(attrib) {
			 var aa = element.getAttribute("data-" + attrib);
			 if (aa) obj[attrib] = aa;
		});
		return obj;
  }

  /**
   * Extracts attribute from the button element
   * @params button element node
   * @params attributes  array of values to extract
   * @return object of extracted values
   */

  function extractAttributes(element, attributes) {
    var obj = {};
    attributes.forEach(function(attrib) {
      var aa = element.getAttribute("data-" + attrib);
      if (aa) obj[attrib] = aa;
    });
    return obj;
  }

  /**
   * Creates an instance of an iframe
   * @params num number from the iterator function
   * @params name  sets to the name an id of the iframe
   * @returns instance of  an iframe
   */

  function createFastFrame(num, name, type) {
    div = document.createElement("div");
    iframe = document.createElement("iframe");
    if (document.body) {
      // If iframe already exists on the page, remove it from the body
      if (document.getElementById(name)) {
        removeElement(name);
      }

      inlineButton[num].appendChild(div);
    }
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

    if (type === "init-frame") {
      div.id = "init-frame";
      div.classList.add("fast-pay-button-container");
      div.style.cssText = cssStyles.fastButtonDiv;
      iframe.style.cssText = cssStyles.iframeDiv;
    }

    div.appendChild(iframe);
    iframe.setAttribute("id", name);
    iframe.name = name;
    return iframe;
  }

  /**
   * loads the fast pay button iframe into the page
   * @params num number from the iterator function
   * @params data  iframe config values
   * @returns null
   */

  function createFastPayButton(num, data) {
    iframe = createFastFrame(num, "payButton", "button");
    loadIframe(iframe, data.key, fastPayButtonFrame);
    //var frame = window.frames.payButton;
    // source.postMessage({
    //     action:"config",
    //     values:globalFastData
    // }, "*");
    //Todo: same origin for post message
  }

  /**
   * loads the fast pay returning button iframe into the page
   * @params num number from the iterator function
   * @params data  iframe config values
   * @returns null
   */

  function createReturningButton(num, data) {
    iframe = createFastFrame(num, "returningCheckoutButton", "button");
    loadIframe(iframe, data.key, fastPayReturningButtonFrame);
  }

  /**
   * loads the fast pay modal iframe into the page
   * @params num number from the iterator function
   * @params data  iframe config values
   * @returns null
   */
  function createFastFormModal(num, data) {
    iframe = createFastFrame(num, "payFormModal", "modal");
    loadIframe(iframe, data.key, fastPayModalFrame);
  }

  /**
   * loads the fast pay returning modal iframe into the page
   * @params num number from the iterator function
   * @params data  iframe config values
   * @returns null
   */

  function createFastReturningUserFormModal(num, data) {
    //this will be replaced with returning form
    iframe = createFastFrame(num, "returningCheckoutModal", "modal");
    loadIframe(iframe, data.key, fastPayReturningModalFrame);
  }

  /**
	  * loads the fast pay button iframe into the page
     * @params num number from the iterator function
	  * @params data  iframe config values
	  * @returns null
     */
  
    function createFastPayButton(num, data) {
      iframe = createFastFrame(num, "payButton", 'button');
      loadIframe(iframe, data.key, fastPayButtonFrame);
	 };
	 
	 /**
	  * loads the fast pay returning button iframe into the page
     * @params num number from the iterator function
	  * @params data  iframe config values
	  * @returns null
     */

    function createReturningButton(num, data) {
      iframe = createFastFrame(num, "returningCheckoutButton", 'button');
      loadIframe(iframe, data.key, fastPayReturningButtonFrame);
    };
  

	 /**
	  * loads the fast pay modal iframe into the page
     * @params num number from the iterator function
	  * @params data  iframe config values
	  * @returns null
     */
    function createFastFormModal(num, data) {
      iframe = createFastFrame(num, "payFormModal", "modal");
      loadIframe(iframe, data.key, fastPayModalFrame);
    };
  

	 /**
	  * loads the fast pay returning modal iframe into the page
     * @params num number from the iterator function
	  * @params data  iframe config values
	  * @returns null
     */

    function createFastReturningUserFormModal(num, data) {
      //this will be replaced with returning form
      iframe = createFastFrame(num, "returningCheckoutModal", "modal");
      loadIframe(iframe, data.key, fastPayReturningModalFrame);
      
	 };
	 
	 /**
	  * initialise the button to determine if the cookie is set 
     * @params num number from the iterator function
	  * @params data  iframe config values
	  * @returns null
     */
	 function createInitButton( num, data) {
      var iframe = createFastFrame(num, "init-frame", "init-frame");
      loadIframe(iframe, data, fastPayEmptyFrame);
	 };
	 
	 /**
	  * remove iframe element from body
     * @params id number from the iterator function
	  * @returns null
     */
  
    function removeElement(id) {
      var element = document.getElementById(id);
      element.parentNode.removeChild(element);
	 };
	 

	 /**
	  * load function for the iframe
     * @params iframe: an instance on the iframe
	  * @params key: api key to authenticate the request
	  * @params url: url of the iframe
	  * @returns null
     */
    function loadIframe(iframe, key, url) {
      iframe.setAttribute("noresize", true);
      iframe.setAttribute("allowfullscreen", true);
      iframe.src = url + "?key=" + key;
    }
  

	  /**
	  * toggle function for the modal
     * @params null
	  * @returns null
     */
    function toggleFastFormModalVisibility() {
      var FastFormModal = document.querySelector(".fast-pay-modal-container");
      if (FastFormModal.style.display === "none") {
        FastFormModal.style.display = "table"; // Request for client Height on hidden form
      } else {
        FastFormModal.style.display = "none";
      }
	 }
	 
	  /**
	  * add event listeners for all messages for the iframe and map to the event listener functions
    * @params message: event object 
	  * @returns null
     */
  
    window.addEventListener(
        "message",
        function(message) {
            if (
                message &&
                message.data &&
                message.data.action &&
                message_handlers[message.data.action]
            ) {
                message_handlers[message.data.action](message);
            }
        },
        false
	 );
	 
	  /**
	  * load spinner for the iframe
     * @params null
	  * @returns null
     */
  
  function loadSpinner() {
    console.log("iframe loaded completely");
  }

  init();
})(window);

  console.log(`
      ########   #     #####  ####### ######     #    #     #
       #         # #   #     #    #    #     #   # #    #   #  
       #        #   #  #          #    #     #  #   #    # #   
       #####   #     #  #####     #    ######  #     #    #    
       #       #######       #    #    #       #######    #    
       #       #     # #     #    #    #       #     #    #    
       #       #     #  #####     #    #       #     #    # 
    `)
