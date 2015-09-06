var request = require('request');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('/messages', function(){
  it('should return an obj with message summary', function(done){
    request({
      method: 'POST',
      headers: {'content-type': 'application/json'},
      url: 'http://74.208.149.126:3000/messages',
      form: {store: 'jakes'}
    }, function(err, res, body){
      expect(err).toBe(null);
			expect(res).not.toBe(null);
      expect(body).not.toBe(null);
			done();
    });
  });
});
