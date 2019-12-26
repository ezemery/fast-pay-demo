import "bootstrap-scss";
import "../css/returning-user-form.scss";
import visa from  "../img/visa.svg";
import mastercard from "../img/mastercard.svg";
import jcb from "../img/jcb.svg"
import amex from "../img/amex.svg";
import discover from "../img/discover.svg";
import diners from "../img/diners.svg";
import cc from  "../img/cc.svg"

 //Object entries polyfill
 if (!Object.entries) {
    Object.entries = function( obj ){
        var ownProps = Object.keys( obj ),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
        
        return resArray;
    };
}
 var masking = {
    // User defined Values
    //maskedInputs : document.getElementsByClassName('masked'), // add with IE 8's death
    maskedInputs : document.querySelectorAll('.masked'), // kill with IE 8's death
    maskedNumber : '0MMYY1234',
    maskedLetter : '_',
    origin: 'http://localhost:4000',
    apiKey: '',
    stripePublishKey: 'pk_test_n2mnpTPiBf87M8LmyhaK7e6Z00CsarrgUC',
    countryName: { 'AF' : 'Afghanistan', 'AX' : 'Aland Islands', 'AL' : 'Albania','DZ' : 'Algeria', 'AS' : 'American Samoa', 'AD' : 'Andorra', 'AO' : 'Angola', 'AI' : 'Anguilla', 'AQ' : 'Antarctica', 'AG' : 'Antigua And Barbuda', 'AR' : 'Argentina', 'AM' : 'Armenia', 'AW' : 'Aruba', 'AU' : 'Australia', 'AT' : 'Austria', 'AZ' : 'Azerbaijan', 'BS' : 'Bahamas', 'BH' : 'Bahrain', 'BD' : 'Bangladesh', 'BB' : 'Barbados', 'BY' : 'Belarus', 'BE' : 'Belgium', 'BZ' : 'Belize', 'BJ' : 'Benin', 'BM' : 'Bermuda', 'BT' : 'Bhutan', 'BO' : 'Bolivia', 'BA' : 'Bosnia And Herzegovina', 'BW' : 'Botswana', 'BV' : 'Bouvet Island', 'BR' : 'Brazil', 'IO' : 'British Indian Ocean Territory', 'BN' : 'Brunei Darussalam', 'BG' : 'Bulgaria', 'BF' : 'Burkina Faso', 'BI' : 'Burundi', 'KH' : 'Cambodia', 'CM' : 'Cameroon', 'CA' : 'Canada', 'CV' : 'Cape Verde', 'KY' : 'Cayman Islands', 'CF' : 'Central African Republic', 'TD' : 'Chad', 'CL' : 'Chile', 'CN' : 'China', 'CX' : 'Christmas Island', 'CC' : 'Cocos (Keeling) Islands', 'CO' : 'Colombia', 'KM' : 'Comoros', 'CG' : 'Congo', 'CD' : 'Congo, Democratic Republic', 'CK' : 'Cook Islands', 'CR' : 'Costa Rica', 'CI' : 'Cote D\'Ivoire', 'HR' : 'Croatia', 'CU' : 'Cuba', 'CY' : 'Cyprus', 'CZ' : 'Czech Republic', 'DK' : 'Denmark', 'DJ' : 'Djibouti', 'DM' : 'Dominica', 'DO' : 'Dominican Republic', 'EC' : 'Ecuador', 'EG' : 'Egypt', 'SV' : 'El Salvador', 'GQ' : 'Equatorial Guinea', 'ER' : 'Eritrea', 'EE' : 'Estonia', 'ET' : 'Ethiopia', 'FK' : 'Falkland Islands (Malvinas)', 'FO' : 'Faroe Islands', 'FJ' : 'Fiji', 'FI' : 'Finland', 'FR' : 'France', 'GF' : 'French Guiana', 'PF' : 'French Polynesia', 'TF' : 'French Southern Territories', 'GA' : 'Gabon', 'GM' : 'Gambia', 'GE' : 'Georgia', 'DE' : 'Germany', 'GH' : 'Ghana', 'GI' : 'Gibraltar', 'GR' : 'Greece', 'GL' : 'Greenland', 'GD' : 'Grenada', 'GP' : 'Guadeloupe', 'GU' : 'Guam', 'GT' : 'Guatemala', 'GG' : 'Guernsey', 'GN' : 'Guinea', 'GW' : 'Guinea-Bissau', 'GY' : 'Guyana', 'HT' : 'Haiti', 'HM' : 'Heard Island & Mcdonald Islands', 'VA' : 'Holy See (Vatican City State)', 'HN' : 'Honduras', 'HK' : 'Hong Kong', 'HU' : 'Hungary', 'IS' : 'Iceland', 'IN' : 'India', 'ID' : 'Indonesia', 'IR' : 'Iran, Islamic Republic Of', 'IQ' : 'Iraq', 'IE' : 'Ireland', 'IM' : 'Isle Of Man', 'IL' : 'Israel', 'IT' : 'Italy', 'JM' : 'Jamaica', 'JP' : 'Japan', 'JE' : 'Jersey', 'JO' : 'Jordan', 'KZ' : 'Kazakhstan', 'KE' : 'Kenya', 'KI' : 'Kiribati', 'KR' : 'Korea', 'KW' : 'Kuwait', 'KG' : 'Kyrgyzstan', 'LA' : 'Lao People\'s Democratic Republic', 'LV' : 'Latvia', 'LB' : 'Lebanon', 'LS' : 'Lesotho', 'LR' : 'Liberia', 'LY' : 'Libyan Arab Jamahiriya', 'LI' : 'Liechtenstein', 'LT' : 'Lithuania', 'LU' : 'Luxembourg', 'MO' : 'Macao', 'MK' : 'Macedonia', 'MG' : 'Madagascar', 'MW' : 'Malawi', 'MY' : 'Malaysia', 'MV' : 'Maldives', 'ML' : 'Mali', 'MT' : 'Malta', 'MH' : 'Marshall Islands', 'MQ' : 'Martinique', 'MR' : 'Mauritania', 'MU' : 'Mauritius', 'YT' : 'Mayotte', 'MX' : 'Mexico', 'FM' : 'Micronesia, Federated States Of', 'MD' : 'Moldova', 'MC' : 'Monaco', 'MN' : 'Mongolia', 'ME' : 'Montenegro', 'MS' : 'Montserrat', 'MA' : 'Morocco', 'MZ' : 'Mozambique', 'MM' : 'Myanmar', 'NA' : 'Namibia', 'NR' : 'Nauru', 'NP' : 'Nepal', 'NL' : 'Netherlands', 'AN' : 'Netherlands Antilles', 'NC' : 'New Caledonia', 'NZ' : 'New Zealand', 'NI' : 'Nicaragua', 'NE' : 'Niger', 'NG' : 'Nigeria', 'NU' : 'Niue', 'NF' : 'Norfolk Island', 'MP' : 'Northern Mariana Islands', 'NO' : 'Norway', 'OM' : 'Oman', 'PK' : 'Pakistan', 'PW' : 'Palau', 'PS' : 'Palestinian Territory, Occupied', 'PA' : 'Panama', 'PG' : 'Papua New Guinea', 'PY' : 'Paraguay', 'PE' : 'Peru', 'PH' : 'Philippines', 'PN' : 'Pitcairn', 'PL' : 'Poland', 'PT' : 'Portugal', 'PR' : 'Puerto Rico', 'QA' : 'Qatar', 'RE' : 'Reunion', 'RO' : 'Romania', 'RU' : 'Russian Federation', 'RW' : 'Rwanda', 'BL' : 'Saint Barthelemy', 'SH' : 'Saint Helena', 'KN' : 'Saint Kitts And Nevis', 'LC' : 'Saint Lucia', 'MF' : 'Saint Martin', 'PM' : 'Saint Pierre And Miquelon', 'VC' : 'Saint Vincent And Grenadines', 'WS' : 'Samoa', 'SM' : 'San Marino', 'ST' : 'Sao Tome And Principe', 'SA' : 'Saudi Arabia', 'SN' : 'Senegal', 'RS' : 'Serbia', 'SC' : 'Seychelles', 'SL' : 'Sierra Leone', 'SG' : 'Singapore', 'SK' : 'Slovakia', 'SI' : 'Slovenia', 'SB' : 'Solomon Islands', 'SO' : 'Somalia', 'ZA' : 'South Africa', 'GS' : 'South Georgia And Sandwich Isl.', 'ES' : 'Spain', 'LK' : 'Sri Lanka', 'SD' : 'Sudan', 'SR' : 'Suriname', 'SJ' : 'Svalbard And Jan Mayen', 'SZ' : 'Swaziland', 'SE' : 'Sweden', 'CH' : 'Switzerland', 'SY' : 'Syrian Arab Republic', 'TW' : 'Taiwan', 'TJ' : 'Tajikistan', 'TZ' : 'Tanzania', 'TH' : 'Thailand', 'TL' : 'Timor-Leste', 'TG' : 'Togo', 'TK' : 'Tokelau', 'TO' : 'Tonga', 'TT' : 'Trinidad And Tobago', 'TN' : 'Tunisia', 'TR' : 'Turkey', 'TM' : 'Turkmenistan', 'TC' : 'Turks And Caicos Islands', 'TV' : 'Tuvalu', 'UG' : 'Uganda', 'UA' : 'Ukraine', 'AE' : 'United Arab Emirates', 'GB' : 'United Kingdom', 'US' : 'United States', 'UM' : 'United States Outlying Islands', 'UY' : 'Uruguay', 'UZ' : 'Uzbekistan', 'VU' : 'Vanuatu', 'VE' : 'Venezuela', 'VN' : 'Viet Nam', 'VG' : 'Virgin Islands, British', 'VI' : 'Virgin Islands, U.S.', 'WF' : 'Wallis And Futuna', 'EH' : 'Western Sahara', 'YE' : 'Yemen', 'ZM' : 'Zambia', 'ZW' : 'Zimbabwe'},
    countries : {"BD": "+880", "BE": "+32", "BF": "+226", "BG": "+359", "BA": "+387", "BB": "+1-246", "WF": "+681", "BL": "+590", "BM": "+1-441", "BN": "+673", "BO": "+591", "BH": "+973", "BI": "+257", "BJ": "+229", "BT": "+975", "JM": "+1-876", "BV": "", "BW": "267", "WS": "+685", "BQ": "+599", "BR": "+55", "BS": "+1-242", "JE": "+44-1534", "BY": "+375", "BZ": "+501", "RU": "+7", "RW": "+250", "RS": "+381", "TL": "+670", "RE": "+262", "TM": "+993", "TJ": "+992", "RO": "+40", "TK": "+690", "GW": "+245", "GU": "+1-671", "GT": "+502", "GS": "", "GR": "+30", "GQ": "+240", "GP": "+590", "JP": "+81", "GY": "+592", "GG": "+44-1481", "GF": "+594", "GE": "+995", "GD": "+1-473", "GB": "+44", "GA": "+241", "SV": "+503", "GN": "+224", "GM": "+220", "GL": "+299", "GI": "+350", "GH": "+233", "OM": "+968", "TN": "+216", "JO": "+962", "HR": "+385", "HT": "+509", "HU": "+36", "HK": "+852", "HN": "+504", "HM": " ", "VE": "+58", "PR": "+1-787","PR": "+1-939", "PS": "+970", "PW": "+680", "PT": "+351", "SJ": "+47", "PY": "+595", "IQ": "+964", "PA": "+507", "PF": "+689", "PG": "+675", "PE": "+51", "PK": "+92", "PH": "+63", "PN": "+870", "PL": "+48", "PM": "+508", "ZM": "+260", "EH": "+212", "EE": "+372", "EG": "+20", "ZA": "+27", "EC": "+593", "IT": "+39", "VN": "+84", "SB": "+677", "ET": "+251", "SO": "+252", "ZW": "+263", "SA": "+966", "ES": "+34", "ER": "+291", "ME": "+382", "MD": "+373", "MG": "+261", "MF": "+590", "MA": "+212", "MC": "+377", "UZ": "+998", "MM": "+95", "ML": "+223", "MO": "+853", "MN": "+976", "MH": "+692", "MK": "+389", "MU": "+230", "MT": "+356", "MW": "+265", "MV": "+960", "MQ": "+596", "MP": "+1-670", "MS": "+1-664", "MR": "+222", "IM": "+44-1624", "UG": "+256", "TZ": "+255", "MY": "+60", "MX": "+52", "IL": "+972", "FR": "+33", "IO": "+246", "SH": "+290", "FI": "+358", "FJ": "+679", "FK": "+500", "FM": "+691", "FO": "+298", "NI": "+505", "NL": "+31", "NO": "+47", "NA": "+264", "VU": "+678", "NC": "+687", "NE": "+227", "NF": "+672", "NG": "+234", "NZ": "+64", "NP": "+977", "NR": "+674", "NU": "+683", "CK": "+682", "XK": "", "CI": "+225", "CH": "+41", "CO": "+57", "CN": "+86", "CM": "+237", "CL": "+56", "CC": "+61", "CA": "+1", "CG": "+242", "CF": "+236", "CD": "+243", "CZ": "+420", "CY": "+357", "CX": "+61", "CR": "+506", "CW": "+599", "CV": "+238", "CU": "+53", "SZ": "+268", "SY": "+963", "SX": "+599", "KG": "+996", "KE": "+254", "SS": "+211", "SR": "+597", "KI": "+686", "KH": "+855", "KN": "+1-869", "KM": "+269", "ST": "+239", "SK": "+421", "KR": "+82", "SI": "+386", "KP": "+850", "KW": "+965", "SN": "+221", "SM": "+378", "SL": "+232", "SC": "+248", "KZ": "+7", "KY": "+1-345", "SG": "+65", "SE": "+46", "SD": "+249", "DO": "+1-809","DO": "+1-829", "DM": "+1-767", "DJ": "+253", "DK": "+45", "VG": "+1-284", "DE": "+49", "YE": "+967", "DZ": "+213", "US": "+1", "UY": "+598", "YT": "+262", "UM": "+1", "LB": "+961", "LC": "+1-758", "LA": "+856", "TV": "+688", "TW": "+886", "TT": "+1-868", "TR": "+90", "LK": "+94", "LI": "+423", "LV": "+371", "TO": "+676", "LT": "+370", "LU": "+352", "LR": "+231", "LS": "+266", "TH": "+66", "TF": "", "TG": "+228", "TD": "+235", "TC": "+1-649", "LY": "+218", "VA": "+379", "VC": "+1-784", "AE": "+971", "AD": "+376", "AG": "+1-268", "AF": "+93", "AI": "+1-264", "VI": "+1-340", "IS": "+354", "IR": "+98", "AM": "+374", "AL": "+355", "AO": "+244", "AQ": "", "AS": "+1-684", "AR": "+54", "AU": "+61", "AT": "+43", "AW": "+297", "IN": "+91", "AX": "+358-18", "AZ": "+994", "IE": "+353", "ID": "+62", "UA": "+380", "QA": "+974", "MZ": "+258"},
    domains: ["fast.co","yahoo.com", "gmail.com", "google.com", "hotmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.com", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "att.net", "gmz.com", "mail.com"],
    init: function () {
        var _this = this;
        console.log(cc);
        _this.setUpMasks(_this.maskedInputs);
        _this.maskedInputs = document.querySelectorAll('.masked');
        _this.activateMasking(_this.maskedInputs);
        _this.submitForm();
        _this.addShippingAddress();
        _this.addCardDetials();
        _this.autoTab(document.querySelectorAll(".email-code-input"),null);
        _this.autoTabExpiry(document.querySelectorAll(".autotab"), null);
        _this.formFocus();
        _this.mobileToggle();
        _this.autocomplete(document.getElementById("country"), _this.countryName, "country");
    },

    setUpMasks: function (inputs) {
    var i, l = inputs.length,_this = this;
        for(i = 0; i < l; i++) {
            _this.createShell(inputs[i]);
        }
    },
    // replaces each masked input with a shall containing the input and it's mask.
    createShell : function (input) {
        var text = '', 
        placeholder = input.getAttribute('placeholder');
        input.setAttribute('maxlength', placeholder.length);
    },

    // add event listeners
    activateMasking : function (inputs) {
    var i, l,_this = this;

    for (i = 0, l = inputs.length; i < l; i++) {
        if (_this.maskedInputs[i].addEventListener) { // remove "if" after death of IE 8
        _this.maskedInputs[i].addEventListener('keyup', function(e) {
            _this.handleValueChange(e);
        }, false); 
        } else if (_this.maskedInputs[i].attachEvent) { // For IE 8
            _this.maskedInputs[i].attachEvent("onkeyup", function(e) {
            e.target = e.srcElement; 
            _this.handleValueChange(e);
        });
        }
    }
    },

    handleValueChange : function (e) {
    var id = e.target.getAttribute('id'), _this = this;
   
        
    switch (e.keyCode) { 
        // allows navigating thru input
        case 20: // caplocks
        case 17: // control
        case 18: // option
        case 16: // shift
        case 37: // arrow keys
        case 38:
        case 39:
        case 40:
        case  9: // tab (let blur handle tab)
        return;
        }

    document.getElementById(id).value = _this.handleCurrentValue(e);

    },

    handleCurrentValue : function (e) {
    var isCharsetPresent = e.target.getAttribute('data-charset'), 
        placeholder = isCharsetPresent || e.target.getAttribute('placeholder'),
        value = e.target.value, l = placeholder.length, newValue = '', 
        i, j, isInt, isLetter, strippedValue, card, icon = document.getElementById('ccnumber'), _this=this;

    // strip special characters
    strippedValue = isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");

    for (i = 0, j = 0; i < l; i++) {
        var x = 
        isInt = !isNaN(parseInt(strippedValue[j]));
        isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
        matchesNumber = _this.maskedNumber.indexOf(placeholder[i]) >= 0;
        matchesLetter = _this.maskedLetter.indexOf(placeholder[i]) >= 0;

        if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
                newValue += strippedValue[j++];
                card = _this.ValidateCreditCardNumber();
                switch(card){
                        case "Visa":
                            icon.style.backgroundImage = "url("+ visa +")";
                            break;
                        case "Mastercard":
                            icon.style.backgroundImage = "url("+ mastercard +")";
                            break;
                        case "JCB":
                            icon.style.backgroundImage = "url("+ jcb +")";
                            break;
                        case "AMEX":
                            icon.style.backgroundImage = "url("+ amex +")";
                            break;
                        case "Discover":
                            icon.style.backgroundImage = "url("+ discover +")";
                            break;
                        case "Diners":
                            icon.style.backgroundImage = "url("+ diners +")";
                            break;
                        default:
                         icon.style.backgroundImage = "url("+ cc +")";

                    }                       

            } else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
                // masking.errorOnKeyEntry(); // write your own error handling function
                return newValue; 

        } else {
            newValue += placeholder[i];
        } 
        // break if no characters left and the pattern is non-special character
        if (strippedValue[j] == undefined) { 
            break;
        }
        }
        
    if (e.target.getAttribute('data-valid-example')) {
        return _this.validateProgress(e, newValue);
    }
    return newValue;
    },

    ValidateCreditCardNumber : function() {
        var number = document.getElementById("ccnumber").value;
       // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // Diners
        re = new RegExp("^(30[6-9]|36|38)");
        if (number.match(re) != null)
            return "Diners";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        // Visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null)
            return "Mastercard";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        return "";
        },

    validateProgress : function (e, value) {
    var validExample = e.target.getAttribute('data-valid-example'),
        pattern = new RegExp(e.target.getAttribute('pattern')),
        placeholder = e.target.getAttribute('placeholder'),
             l = value.length, testValue = '';
             
            //convert to months
            if (l == 1 && placeholder.toUpperCase().substr(0,2) == 'MM') {
                
                if(value > 1 && value < 10) {
                value = '0' + value;
                }
                return value;
            }

    return value;
    },
    mobileToggle: function(){
        var nua = window.navigator.userAgent;
        var elmnt = document.getElementById("payment-form")
        var is_android = (nua.indexOf('Android') > -1);
        if(is_android){
        var form = document.querySelectorAll(".masked");
        form.forEach(function(element, i){
            form[i].addEventListener("focusin", function(){
                var y = elmnt.scrollHeight;
                window.scrollBy(0, y); 
            })
        })
        form.forEach(function(element, i){
            form[i].addEventListener("input", function(){
                var y = elmnt.scrollHeight;
                window.scrollBy(0, y);
            })
        })
        }

        var card = document.querySelectorAll(".card");
        card.forEach(function(element, i){
            element.addEventListener("click", function(e){
                    if(e.target.className === "card-header"){
                        var cardbody  = element.children[1];
                        cardbody.classList.toggle("show");
                    }
                })
            })
    },
    autoTabExpiry: function(getAutoTab,callback){
          var _this = this;
          var email_input = getAutoTab
          for (let i = 0; i < email_input.length; i++) {
               email_input[i].children[0].addEventListener("keyup", function () {
                  if (email_input[i].children[0].value.length === email_input[i].children[0].maxLength && email_input[i].nextElementSibling) {
                    email_input[i].nextElementSibling.children[0].focus();
                  }
              });
           }
           if(typeof callback === 'function') {

               setInterval(function() { callback(); }, 10000);
           }
          
      },
    formFocus: function(){
        var form = document.querySelectorAll(".form-control");
        form.forEach(function(element, i){
            form[i].addEventListener("input", function(){
                        form[i].parentElement.classList.add("placeholder-focus");
            })
        })
        
    },
    sendSTripeData: function(stripeData, cb) {
        console.log(stripeData);
        var _this = this, xhr,cardToken, url = 'https://api.stripe.com/v1/tokens';
        
        xhr = _this.getXHR();
        xhr.withCredentials = true;


        xhr.open("POST", url,false);

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Authorization", "Bearer " + _this.stripePublishKey);

        xhr.onload = function () {
           if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) {
                        cardToken = JSON.parse(xhr.responseText)
                        var card = JSON.parse(JSON.stringify(cardToken.card));
                        // this will be fixed when development server can accept any card
                        // card['token_id'] = cardToken.id;
                        card['token_id'] = 'tok_mastercard';
                        cb(card) 
                    }
                 }
             };


        xhr.send(stripeData)

    },

    sendFastData: function(data) {
        var _this = this, xhr,url = _this.origin + '/return-form-test', button = document.getElementById("send-button");

        xhr = _this.getXHR();

        xhr.open("POST", url,true);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Fast-Access-Key', _this.apiKey);

        xhr.onload = function () {
           if (xhr.readyState === xhr.DONE) {
               if (xhr.status === 200) {
                             response = xhr.responseText;
                             button.innerText = "Done";
                             button.style.backgroundColor = "green"; 
                    return response;
               }else{
                            button.innerText = "There was an error, try again";
                            button.style.backgroundColor = "red"; 
                      }
            }
        };

        xhr.send(JSON.stringify(data))
    },

    getData: function (card, shipping) {
        var email = document.getElementById('email_input').value,
        firstName = document.getElementById('first_name').value,
        lastName = document.getElementById('last_name').value,
        phoneNumber = document.getElementById('mobile_no').value,
        phone = document.getElementById('phone_code').value;

        _this = this;

        var payload =   {
                        "buttonLoadId": "",
                 "store": {
                     "key": _this.apiKey,
                      "url": "https://teststore.com/checkout"
                  },
                  personal: {
                       email,
                      firstName,
                       lastName,
                                "phone": {
                                    "country": phone.substr(1, phone.length),
                                    "phone": phoneNumber
                                }
                  },
                  card,
                  shipping,
                  
                  "order": {
                      "total": 99,
                      "discount": 30,
                      "subtotal": 69,
                      "currency": "USD"
                   },
                   "items": [
                        {
                            "category": "shipping",
                            "code": "delivery",
                            "description": "Next Day Delivery",
                            "carrier": "USPS",
                            "rrp": 29,
                            "amount": _this.amount
                        }
                    ]
             };	
             return payload
    },

    sendFormData: function () {
        var _this = this, cc = _this.getCheckedValue('card-value'), sh = _this.getCheckedValue('shippingAddress'),
        card, shipping;

        if(sh === "newshipping"){
            var address_line1 = document.getElementById('address_line1').value,
            address_line = document.getElementById('address_line').value,
            city = document.getElementById('city').value,
            zip = document.getElementById('zip').value,
            state = document.getElementById('state').value,
            country = document.getElementById('country').value;

            shipping = {
                "address_line": address_line,
                "address_line1": address_line1,
                "city": city,
                "country": country,
                "state": state,
                "zip": zip
            }

        }else{
            shipping = {
                    id:sh
            }
        }

        if( cc === "new-card"){
            var cvv = document.getElementById("cvv").value,
            month_expiry = document.getElementById("month_expiry").value,
            year_expiry = document.getElementById("year_expiry").value,
            number = document.getElementById("ccnumber").value, 
            currentCard = _this.sanitizeCard(number), 
            stripeData = "card[number]=" + number + "&" + "card[cvc]=" + cvv + "&" + "card[exp_month]=" + month_expiry + "&" + "card[exp_year]=" + year_expiry;
           
            _this.sendSTripeData(stripeData, function(token){
            var fastData = _this.getData(token, shipping);
            console.log(fastData);
            console.log(JSON.stringify(fastData));
            //return  _this.sendFastData(fastData);

           });

        }else{
            card = {
                    id:cc
                }
            var fastData = _this.getData(card, shipping);
            console.log(fastData);
            console.log(JSON.stringify(fastData));
            //return  _this.sendFastData(fastData);
        }

    },
    
    addShippingAddress: function(){
        var _this = this;
        var open_shipping_button = document.getElementById('add-shipping-address'),
        address_line1 = document.getElementById("address_line1"),
        address_line = document.getElementById("address_line"),
        country = document.getElementById("country"),
        zip = document.getElementById("zip"),
        state = document.getElementById("state"),
        city = document.getElementById("city");

        open_shipping_button.addEventListener("click", function(){
            document.getElementById("shippingDetails").setAttribute("checked", true);
            address_line1.setAttribute("required", true);
            address_line.setAttribute("required", true)
            country.setAttribute("required", true)
            zip.setAttribute("required", true)
            state.setAttribute("required", true)
            city.setAttribute("required",true)              
            var shippingRadios = document.forms["payment-form"].elements["shippingAddress"];
            for(var i = 0, max = shippingRadios.length; i < max; i++) {
                shippingRadios[i].onclick = function() {
                    if(this.value === "newshipping"){
                        address_line1.setAttribute("required", true);
                        address_line.setAttribute("required", true)
                        country.setAttribute("required", true)
                        zip.setAttribute("required", true)
                        state.setAttribute("required", true)
                        city.setAttribute("required",true)
                    }else{
                        address_line1.removeAttribute("required");
                        address_line.removeAttribute("required")
                        country.removeAttribute("required")
                        zip.removeAttribute("required")
                        state.removeAttribute("required")
                        city.removeAttribute("required")
                    }
                }
            }
            open_shipping_button.classList.toggle("rotate_3d")
            _this.initiateForm(document.getElementById("shipping-form"))
        });
    },

    addCardDetials:function(){
        var _this = this;
        var open_card_button = document.getElementById('add-card-details'),
        ccnumber = document.getElementById("ccnumber"),
        month_expiry = document.getElementById("month_expiry"),
        year_expiry = document.getElementById("year_expiry"),
        cvv = document.getElementById("cvv");

         open_card_button.addEventListener("click", function(){
            document.getElementById("express-card-details").setAttribute("checked", true);
            ccnumber.setAttribute("required", true);
            month_expiry.setAttribute("required", true)
            year_expiry.setAttribute("required", true)
            cvv.setAttribute("required", true)

            var cardRadios = document.forms["payment-form"].elements["card-value"];
            for(var i = 0, max = cardRadios.length; i < max; i++) {
                cardRadios[i].onclick = function() {
                    if(this.value === "new-card"){
                        ccnumber.setAttribute("required", true);
                        month_expiry.setAttribute("required", true);
                        year_expiry.setAttribute("required", true);
                        cvv.setAttribute("required", true);
                    }else{
                        ccnumber.removeAttribute("required");
                        month_expiry.removeAttribute("required")
                        month_expiry.removeAttribute("required")
                        year_expiry.removeAttribute("required")
                    }
                }
            }
            open_card_button.classList.toggle("rotate_3d")
            _this.initiateForm(document.getElementById("card-form-button"))
        });
    },
    autoTab: function(getAutoTab,callback){
        var _this = this;
        var email_input = getAutoTab
        for (let i = 0; i < email_input.length; i++) {
             email_input[i].addEventListener("keyup", function () {
                if (email_input[i].value.length == email_input[i].maxLength) {
                  email_input[i].nextElementSibling.focus();
                }else{
                    email_input[i].previousElementSibling.focus();
                }
            });
         }
         if(typeof callback === 'function') {

             setInterval(function() { callback(); }, 10000);
         }
        
    },
  
    initiateForm: function (id){
        id.classList.toggle("open-form");
    },
    closeForm: function(id){
        id.classList.remove('open-form');
    },
    
    submitForm: function (){
        
        var form = document.getElementById("payment-form"), _this= this;
        if(form.addEventListener){
            //Modern browsers
            //add event listeners for form submit
            form.addEventListener("submit", function(e){
                e.preventDefault();
                _this.sendFormData();                                           
            });  
        }else if(form.attachEvent){
            //Old IE
            form.attachEvent('onsubmit', function(){
                _this.sendFormData()  
            });            
        }
    },
    addMultipleListeners: function(element,events,handler,useCapture,args){
        if (!(events instanceof Array)){
            throw 'addMultipleListeners: '+
                'please supply an array of eventstrings '+
                '(like ["click","mouseover"])';
        }
        //create a wrapper to be able to use additional arguments
        var handlerFn = function(e){
            handler.apply(this, args && args instanceof Array ? args : []);
        }
        for (var i=0;i<events.length;i+=1){
            element.addEventListener(events[i],handlerFn,useCapture);
        }
    },
    autocomplete: function(inp, values, type) {
        /**
         * User type definition
         * @typedef {Funtion} // [countries]
         * @property {inp, values, type} [countries]
        */
        
        // The text field element and an array of possible autocompleted values
        var currentFocus, _this = this

        // General call functions
        function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        _this.addMultipleListeners(inp, ['focusin','input'], function(e){
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { 
                // alert('Hey There')
            }
            // currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
                    /*for each item in the array...*/
                var unsorted = Object.entries(values);
                var entries = unsorted.sort((a, b) => {
                    return a[0] - b[0];
                });
            switch(type){
                case 'phone':
                    {
                        var novalue = false
                        for (var [country_code, country_phone] of entries) {
                            if (country_phone.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                                b = document.createElement("DIV");
                                b.innerHTML = "<img src='https://www.countryflags.io/"+country_code+"/flat/16.png'>  ";
                                b.innerHTML += "<strong>" + country_phone.substr(0, val.length) + "</strong>";
                                b.innerHTML += country_phone.substr(val.length);
                                b.innerHTML += " " + country_code + " - " + _this.countryName[country_code];
                                b.innerHTML += "<input type='hidden' value='" + country_phone + "'>";
                                    b.addEventListener("click", function(e) {
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    var country =  this.getElementsByTagName("img")[0].src;
                                    inp.style.backgroundImage = "url("+country+")";
                                    closeAllLists();
                                });
                                a.appendChild(b);
                            }
                        }
                        
                        if(novalue){
                            b = document.createElement("DIV");
                            b.innerHTML = "<span>No Results Match " + val;
                            a.appendChild(b);
                        }
                    }
                case 'country': 
                    {
                        for (var [country_code, country_phone] of entries) {
                            if(_this.countryName[country_code].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                                b = document.createElement("DIV");
                                b.innerHTML = "<img src='https://www.countryflags.io/"+country_code+"/flat/16.png'>  ";
                                b.innerHTML += "<strong>" + country_code.substr(0, val.length) + "</strong>";
                                b.innerHTML += country_code.substr(val.length) + " - "
                                b.innerHTML += "<strong>" + _this.countryName[country_code].substr(0, val.length) + "</strong>";
                                b.innerHTML +=  _this.countryName[country_code].substr(val.length);
                                b.innerHTML += "<input type='hidden' value='" + country_code + "'>";
                                b.addEventListener("click", function(e) {
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    var country =  this.getElementsByTagName("img")[0].src;
                                    inp.style.backgroundImage = "url("+country+")";
                                    closeAllLists();
                                });
                                a.appendChild(b);
                            }
                        }
                    }
            }
        
        },false);
        
        //     /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
                if(e.target.nodeName === "DIV" || e.target.nodeName === "BODY" || e.target.nodeName === "HTML"){
                    closeAllLists();
                }
            });
    
    },
    getCheckedValue: function(name) {
        return document.querySelector('input[name=' + name+ ']:checked').value;
    },
    getXHR: function() {
        var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }  
      return xhr; 
    },
    sanitizeCard: function(card) {
      return card.replace(/X/gi, "").trim();
    }
}

    var message_handlers = {};
    var buttonElement = document.getElementById('send-button')
    var footer_message = window.document.querySelector('.secure-text .color-fast');
    var fast_logo = window.document.querySelector('.bullet');
    var icon_svg = window.document.querySelectorAll('.color__effect > svg > path');
    var addButton = window.document.querySelectorAll('.btn-add');
    var fast_pay_form = document.querySelector('.fast-pay');
    var close_form = window.document.querySelector('.fast-close__form');
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
        var currency = getCurrency(message.data.config.currency)
            buttonElement.innerText = "Pay " + currency + message.data.config.amount + " Now";
    //     masking.user = window.parsed(window.matchCookie(
    //    // window.getCookie("fast-pay")
    //     ));

        if(message.data.config.color){
            let newColor = message.data.config.color;
            buttonElement.style.backgroundColor = newColor;
            footer_message.style.color = newColor;
            fast_logo.style.backgroundColor = newColor;
            addButton.forEach(btn => {
                btn.style.background = newColor
            });
            for(i = 0; i < icon_svg.length; i++){
                // if()
                
                icon_svg[i].style.fill = newColor;
                if(icon_svg[i].parentElement.parentElement.classList.contains('svg-image')){
                    // footer_svg[0].children[0].style.fill = newColor;
                    // footer_svg[i].childNodes.style.fill = newColor;
                }
               
            }
            
            close_form.style.color = newColor;
            fast_pay_form.style.border = "1px solid " + newColor
            document.styleSheets[0].insertRule("#payment-form .custom-control-input:checked~.custom-control-label::before { background-color: " + newColor + "; border-color: " + newColor + ";}", 0);
            document.styleSheets[0].cssRules[0].style.backgroundColor= newColor

            //noticed pretty reacted a bit bad on IE
            
        }

        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                var form = window.document.querySelector(".fast-pay");
                form.classList.add("safari-toolbars-overlap");
        }

        masking.apiKey = message.data.config.key;
        masking.init();

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
window.addEventListener("click", function(e){
        if(e.target.nodeName === "BODY" || e.target.nodeName === "HTML" || e.target.id === "fast-close_form"){
            parent.postMessage({action: 'closeModal'}, "*");
        }
    })

 window.document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        parent.postMessage({action: 'closeModal'}, "*");
    }
};
window.addEventListener("DOMContentLoaded", function(){
    window.parent.postMessage({action: 'allcontentloaded'}, '*');

})