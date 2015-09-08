var ebay = require('ebay-api');

var token = "AgAAAA**AQAAAA**aAAAAA**fKfnVQ**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wMkIWoAZaBpQ+dj6x9nY+seQ**KPoCAA**AAMAAA**b8oOXmYz/dhzAbRtvZtJMbay3UvY9p/3dxzGPvpxAFay/FQgWvUGqtY+W8NCddaHMRGFC4XmOJ0W06R/N7IT9fZlvYtoRUuefjEowUaF1Y+wTLAZ21Cg2QGSJ4mM2nsb1Q6wx39xVm8WHNqY4y+T4zc/WmVFXiJxoAB5BW6TyBiJYf0vwAkcKrPxnPLwHcxoUbMsg8aVIn2Teo4xOTnrUZuPm3vmlVb2gxP04m5OwcTdHEDDR9VhjCgq3QGpWOMrMnSDax7KWlxkVMro6lbMuxDXtN6HWbaSfSwsaglklRXfcEB8OC/MV7R2R1Tvjm2bNy6SpCFbhkmtiTgWTncYojHzNRt3Fr+/vLHj9gXvNkQm1tr0JbV49wK4792vHA1HJjAqnpPuWABo/ektM4gRhi1wrtsyzwRDsmwKEyqxoFO2Z+Z/mo0N4JnCxPStGrxW4WljKua2L1RbMwX/zSfwXXufrAn2Yn3rTG/5WoQzP76WyWclCSq9xE3EESdoMGkGKYm4LHEC0+aZfQKyGRL8tGwl3bx2k1T6mvB5EXslhAfrQTvYcNbDZI0kjSOt8JQlOJCt8s/l2RqFaUXFbyRr8OLeah2fv6nlS8BqxNpe0QW/TLneueX3aSSo4Ns/DuxVyX4KX8NnvDjiCPryEHuGZaKVC2m4v9K610dBRS6DoIR1uBB5LhCbpeWH3BCchUBvS9XwFd/IexZpgC+pTuFwTjOqXIovo6pvfkV+sBigcXmSvbrQeAUAm7FmZWnGVDYq";
var msgID = "70793847193";

var params = {
  'authToken': token,
  'DetailLevel': 'ReturnMessages',
  'MessageIDs': [ {'MessageID': msgID}]
};

function start(){
  console.log(params);
  var xmlBuilder = require('xml');
  xmlBuilder(params, true);
  ebay.ebayApiPostXmlRequest({
    serviceName: 'Trading',
    opType: 'GetMyMessages',
    devName: "jacob_van_vleet-jacobvan-87d2-4-hqliskmly",
    cert: "c34588c1-cd71-4843-acde-2560c7b326be",
    appName: "jacobvan-87d2-4b6b-b584-4096cdbcd4b0",
    params: params
  }, function(err, res){
    console.log(err, res);
  });
}

start();
