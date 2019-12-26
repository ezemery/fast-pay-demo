const express = require("express");
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const secret = "test";
const validity_days = 365;
const expires = validity_days * 1000 * 60 * 60 * 24;
var expires_date = new Date( new Date().getTime() + (expires) );

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(secret))

const COOKIE_VALUE = {
  identifiers: [
    {
      id: "94",
      user_id: "170",
      identifier: "emmanuel@fast.co",
      identifier_type: "email",
      verified: "false",
      created_at: "2019-10-15T11:11:13Z",
      updated_at: "2019-10-15T11:11:13Z",
      deleted_at: "null"
    },
    {
      id: "94",
      user_id: "170",
      identifier: "4156885737",
      identifier_type: "phone",
      verified: "false",
      country: "1",
      created_at: "2019-10-15T11:11:13Z",
      updated_at: "2019-10-15T11:11:13Z",
      deleted_at: "null"
    }
  ],
  last_name: "Holland",
  first_name: "Domm",
  addresses: [
    {
      address_line: "San Francisco",
      address_line1: "San Francisco",
      country: "US",
      "state": "Monica",
      zip: "94107",
    },
    {
      address_line: "San Francisco",
      address_line1: "San Francisco",
      country: "US",
      "state": "Monica",
      zip: "94107",
    }
  ],
  cards: [
    {
      id: "card_1FHWk0D3b2rroMqyZHzd7qfH",
      object: "card",
      address_city: null,
      address_country: null,
      address_line1: null,
      address_line1_check: null,
      address_line2: null,
      address_state: null,
      address_zip: null,
      address_zip_check: null,
      brand: "Mastercard",
      country: "US",
      cvc_check: "unchecked",
      dynamic_last4: null,
      exp_month: 12,
      exp_year: 2020,
      funding: "credit",
      last4: "4242",
      metadata: {},
      name: null,
      tokenization_method: null,
      token_id: "tok_mastercard"
    },
    {
      id: "card_1FHWk0D3b2rroMqyZHzd7qfH",
      object: "card",
      address_city: null,
      address_country: null,
      address_line1: null,
      address_line1_check: null,
      address_line2: null,
      address_state: null,
      address_zip: null,
      address_zip_check: null,
      brand: "Visa",
      country: "US",
      cvc_check: "unchecked",
      dynamic_last4: null,
      exp_month: 12,
      exp_year: 2020,
      funding: "credit",
      last4: "5576",
      metadata: {},
      name: null,
      tokenization_method: null,
      token_id: "tok_mastercard"
    }
  ],
  order: {
    total: 99,
    discount: 30,
    subtotal: 69,
    currency: "USD"
  },
  items: [
    {
      category: "shipping",
      code: "delivery",
      description: "Next Day Delivery",
      carrier: "USPS",
      rrp: 29,
      amount: 29
    }
  ]
};

app.use('/assets', express.static(path.join(__dirname, '/dist/assets')))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.get('/fast-pay-button', function(req, res){
    const key = req.query.key;
    
    if(key){
        //res.cookie("fast-pay", COOKIE_VALUE, {expires: new Date(Date.now() + 900000)});
        res.sendFile(path.join(__dirname + '/dist/new-user-button.html'));
    }else{
        
        res.json({
            "status": "error",
            "message": "button key is required"
        })
    }
})

app.get('/fast-pay-form', function(req, res){
    const key = req.query.key;
    if(key){
        res.sendFile(path.join(__dirname + '/dist/new-user-form.html'));
 
    }else{
        res.json({
            "status": "error",
            "message": "button key is required"
        })
    }
}
)

app.get('/fast-returning-form', function(req, res){
    const key = req.query.key;
    if(key){
        res.sendFile(path.join(__dirname + '/dist/returning-user-form.html'));
 
    }else{
        res.json({
            "status": "error",
            "message": "button key is required hello"
        })
    }
}
)

app.get('/fast-returning-button', function(req, res){
    const key = req.query.key;
    if(key){
        res.sendFile(path.join(__dirname + '/dist/returning-user-button.html'));
 
    }else{
        res.json({
            "status": "error",
            "message": "button key is required "
        })
    }
})

app.post('/test', function(req, res){
    res.cookie("fast-pay", COOKIE_VALUE, {secure: true, signed: true, expires: expires_date});
    res.send("Cookie has been set")
    
  })

  app.post('/return-form-test', function(req, res){
    res.send("return form submitted")
    
  })

app.get('/init', function(req, res){
    const key = req.query.key;
   res.sendFile(path.join(__dirname + '/dist/init.html'));
  
  })

app.get('/fastpay.js', function(req, res){

    res.sendFile(path.join(__dirname + '/dist/fastpay.js'));
 
})

app.get(`/checkout/:id/auth`, function(req, res){
  console.log(req.params.id);
  const id = req.params.id;

  if(id) {
    res.send({
      "data": {
        "code_identifier": id,
        "identifier_exists": true
      },
      "error": false,
      "message": "string"
    })
  return;
  }
  res.send({
    "data": {
      "code_identifier": "string",
      "identifier_exists": false
    },
    "error": false,
    "message": "string"
  });``

})

app.post('/checkout/auth/verify', function(req, res){

  if(req.body.code === '1234') {

    res.send({
      "data": {
        ...COOKIE_VALUE
      },
      "error": false,
      "message": "string"
    })
    return
  }
  res.send({
    "data": {
      "code_identifier": "string",
      "identifier_exists": false
    },
    "error": true,
    "message": "string"
  });

})

app.listen(port, () => console.log(`server is listening on port ${port}!`))