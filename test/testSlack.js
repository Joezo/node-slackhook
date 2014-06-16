var Slack = require('../slack.js');
var slack = new Slack({
  domain: 'testing',
  token: 'testToken'
});
var assert = require('assert');
var sinon = require('sinon');
var request = require('request');

describe('test send', function(){

  beforeEach(function(){
    sinon.stub(request, 'post');
  });

  it('should callback with ok', function(done){
    var input = {
      channel: '#test',
      text: 'hello',
      username: 'test',
      icon_emoji: 'smile',
      attachments : [{ 
        fallback: 'hello',
        color: 'good',
        fields: [
          {title: 'col 1', value: 'hello 1', short: true},
          {title: 'col 2', value: 'hello 2', short: true}
        ]
      }]
    };
    var expected = {
      url: 'https://testing.slack.com/services/hooks/incoming-webhook?token=testToken',
      body: '{"channel":"#test","text":"hello","username":"test","icon_emoji":"smile","attachments":[{"fallback":"hello","color":"good","fields":[{"title":"col 1","value":"hello 1","short":true},{"title":"col 2","value":"hello 2","short":true}]}]}'
    };
    request.post.callsArgWith(1, null, null, 'ok');
    slack.send(input, function(err, res){
      assert.ok(!err);
      assert.equal(res, 'ok');
      assert.deepEqual(request.post.getCall(0).args[0], expected);
      done();
    });
  });

  it('should use the default channel', function(done){
    var input = {
      text: 'hello',
      username: 'test',
      icon_url: 'drnick.png'
    };
    var expected = {
      url: 'https://testing.slack.com/services/hooks/incoming-webhook?token=testToken',
      body: '{"channel":"#general","text":"hello","username":"test","icon_url":"drnick.png"}'
    };
    request.post.callsArgWith(1, null, null, 'ok');
    slack.send(input, function(err, res){
      assert.ok(!err);
      assert.equal(res, 'ok');
      assert.deepEqual(request.post.getCall(0).args[0], expected);
      done();
    });
  });

  it('should error when we have no message', function(done){
    var input = {};
    var expected = new Error('No message');
    slack.send(input, function(err, res){
      assert.deepEqual(err, expected);
      assert.ok(!res);
      done();
    });
  });

  afterEach(function(){
    request.post.restore();
  });
});

describe('test respond', function(){

  it('should respond!', function(){
    var input = {
      token: 'token123',
      team_id: '123',
      channel_id: '2v22c2',
      channel_name: 'test channel',
      timestamp: '2013-12-13T20:59:03.650Z',
      user_id: '1',
      user_name: 'test',
      text: 'Test text'
    };
    var expected = {
      token: 'token123',
      team_id: '123',
      channel_id: '2v22c2',
      channel_name: 'test channel',
      timestamp: new Date('2013-12-13T20:59:03.650Z'),
      user_id: '1',
      user_name: 'test',
      text: 'Test text'
    };
    var result = slack.respond(input);
    assert.deepEqual(result, expected);
  });

});
