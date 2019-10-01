var fastpay = {
    /**
     * path to Fast Pay Form source
     */
    origin: "https://fast-pay-server.herokuapp.com/",

    fastPayModalFrame: this.origin + "fast-pay-form",
    /**
     * path to Fast Pay button source
     */
    fastPayButtonFrame: this.origin + "fast-button",
    /**
     * fast pay styles
     */

    cssStyles : {
        modalDiv:"display:none; width: 100%!important;height:100vh !important;position:fixed; top:0 !important; right:0 !important; z-index:99999999; top: 0",
        modalFrame:"display: block !important; width: 100%!important;height: 100%!important;margin: auto;border: none!important;position: absolute!important;right: 0!important; top:0!important;background: rgba(0,0,0,0.5)",
        fastButtonDiv: "display: block!important;width:300px!important;height:auto;position:relative;z-index: 16777271",
        iframeDiv: "display: block!important;width: 100%!important;height:100%!important;border: none!important;poasition: relative !important; background: transparent!important;",
    },

    fastLang: "en",
    inlineButton : document.getElementsByTagName("fast-pay"),
    init: function init(){
        var  _this = this;
        var div;
        var iframe;
       
        for(var i = 0; i < _this.inlineButton.length; i++ ){
            var amount = this.inlineButton[i].getAttribute("data-amount");
            _this.createFastPayButton(i, amount);
            _this.createFastFormModal(i, amount);
            
        }
    },

    createFastPayButton: function createFastPayForm(id, amount) {
        var  _this = this;
        var div = document.createElement("div"), iframe = document.createElement('iframe');
        _this.inlineButton[id].appendChild(div);
        div.classList.add("fast-pay-button-container");
        div.style.cssText = _this.cssStyles.fastButtonDiv;
        iframe.style.cssText = _this.cssStyles.iframeDiv;
        div.appendChild(iframe);
        iframe.name =  "fast-pay-button-iframe";
        _this.loadIframe(iframe, id, amount, "button");
    },

    createFastFormModal: function loadFormModal(id, amount){
        var  _this = this
        var div = document.createElement("div"), iframe = document.createElement('iframe');
        _this.inlineButton[id].appendChild(div);
        div.classList.add("fast-pay-modal-container")
        div.style.cssText = _this.cssStyles.modalDiv;
        iframe.style.cssText = _this.cssStyles.modalFrame;
        div.appendChild(iframe);
        iframe.name =  "fast-pay-form-modal-iframe";
        iframe.onload = _this.loadSpinner
        _this.loadIframe(iframe, id, amount, "modal");
        window.addEventListener('message', function (event) {
            if(event.origin !== _this.origin ){
                return;
            }else{
                if(event.data.action === "paybuttonClick"){
                    _this.toggleFastFormModalVisibility();
                }
            } 
        })
     },

     loadIframe: function loadIframe(iframe, id, amount, type){
         var url = ""
         if(type === "button"){
            url = url = this.fastPayButtonFrame;
         }else{
            url = this.fastPayModalFrame;
         }
        iframe.setAttribute("noresize", true);
        iframe.setAttribute("allowfullscreen", true)
       
        iframe.src = url + "?id=" + id + "&amount=" + amount;
     },

     toggleFastFormModalVisibility: function toggleFastFormModalVisibility() {
        var FastFormModal = document.querySelector('.fast-pay-modal-container');
        if (FastFormModal.style.display === 'none') {
            FastFormModal.style.display = "block"; // Request for client Height on hidden form
        } else {
            FastFormModal.style.display = 'none';
        }
      },
     loadSpinner:function loadSpinner(){
        console.log('iframe loaded completely');
     }
     ,
     
}

fastpay.init();