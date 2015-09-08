var ebay = require('ebay-api');
var _ = require('underscore');
var http = require('http');

var token = "AgAAAA**AQAAAA**aAAAAA**xk7vVQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wMkIWoAZaBpQ+dj6x9nY+seQ**KPoCAA**AAMAAA**b8oOXmYz/dhzAbRtvZtJMbay3UvY9p/3dxzGPvpxAFay/FQgWvUGqtY+W8NCddaHMRGFC4XmOJ0W06R/N7IT9fZlvYtoRUuefjEowUaF1Y+wTLAZ21Cg2QGSJ4mM2nsb1Q6wx39xVm8WHNqY4y+T4zc/WmVFXiJxoAB5BW6TyBiJYf0vwAkcKrPxnPLwHcxoUbMsg8aVIn2Teo4xOTnrUZuPm3vmlVb2gxP04m5OwcTdHEDDR9VhjCgq3QGpWOMrMnSDax7KWlxkVMro6lbMuxDXtN6HWbaSfSwsaglklRXfcEB8OC/MV7R2R1Tvjm2bNy6SpCFbhkmtiTgWTncYojHzNRt3Fr+/vLHj9gXvNkQm1tr0JbV49wK4792vHA1HJjAqnpPuWABo/ektM4gRhi1wrtsyzwRDsmwKEyqxoFO2Z+Z/mo0N4JnCxPStGrxW4WljKua2L1RbMwX/zSfwXXufrAn2Yn3rTG/5WoQzP76WyWclCSq9xE3EESdoMGkGKYm4LHEC0+aZfQKyGRL8tGwl3bx2k1T6mvB5EXslhAfrQTvYcNbDZI0kjSOt8JQlOJCt8s/l2RqFaUXFbyRr8OLeah2fv6nlS8BqxNpe0QW/TLneueX3aSSo4Ns/DuxVyX4KX8NnvDjiCPryEHuGZaKVC2m4v9K610dBRS6DoIR1uBB5LhCbpeWH3BCchUBvS9XwFd/IexZpgC+pTuFwTjOqXIovo6pvfkV+sBigcXmSvbrQeAUAm7FmZWnGVDYq";
var msgID = "70793847193";

var xmlText = '<?xml version="1.0" encoding="UTF-8"?><TradingRequest xmlns="urn:ebay:apis:eBLBaseComponents"><RequesterCredentials><eBayAuthToken>AgAAAA**AQAAAA**aAAAAA**xk7vVQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wMkIWoAZaBpQ+dj6x9nY+seQ**KPoCAA**AAMAAA**b8oOXmYz/dhzAbRtvZtJMbay3UvY9p/3dxzGPvpxAFay/FQgWvUGqtY+W8NCddaHMRGFC4XmOJ0W06R/N7IT9fZlvYtoRUuefjEowUaF1Y+wTLAZ21Cg2QGSJ4mM2nsb1Q6wx39xVm8WHNqY4y+T4zc/WmVFXiJxoAB5BW6TyBiJYf0vwAkcKrPxnPLwHcxoUbMsg8aVIn2Teo4xOTnrUZuPm3vmlVb2gxP04m5OwcTdHEDDR9VhjCgq3QGpWOMrMnSDax7KWlxkVMro6lbMuxDXtN6HWbaSfSwsaglklRXfcEB8OC/MV7R2R1Tvjm2bNy6SpCFbhkmtiTgWTncYojHzNRt3Fr+/vLHj9gXvNkQm1tr0JbV49wK4792vHA1HJjAqnpPuWABo/ektM4gRhi1wrtsyzwRDsmwKEyqxoFO2Z+Z/mo0N4JnCxPStGrxW4WljKua2L1RbMwX/zSfwXXufrAn2Yn3rTG/5WoQzP76WyWclCSq9xE3EESdoMGkGKYm4LHEC0+aZfQKyGRL8tGwl3bx2k1T6mvB5EXslhAfrQTvYcNbDZI0kjSOt8JQlOJCt8s/l2RqFaUXFbyRr8OLeah2fv6nlS8BqxNpe0QW/TLneueX3aSSo4Ns/DuxVyX4KX8NnvDjiCPryEHuGZaKVC2m4v9K610dBRS6DoIR1uBB5LhCbpeWH3BCchUBvS9XwFd/IexZpgC+pTuFwTjOqXIovo6pvfkV+sBigcXmSvbrQeAUAm7FmZWnGVDYq</eBayAuthToken></RequesterCredentials><MessageIDs><MessageID>70793847193</MessageID></MessageIDs><DetailLevel>ReturnMessages</DetailLevel></TradingRequest>';

var params = {
  'MessageIDs': msgID,
  'authToken': token,
  'DetailLevel': 'ReturnMessages'
};

function start(){
  var options = {
    hostname: 'api.ebay.com',
    port: 443,
    path: '/ws/wsapi',
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'Content-Length': xmlText.length
    }
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
    res.on('end', function() {
      console.log('No more data in response.')
    })
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(xmlText);
  req.end();
  /*var x = buildXmlInput('Trading', params);
  console.log(x);
  ebay.ebayApiPostXmlRequest({
    serviceName: 'Trading',
    opType: 'GetMyMessages',
    devName: "jacob_van_vleet-jacobvan-87d2-4-hqliskmly",
    cert: "e1c0754b-90ce-4814-ab6d-363d15d5fc43",
    appName: "jacobvan-974a-4616-bc66-6c5d04e99b55",
    params: params
  }, function(err, res){
    console.log(err, res);
  });*/
}

var buildXmlInput = function buildXmlInput(opType, params) {
  var xmlBuilder = require('xml');

  var data = {}, top;

  switch(opType) {
    // @todo others might have different top levels...
    case 'GetOrders':
    default:
      data[opType + 'Request'] = [];      // e.g. <GetOrdersRequest>
      top = data[opType + 'Request'];
      top.push({ '_attr' : { 'xmlns' : "urn:ebay:apis:eBLBaseComponents" } });
  }

  if (typeof params.authToken !== 'undefined') {
    top.push({ 'RequesterCredentials' : [ { 'eBayAuthToken' : params.authToken } ] });
    delete params.authToken;
  }

  if(typeof params.MessageIDs !== 'undefined') {
    top.push({ 'MessageIDs' : [ { 'MessageID' : params.MessageIDs} ] });
    delete params.MessageIDs;
  }

  // for repeatable fields, use array values.
  // to keep this simpler, treat everything as an array value.
  _(params).each(function(values, key) {
    if (!_.isArray(values)) values = [values];

    _(values).each(function(value){
      var el = {};
      el[key] = value;
      top.push(el);
    });
  });

  // console.log(util.inspect(data,true,10));
  data = [ data ];
  console.log(JSON.stringify(data));
  return '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + xmlBuilder(data, true);
};

start();
