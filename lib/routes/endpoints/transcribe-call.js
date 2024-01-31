const router = require("express").Router();
const WebhookResponse = require("@jambonz/node-client").WebhookResponse;
// const text = 'Hi there.  Please say something and I will try to transcribe it for you';

router.post("/", async (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, "POST /transcribe");
  console.log(req.body);
  try {
    const app = new WebhookResponse();
    app.dial({
      callerId: req.body.from,
      answerOnBridge: true,
      target: [
        {
          type: "user",
          name: `${req.body.to}@sip.cpaas61.epacific.net`,
        },
      ],
      transcribe: {
        transcriptionHook: "/transcribe/transcription",
        recognizer: {
          vendor: "microsoft",
          language: "vi-VN", //"en-US",
          // interim: true,    //transcript khi chưa nói dứt câu = true or false
          interim: false,
          dualChannel: true,
          separateRecognitionPerChannel: true,
          enhancedModel: true,
          words: true,
        },
      },
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, "Error");
    res.sendStatus(503);
  }
});

router.post("/transcription", (req, res) => {
  const { logger } = req.app.locals;
  const { speech } = req.body;
  // console.log("----------------------Hook----------------------");
  // console.log(req.body);
  // console.log("----------------------Speech info----------------------");
  // console.log(speech);
  // console.log("----------------------n_best info----------------------");
  // console.log(speech.vendor.evt.n_best[0].words);
  // console.log("----------------------Word info----------------------");
  // // console.log(speech.alternatives[0].words[0]);
  // for (let i = 0; i < speech.alternatives[0].words.length; i++) {
  //   console.log(speech.alternatives[0]);
  // }
  // console.log("---------------------- End word info----------------------");

  const transcript = speech.alternatives[0].transcript;
  // console.log(transcript);
  if (speech && speech.channel_tag == 1) {
    console.log(`${req.body.from} output -> ${transcript}`);
  } else if (speech && speech.channel_tag == 2) {
    console.log(`${req.body.to} output -> ${transcript}`);
  }
  // console.log("------alternatives------");
  // console.log(speech.alternatives[0]);
  // console.log("------evt------");
  // console.log(speech.vendor.evt);

  logger.debug({ payload: req.body }, "POST /transcribe/transcription");
  res.sendStatus(200);
});

module.exports = router;
