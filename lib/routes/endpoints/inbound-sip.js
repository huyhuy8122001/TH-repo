const router = require("express").Router();
const { WebhookResponse } = require("@jambonz/node-client");
const text = `<speak>
<prosody volume="loud">Chào mừng bạn đến với tổng đài CCall,</prosody> để gặp nhân viên tư vấn vui lòng nhấn phím 1, để gặp bộ phận kỹ thuật vui lòng nhấn phím 2, chúc bạn có một ngày tốt lành, xin cảm ơn.
</speak>`;
router.post("/", (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, "POST/ringgroup");
  try {
    console.log("----------------------------------------------------------");
    console.log("Logggg");
    console.log(req.body);

    // console.log(req.body.call_sid);
    // call_sid = req.body.call_sid

    const app = new WebhookResponse();
    app.say({ text }).dial({
      // callerId: req.body.from,
      callerId: req.body.from,
      answerOnBridge: true,
      target: [
        {
          type: "user",
          name: "104@epa.sip.cpaas61.epacific.net",
        },
      ],
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, "Error");
    res.sendStatus(503);
  }
});

module.exports = router;
