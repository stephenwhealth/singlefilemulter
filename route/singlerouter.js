const express = require( 'express' );
const router = express.Router();
const upload = require('../utils/multer')
const { createProfile, getProfiles, oneProfile, updateProfile, deleteProfile} = require( '../controller/singlecontrollers' )


router.post( '/profile', upload.fields([{name: "FamilyImages", maxCount: 1}]), createProfile )
router.get('/profiles', getProfiles)
router.get('/profiles/:id', oneProfile)
router.put('/profiles/:id', upload.fields( [ { name: "FamilyImages", maxCount: 1 } ] ), updateProfile)
router.delete( '/profiles/:id', deleteProfile );


module.exports = router;