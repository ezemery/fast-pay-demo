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
  cssStyles: {
    modalDiv:
      "display:none; width: 100%!important;height:100vh!important;position:fixed;top:0!important;right:0 !important; z-index:99999999;top:0",
    modalFrame:
      "display:block!important;width: 100%!important;height:100%!important;margin:auto;border:none!important;position:absolute!important;right: 0!important;top:0!important;background: rgba(0,0,0,0.5)",
    fastButtonDiv:
      "display:block!important;width:100%!important;height:100vh !important;position:relative;z-index:16777271",
    iframeDiv:
      "display:block!important;width:100%!important;height:100%!important;border:none!important;poasition:relative!important;background: transparent!important;"
  },
  fastLang: "en",
  inlineButton: document.getElementsByTagName("fast-pay"),
  init: function init() {
    var _this = this;
    for (var i = 0; i < _this.inlineButton.length; i++) {
      var amount = this.inlineButton[i].getAttribute("data-amount");
      _this.createInitButton(i, amount);
    }
  },

  createFastPayButton: function(id, amount) {
    var _this = this;
    iframe = _this.createFastFrame(id, "fast-pay-button-iframe", "button");
    _this.loadIframe(iframe, id, amount, _this.fastPayModalFrame);
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
    iframe.name = name;
    return iframe;
  },

  createReturningButton: function(id, amount) {
    var _this = this;

    iframe = _this.createFastFrame(
      id,
      "fast-pay-returning-checkout-button-iframe",
      "button"
    );
    _this.loadIframe(iframe, id, amount, _this.fastPayReturningButtonFrame);
  },

  createInitButton: function(id, amount) {
    var _this = this;

    iframe = _this.createFastFrame(id, "fast-pay-init-iframe", "init-frame");

    _this.loadIframe(iframe, id, amount, _this.fastPayEmptyFrame);
    window.addEventListener("message", function(event) {
      if (event.origin !== _this.origin) {
        return;
      } else {
        if (event.data.action === "load-cookie") {
          const cookie = event.data.cookie;
          _this.removeElement();
          for (var i = 0; i < _this.inlineButton.length; i++) {
            var amount = _this.inlineButton[i].getAttribute("data-amount");
            if (cookie) {
              _this.createReturningButton(i, amount);
              _this.createFastReturningUserFormModal(i, amount);
            } else {
              _this.createFastPayButton(i, amount);
              _this.createFastFormModal(i, amount);
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

  createFastFormModal: function(id, amount) {
    var _this = this;
    iframe = _this.createFastFrame(id, "fast-pay-form-modal-iframe", "modal");

    _this.loadIframe(iframe, id, amount, _this.fastPayModalFrame);
    iframe.onload = _this.loadedIframe()
  },

  createFastReturningUserFormModal: function(id, amount) {
    var _this = this;
    //this will be replaced with returning form
    iframe = _this.createFastFrame(id, "fast-pay-form-modal-iframe", "modal");
    _this.loadIframe(iframe, id, amount, _this.fastPayReturningModalFrame);
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

  loadIframe: function(iframe, id, amount, url) {
    iframe.setAttribute("noresize", true);
    iframe.setAttribute("allowfullscreen", true);
    iframe.src = url + "?id=" + id + "&amount=" + amount;
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
  }
};

fastpay.init();
