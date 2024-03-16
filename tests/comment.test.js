const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const mongod = require('./setup')
const { Profile, Comment, Like } = require('../models')
const { Zodiac, Enneagram, MBTI } = require('../models/constants')

chai.use(chaiHttp)
const expect = chai.expect

let profileIdCommentator, profileId
const invalidProfileId = new ObjectId('65f3d7742fab56e04524ec65')

before(async () => {
    await Profile.create({
        name: 'sample name2',
        description: 'sample description2'
    })
    .then(profile => {
        profileId = profile._id
        return Profile.create({
            name: 'sample name3',
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
        return Like.create({
            commentId: comment._id,
            likerId: profileId
        })
    })
    .then(like => {

    })
    .catch(console.log)
});

const app = require('../app')

const comment = {
    title: 'sample title',
    description: 'sample desc',
    mbti: MBTI.INTP,
    enneagram: Enneagram['8w9'],
    zodiac: Zodiac.Cancer
}

describe('COMMENT ROUTES', () => {
    describe('POST /comments', () => {
        describe('positive case', () => {
            it('valid input: should return comment with status 201', (done) => {
                chai.request(app)
                    .post(`/comments/${profileId}`)
                    .send({ ...comment, commentatorId: profileIdCommentator})
                    .end((err, res) => {
                        commentId = res.body._id
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id','profileId','commentatorId','title','description','mbti','enneagram','zodiac','createdAt','updatedAt')
                        expect(res.body.profileId).to.equal(profileId.toString())
                        expect(res.body.commentatorId).to.equal(profileIdCommentator.toString())
                        expect(res.body.title).to.equal(comment.title)
                        expect(res.body.description).to.equal(comment.description)
                        expect(res.body.mbti).to.equal(comment.mbti)
                        expect(res.body.enneagram).to.equal(comment.enneagram)
                        expect(res.body.zodiac).to.equal(comment.zodiac)
                        done()
                    })
            })
        })
        describe('negative case', () => {
            it('empty input: should return error with status 422', (done) => {
                chai.request(app)
                    .post(`/comments/${profileId}`)
                    .send()
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(422)
                        expect(res.body.messages[0]).to.equal('commentatorId is required')
                        expect(res.body.messages[1]).to.equal('title is required')
                        expect(res.body.messages[2]).to.equal('description is required')
                        done()
                    })
            })
            it('empty parameter profileId: should return error route not found with status 404', (done) => {
                chai.request(app)
                    .post(`/comments`)
                    .send({ ...comment, commentatorId: profileIdCommentator})
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(404)
                        done()
                    })
            })
            it('self comment: should return error with status 401', (done) => {
                chai.request(app)
                    .post(`/comments/${profileId}`)
                    .send({ ...comment, commentatorId: profileId})
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(401)
                        console.log(res.statusCode, res.body)
                        expect(res.body.messages[0]).to.equal('comment self profile is prohibited')
                        done()
                    })
            })
        })
    })
    describe('GET /comments/:profileId', () => {
        describe('positive case', () => {
            it('valid commentId: should return all comments by most recent comment by default with status 200', (done) => {
                chai.request(app)
                    .get(`/comments/${profileId}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(200)
                        expect(res.body).to.be.an('array').that.has.lengthOf(2)
                        expect(res.body[0]).to.have.any.keys('_id','commentatorId', 'profileId', 'title', 'description', 'mbti', 'enneagram', 'zodiac', 'commentator', 'likes','createdAt','updatedAt')
                        expect(res.body[0].commentator).to.be.an('array')
                        expect(res.body[0].createdAt > res.body[1].createdAt)
                        done()
                    })
            })
            it('sort comment by most like: should return all comments with status 200', (done) => {
                chai.request(app)
                    .get(`/comments/${profileId}?sort=like`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(200)
                        expect(res.body).to.be.an('array').that.has.lengthOf(2)
                        expect(res.body[0]).to.have.any.keys('_id','commentatorId', 'profileId', 'title', 'description', 'mbti', 'enneagram', 'zodiac', 'commentator', 'likes','createdAt','updatedAt')
                        expect(res.body[0].commentator).to.be.an('array')
                        expect(res.body[0].likes.length > res.body[1].likes.length)
                        done()
                    })
            })
            it('filter comment with mbti INTP: should return all comments with status 200', (done) => {
                chai.request(app)
                    .get(`/comments/${profileId}?mbti=${MBTI.INTP}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(200)
                        expect(res.body).to.be.an('array').that.has.lengthOf(1)
                        expect(res.body[0]).to.have.any.keys('_id','commentatorId', 'profileId', 'title', 'description', 'mbti', 'enneagram', 'zodiac', 'commentator', 'likes','createdAt','updatedAt')
                        expect(res.body[0].mbti).to.equal(MBTI.INTP)
                        done()
                    })
            })
            it('filter comment with enneagram 8w9: should return all comments with status 200', (done) => {
                chai.request(app)
                    .get(`/comments/${profileId}?enneagram=${Enneagram['8w9']}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(200)
                        expect(res.body).to.be.an('array').that.has.lengthOf(1)
                        expect(res.body[0]).to.have.any.keys('_id','commentatorId', 'profileId', 'title', 'description', 'mbti', 'enneagram', 'zodiac', 'commentator', 'likes','createdAt','updatedAt')
                        expect(res.body[0].enneagram).to.equal(Enneagram['8w9'])
                        done()
                    })
            })
            it('filter comment with zodiac Virgo: should return all comments with status 200', (done) => {
                chai.request(app)
                    .get(`/comments/${profileId}?zodiac=${Zodiac.Virgo}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(200)
                        expect(res.body).to.be.an('array').that.has.lengthOf(1)
                        expect(res.body[0]).to.have.any.keys('_id','commentatorId', 'profileId', 'title', 'description', 'mbti', 'enneagram', 'zodiac', 'commentator', 'likes','createdAt','updatedAt')
                        expect(res.body[0].zodiac).to.equal(Zodiac.Virgo)
                        done()
                    })
            })
        })
        describe('negative case', () => {
            it('invalid profileId: should return empty array with status 404', (done) => {
                chai.request(app)
                    .get(`/comments/${invalidProfileId}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(404)
                        expect(res.body).to.be.an('array').that.has.lengthOf(0)
                        done()
                    })
            })
        })
    })
})