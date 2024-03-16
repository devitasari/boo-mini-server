const router = require('express').Router()
const ProfileController = require('../controllers/profileController');

router.post('/', ProfileController.register)
router.get('/:profileId', ProfileController.findById)

module.exports = router
