const { Schema, model } = require('mongoose')
const { Category, MBTI, Enneagram } = require('./constants')

const profileSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        validate: [
            {validator: isNameUnique, message: 'name already registered'}
        ]
    },
    picture: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    category: {
        type: String,
        enum: Object.keys(Category)
    },
    mbti: {
        type: String,
        enum: Object.keys(MBTI)
    },
    enneagram: {
        type: String,
        enum: Object.keys(Enneagram)
    },
    instinctual_variant: {
        type: String
    },
    tritype: {
        type: String
    },
    socionics: {
        type: String
    },
    big_5_sloan: {
        type: String
    },
    attitudinal_psyche: {
        type: String
    },
    temperament: {
        type: String
    }
}, {
    timestamps: true
})

//validation
function isNameUnique(value) {
    return Profile.findOne({ name: value })
      .then(found => {
        if (found) return false
        else return true
      })
  }

const Profile = model('Profile', profileSchema)

module.exports = Profile