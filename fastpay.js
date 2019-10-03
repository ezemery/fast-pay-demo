(function(window){
   /**
   * get the window object
   */ 
    var w = window;
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
  var fastPayReturningModalFrame= "https://fast-pay-server.herokuapp.com/fast-pay-form";

   /**
   * path to Fast Pay button source
   */
  var fastPayButtonFrame =  "https://fast-pay-server.herokuapp.com/fast-button";
    /**
   * path to Fast Pay Returning Checkout button source
   */
  var fastPayReturningButtonFrame = "https://fast-pay-server.herokuapp.com/fast-returning-button";
  /**
   * fast language
   */
  var fastLang =  "en";
    /**
   * fast iframe styles
   */
  var cssStyles = {
    modalDiv:
      "display:none; width: 100%!important;height:100vh !important;position:fixed; top:0 !important; right:0 !important; z-index:99999999; top: 0",
    modalFrame:
      "display: block !important; width: 100%!important;height: 100%!important;margin: auto;border: none!important;position: absolute!important;right: 0!important; top:0!important;background: rgba(0,0,0,0.5)",
    fastButtonDiv:
      "display: block!important;width:100%!important;height:100%;position:relative;z-index: 16777271",
    iframeDiv:
      "display: block!important;width: 100%!important;height:100%!important;border: none!important;poasition: relative !important; background: transparent!important;"
  };

  function init() {
    var _this = this;
    var inlineButton = w.document.getElementsByTagName("fast-pay");
    _this.w.getFastPaySetup = _this
    //this is the good place to use cookie for determining new and existing user
    for (var i = 0; i < _this.inlineButton.length; i++) {
      var amount = this.inlineButton[i].getAttribute("data-amount");
      _this.createFastPayButton(i, amount);
      _this.createFastFormModal(i, amount);
    //   _this.createReturningButton(i, amount);
    //   _this.createFastReturningUserFormModal(i, amount);
    }
  };

  function functioncreateFastFrame(id, name,type) {
    var _this = this;
    var div = document.createElement("div"),
      iframe = document.createElement("iframe");
    _this.inlineButton[id].appendChild(div);
    
    if (type === "button") {
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
    iframe.name = name;
    return iframe;
  };

  function createReturningButton(id, amount) {
    var _this = this;

    iframe = _this.createFastFrame(id, "fast-pay-returning-checkout-button-iframe", 'button');
    _this.loadIframe(iframe, id, amount, _this.fastPayReturningButtonFrame);
  };

  function createFastFormModal(id, amount) {
    var _this = this;
    iframe = _this.createFastFrame(id, "fast-pay-form-modal-iframe", "modal");

    _this.loadIframe(iframe, id, amount, _this.fastPayModalFrame);
    iframe.onload = _this.IframeLoaded();

  };

  function createFastPayButton (id, amount) {
    var _this = this;
    iframe = _this.createFastFrame(id, "fast-pay-button-iframe", 'button');
    _this.loadIframe(iframe, id, amount, _this.fastPayButtonFrame);
  };

  function createFastReturningUserFormModal(id, amount) {
    var _this = this;
    //this will be replaced with returning form
    iframe = _this.createFastFrame(id, "fast-pay-form-modal-iframe", "modal");
    _this.loadIframe(iframe, id, amount, _this.fastPayReturningModalFrame);
    iframe.onload = _this.IframeLoaded();
  };

  function loadIframe(iframe, id, amount, url) {
    iframe.setAttribute("noresize", true);
    iframe.setAttribute("allowfullscreen", true);

    iframe.src = url + "?id=" + id + "&amount=" + amount;
  };

  function toggleFastFormModalVisibility() {
    var FastFormModal = document.querySelector(".fast-pay-modal-container");
    if (FastFormModal.style.display === "none") {
      FastFormModal.style.display = "block"; // Request for client Height on hidden form
    } else {
      FastFormModal.style.display = "none";
    }
  };

  function IframeLoaded(){
    console.log("Iframe loaded");
    var _this = this;
    window.addEventListener("message", function(event) {

        if (event.origin !== _this.origin) {
            return;
        } else {
            if (event.data.action === "editIconClick" || "paybuttonClick" || "closeModal") {
            _this.toggleFastFormModalVisibility();
            }
        }
        });
    };

function loadSpinnerloadSpinner() {
    console.log("iframe loaded completely");
}

init()

}(window))
