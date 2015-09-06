var express = require('express');
var router = express.Router();
var path = require('path');
var lib = require('../lib/lib.js');

router.post('/', function(req, res){
  console.log(req.body);
  lib.messageDetail(req.body.msgID, req.body.store, function(err, data){
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});

module.exports = router;
