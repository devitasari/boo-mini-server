const { Profile } = require('../models')

class ProfileController {
    static register(req, res, next) {
        Profile.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            mbti: req.body.mbti,
            enneagram: req.body.enneagram,
            instinctual_variant: req.body.instinctual_variant,
            tritype: req.body.tritype,
            socionics: req.body.socionics,
            big_5_sloan: req.body.big_5_sloan,
            attitudinal_psyche: req.body.attitudinal_psyche,
            temperament: req.body.temperament
        })
        .then(user => {
            res.status(201).json(user)
        }).catch(next)
    }

    static findById(req, res, next) {
        Profile.findById(req.params.profileId)
        .then(user => {
            let status = 200
            if (!user) status = 404
            
            res.status(status).json(user)
        }).catch(next)
    }
}

module.exports = ProfileController