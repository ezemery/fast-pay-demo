function AjaxRequest() {
  
  if (window.XMLHttpRequest) {
    this.request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    this.request = new ActiveXObject("Microsoft.XMLHTTP");
  }

}

AjaxRequest.prototype.send = function(type, url, postDataType, postData, apiKey, handler) {
  if(this.request !== null) {
    this.request.abort();

    try {
      //custom handler for server response to the request
      this.request.onreadystatechange = handler;
      this.request.open(type, url, true);

      if(type.toLowerCase() === 'get') {
        this.request.send(null);
      } else {
        this.request.setRequestHeader("Content-type", postDataType);
        this.request.setRequestHeader("Fast-Access-Key", apiKey);
        this.request.send(postData)
      }
    } catch (error) {
      console.error('Ajax error communicating witht he server\n', error);
    }
  }
}

AjaxRequest.prototype.setRequestHeader= function(key, value) {
  if(key && value) {
    this.request.setRequestHeader(key, value);
  }
}

AjaxRequest.prototype.getReadyState = function () {
  this.request.readyState;
}

AjaxRequest.prototype.getStatus = function () {
  this.request.status;
}

AjaxRequest.prototype.onLoad = function (handler) {
  if(typeof handler === 'function') {
    this.request.onload = handler;
  }
}

AjaxRequest.prototype.getResponseText = function() {
  console.log('called')
  return this.request.responseText;
}