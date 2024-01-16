const router = require('express').Router();
const { WebhookResponse } = require('@jambonz/node-client');

router.post('/', (req, res) => {
  const { logger } = req.app.locals;
  logger.debug({ payload: req.body }, 'POST/outbound-sip');
  try {
    const app = new WebhookResponse();
    app.dial({
      // callerId: req.body.from,
      // callerId: "84899189266",
      callerId: "84899189559",
      answerOnBridge: true,
      target: [
        // {
        //   "type": "phone",
        //   "number": req.body.to,
        //   "trunk": "Zalo_ZCC"
        // },
        // {
        //   "type": "phone",
        //   "number": "666666",
        //   "trunk": "fusionGCP"
        // },
        {
          "type": "phone",
          "number": req.body.to,
          "trunk": "SIP-EPA"
        },
      ]
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({ err }, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;