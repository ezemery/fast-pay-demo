import "bootstrap-scss";
import "../css/returning-user-button.scss";

var payReturningUsersButton = {
    apiKey:"",
    buttonElement: document.getElementById("fast-pay"),
    editImageElement: document.getElementById("edit-details"),
    origin: "http://localhost:4000",
    init: function init() {
      this.editImageElement.addEventListener("click", function(e) {
        payReturningUsersButton.showReturningUserForm();
      });

      // this.buttonElement.addEventListener("click", function(e) {
      //   //read from fast pay data from cookie
      //   // send to fast api
      //   var cookie = payReturningUsersButton.cookie;
      //   payReturningUsersButton.sendFastData(cookie);
      // });
    },
    showReturningUserForm: function showForm() {
      var _this = this;
      parent.postMessage({ action: "editIconClick" }, "*");
    },

    // transformData: function(data) {
    //   var identifiers = window.reduceIdentifier(JSON.parse(data));
    //   return {
    //     personal: {
    //       email: identifiers.email.identifier,
    //       firstName: data.first_name,
    //       lastName: data.last_name,
    //       phone: {
    //         country: identifiers.phone.country,
    //         phone: identifiers.phone.identifier
    //       }
    //     },
    //     shipping: data.addresses,
    //     cards: data.cards
    //   }
    // },

    // sendFastData: function(data) {
    //   var _this = this,
    //   xhr,
    //   url = "https://dev.api.fast.co/api/m/pay",
    //   button = _this.buttonElement;

    //   if (window.XMLHttpRequest) {
    //     xhr = new XMLHttpRequest();
    //   } else if (window.ActiveXObject) {
    //     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //   }

    //   xhr.open("POST", url, true);

    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Fast-Access-Key", _this.apiKey);

    //   xhr.onload = function() {
    //     if (xhr.readyState === xhr.DONE) {
    //       if (xhr.status === 200) {
    //         response = xhr.responseText;
    //         button.innerText = "Done";
    //         button.style.backgroundColor = "green";
    //         return response;
    //       } else {
    //         button.innerText = "There was an error, try again";
    //         button.style.backgroundColor = "red";
    //       }
    //     }
    //   };
    //   xhr.send(_this.transformData(JSON.stringify(data)));
    // }

  };

  var message_handlers = {};
  var getCurrency = function(currency) {
        switch (currency.toLowerCase()) {
            case "usd":
            return "$";
            default:
            // default to dollar
            return "$";
        }
    }

  message_handlers.clickreport = function(message) {
    payReturningUsersButton.apiKey = message.data.config.key;
    var currency = getCurrency(message.data.config.currency)

    payReturningUsersButton.buttonElement.textContent =
      "FAST CHECKOUT - " + currency + message.data.config.amount;

    if(message.data.config.color){
        payReturningUsersButton.buttonElement.style.backgroundColor = message.data.config.color;
    }
  };

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

  window.addEventListener("DOMContentLoaded", function() {
    window.parent.postMessage(
      { action: "allcontentloaded" },
      "*"
    );
  });
  payReturningUsersButton.init();