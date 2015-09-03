var request = require('request');
var async = require('async');
var ebay = require('ebay-api');
var fs = require('fs');

module.exports = {
  config: function(callback){
    fs.readFile('../config/ebay.json', function(err, data){
      if(err){
        console.log(err);
        callback(err, null);
      }else{
        var parsed = JSON.parse(data);
        callback(null, parsed);
      }
    });
  },

  postXML: function(params, opType, serviceName, callback){
    this.config(function(err, data){
      if(err){
        console.log(err);
        callback(err, null);
      }else{
        ebay.ebayApiPostXmlRequest({
          serviceName: serviceName,
          opType: opType,
          devName: data.ruName,
          cert: data.CertID,
          appName: AppID,
          params: params
        }, function(err, res){
          if(err){
            console.log(err);
            callback(err, null);
          }else{
            callback(null, res);
          }
        });
      }
    });
  }
}
