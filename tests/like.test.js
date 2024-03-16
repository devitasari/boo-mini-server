const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const mongod = require('./setup')
const { ObjectId } = mongoose.Types
const { Profile, Comment } = require('../models')
const { MBTI, Enneagram, Zodiac} = require('../models/constants')

chai.use(chaiHttp)
const expect = chai.expect

let profileId, profileIdCommentator, commentId

const app = require('../app')

before(async () => {
    await Profile.create({
        name: 'sample name4',
        description: 'sample description2'
    })
    .then(profile => {
        profileId = profile._id
        return Profile.create({
            name: 'sample name5',
            description: 'sample description3'
        })
    })
    .then(profile => {
        profileIdCommentator = profile._id
        return Comment.create({
            commentatorId: profileIdCommentator,
            profileId: profileId,
            title: 'sample title2',
            description: 'sample desc2',
            mbti: MBTI.INTJ,
            enneagram: Enneagram['1w2'],
            zodiac: Zodiac.Virgo
        })
    })
    .then(comment => {
        commentId = comment._id
    })
    .catch(console.log)
});


describe('LIKE ROUTES', () => {
    describe('POST /likes', () => {
        describe('positive case', () => {
            it('valid input: should return like data with status 201', (done) => {
                chai.request(app)
                    .post(`/likes/${commentId}`)
                    .send({ likerId: profileId })
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id','commentId','likerId','createdAt','updatedAt')
                        done()
                    })
            })
        })
        describe('negative case', () => {
            it('duplicate name: should return error with status 422', (done) => {
                chai.request(app)
                    .post(`/likes/${commentId}`)
                    .send()
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(422)
                        expect(res.body.messages[0]).to.equal('likerId is required')
                        done()
                    })
            })
        })
    })
    describe('DELETE /likes', () => {
        describe('positive case', () => {
            it('valid input: should delete like data with status 201', (done) => {
                chai.request(app)
                    .delete(`/likes/${commentId}`)
                    .send({ likerId: profileId })
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(201)
                        expect(res.body.deletedCount).to.equal(1)
                        done()
                    })
            })
        })
        describe('negative case', () => {
            it('empty likerId: should return error with status 404', (done) => {
                chai.request(app)
                    .delete(`/likes/${commentId}`)
                    .send()
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(404)
                        expect(res.body.deletedCount).to.equal(0)
                        done()
                    })
            })
        })
    })
})