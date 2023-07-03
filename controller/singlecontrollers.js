const express = require( 'express' );
const familyModel = require( '../model/singleModel' );
const fs = require('fs')


// create profile

const createProfile = async ( req, res ) => {
    const {name} = req.body;
    const profile = new familyModel( {
        name,
        FamilyImages: req.files["FamilyImages"][0].filename,
        })
    try {
        const savedProfile = await profile.save();
        if ( !savedProfile ) {
            res.status( 400 ).json( {
                message: "Profile not saved."
            })
        } else {
            res.status( 201 ).json( {
                message: "Profile created successfully",
                data: savedProfile
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// get all profiles

const getProfiles = async ( req, res ) => {
    try {
        const profiles = await familyModel.find();
        if ( profiles.length === 0 ) {
            res.status( 201 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                message: "ALL FAMILY PROFILES",
                data: profiles,
                totalProfile: profiles.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// get one family profile

const oneProfile = async ( req, res ) => {
    const id = req.params.id
    const profile= await familyModel.findById(id)
    try {
        if (!profile) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile,
                totalProfile: profile.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


// Updating a profile

const updateProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profiles = await familyModel.findById( profileId );
    try {
        const { name } = req.body;
        const bodyData = {
            name: name,
            FamilyImages: profiles.FamilyImages
        }

        if ( req.files && req.files["FamilyImages"] ) {
            const oldProfileImagePath = `uploads/${ profiles.FamilyImages }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync(oldProfileImagePath)
            }
            bodyData.FamilyImages = req.files.FamilyImages[ 0 ].filename;
        }
        const newProfileImage = await familyModel.findByIdAndUpdate( profileId, bodyData, { new: true } )
            if ( newProfileImage ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newProfileImage
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// Deleting a profile

const deleteProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
            const oldProfileImagePath = `uploads/${ profile.FamilyImages }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync( oldProfileImagePath )
            }
        const deletedProfile = await familyModel.findByIdAndDelete( profileId );
        if ( deletedProfile ) {
            res.status( 200 ).json( {
                message: "Deleted successfully",
                data: deletedProfile
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}




module.exports = {
    createProfile,
    getProfiles,
    oneProfile,
    updateProfile,
    deleteProfile
}