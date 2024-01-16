const router = require('express').Router();
const {WebhookResponse} = require('@jambonz/node-client');
const text = `Chào buổi sáng. Tôi có thể giúp bạn chuyển cuộc gọi này,
Bạn có thể nói thên của người tổng đài viên mà bạn muốn gặp, tôi sẽ chuyển máy đến cho nhân viên đó`;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /greeting');
  try {
    const app = new WebhookResponse();
    app
      .say({text: 'silence_stream://1000'})
      .gather({
        say: {text},
        input: ['speech'],
        actionHook: '/greeting/dial',
        timeout: 15,
      })
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/dial', (req, res) => {
  const table_routing_agents = [
    {
      "name": "huy",
      "extension": 103
    },
    {
      "name": "tài",
      "extension": 104
    },
    {
      "name": "phúc",
      "extension": 105
    }
  ]
  const {logger} = req.app.locals;
  const {reason, speech} = req.body;
  logger.debug({payload: req.body}, 'POST /greeting/dial');
  try {
    const app = new WebhookResponse();
    if (reason === 'speechDetected') {
      const {confidence} = speech.alternatives[0];
      const transcript = speech.alternatives[0].transcript.toLowerCase();
      console.log(`transcript here -> ${transcript}`)
      let destination = 'bộ phận điều hành';
      let extension = 102;
      // if (transcript.includes('huy')) destination = 'huy';
      // else if (transcript.includes('tài')) destination = 'tài';
      const i = table_routing_agents.findIndex(e => transcript.includes(e.name));
      if (i > -1) {
        /* vendors contains the element we're looking for, at index "i" */
        destination = table_routing_agents[i]['name'];
        extension = table_routing_agents[i]['extension'];
        console.log(destination);
        console.log(extension);
      }else {
        console.log(destination);
        console.log(extension);
      }
      app
        .say({text:
        `<speak>
          Vui lòng đợi trong giây lát, tôi sẽ chuyển máy cho ${destination}</say-as>
        </speak>`
        })
        .dial({
          callerId: req.body.from,
          answerOnBridge: true,
          target: [
            {
              type: 'user',
              name: `${extension}@sip.cpaas61.epacific.net`
              // name: `${req.body.to}@sip.cpaas61.epacific.net`
            }
          ]
        });
      // if (speech.vendor?.name) {
      //   app.say({text: `The speech service was provided by ${speech.vendor.name}`});
      // }
      // app
      //   .gather({
      //     say: {text: 'Say something else.'},
      //     input: ['speech'],
      //     actionHook: '/greeting/dial',
      //   });
    }
    else {
      app
      .gather({
        say: {text: 'Are you still there?  I didn\'t hear anything.'},
        input: ['speech'],
        actionHook: '/greeting/dial',
      });
    }
    res.status(200).json(app);
  } catch (err) {
    logger.info({err}, 'Error handling /greeting/dial');
    res.sendStatus(503);
  }
});

module.exports = router;