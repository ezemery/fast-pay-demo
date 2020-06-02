import "bootstrap-scss";
import "../css/new-user-button.scss";

(function(window){
    //Todo: same origin for post message
   var  origin  = "*";
   var message_handlers = {};
   var buttonElement = window.document.getElementById("fast-pay-button");
   var getCurrency = function(currency) {
           switch (currency.toLowerCase()) {
               case "usd":
               return "$";
               default:
               // default to dollar
               return "$";
           }
   }

   message_handlers.clickreport = function(message){
       var currency = getCurrency(message.data.config.currency)
       buttonElement.innerText = "Fast Checkout - " + currency + message.data.config.amount;

       if(message.data.config.color){
           buttonElement.style.backgroundColor = message.data.config.color;
       }
   
   };
 
  
   function init(){
       buttonElement.addEventListener("click", function(e){
           showForm();
       })
    };

   function showForm(){
       window.parent.postMessage({action: 'paybuttonClick'}, origin);
    }

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
    window.addEventListener("DOMContentLoaded", function(){
       window.parent.postMessage({action: 'allcontentloaded'}, origin);
    })
  
   init();
}(window))