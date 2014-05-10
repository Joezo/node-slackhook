# Slackhook
The only module you'll need for custom hooks that integrate with [Slack](https://slack.com).

[![Build Status](https://travis-ci.org/Joezo/node-slackhook.svg)](https://travis-ci.org/Joezo/node-slackhook)

## Installation
`npm install slackhook`

## Requirements
You'll need a domain and token from Slack.

The domain will be the organisation part of `<organisation>.slack.com`

The token is given to you when you create your incoming webhook integration.


## Usage

```javascript
var Slackhook = require('slackhook');
var slack = new Slackhook({
    domain: 'yourdomain',
    token: 'yourtoken'
});
```

### Sending
You can set up incoming webhooks [here](https://slack.com/services/new/incoming-webhook)

```javascript
slack.send({
    content: 'Hi everybody',
    channel: '#general',
    username: 'Dr. Nick',
    icon_url: 'drnick.png' 
});
```

You can pass the `send` method a callback if you like.

```javascript
slack.send({
    text: 'Hi Dr. Nick!',
    channel: '#general',
    username: 'Everybody',
    icon_emoji: 'smile'
}, function(err, response){
    // Do your thing
});
```

### Responding

You can also respond to webhooks coming from Slack. You could use this to make a chat bot etc.

You can set up outgoing webhooks [here](https://slack.com/services/new/outgoing-webhook)

This example assumes you're running inside an Express.js route.

```javascript
app.post('/outgoing', function(req, res){
	var hook = slack.respond(req.body);
	res.json({text: 'Hi ' + hook.user_name, username: 'Dr. Nick'});
});
```

## Example apps

[Teamcity integration](https://github.com/Joezo/slackhook-example)

## License
MIT