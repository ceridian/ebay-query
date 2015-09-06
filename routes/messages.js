var express = require('express');
var router = express.Router();
var path = require('path');
var lib = require('../lib/lib.js');

router.post('/', function(req, res){
  lib.messageSummary(req.body.store, function(err, data){
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});

module.exports = router;
