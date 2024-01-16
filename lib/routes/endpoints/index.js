const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/dial-time', require('./dial-time'));
router.use('/auth', require('./auth-json'));
router.use('/from-zalo', require('./from-zalo'));
router.use('/to-zalo', require('./to-zalo'));
router.use('/outbound-sip', require('./outbound-sip'));
router.use('/inbound-sip', require('./inbound-sip'));
router.use('/ringgroup', require('./ringgroup'));
router.use('/tts-test', require('./tts-test'));
router.use('/echo', require('./echo'));
router.use('/transcribe', require('./transcribe-test'));
router.use('/ivr', require('./ivr'));
router.use('/greeting', require('./greeting'));
// router.use('/sip-auth', require('./auth-baserow'));

module.exports = router;