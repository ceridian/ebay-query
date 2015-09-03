var request = require('request');
var async = require('async');
var ebay = require('ebay-api');
var fs = require('fs');
var path = require('path');

module.exports = {
  config: function(callback){
    fs.readFile(path.join(__dirname, '../config', 'ebay.json'), function(err, data){
      if(err){
        callback(err, null);
      }else{
        console.log(typeof(data));
        //var parsed = JSON.parse(data);
        callback(null, data);
      }
    });
  },

  postXML: function(params, opType, serviceName, callback){
    this.config(function(err, data){
      if(err){
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
            callback(err, null);
          }else{
            callback(null, res);
          }
        });
      }
    });
  }
}
