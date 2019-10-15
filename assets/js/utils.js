function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getCurrency(currency) {
  switch (currency.toLowerCase()) {
    case "usd":
      return "$";
    default:
      // default to dollar
      return "$";
  }
}

function matchCookie(cookie) {
  if (cookie) {
    return cookie.match(/^s:j:(.*)\..*$/)[1];
  }
}

function parsed(text, option = null) {
  return JSON.parse(text, option);
}
