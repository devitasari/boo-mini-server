const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const mongod = require('./setup')
const { ObjectId } = mongoose.Types
const { MongoMemoryServer } = require('mongodb-memory-server')

chai.use(chaiHttp)
const expect = chai.expect

let profileId
const invalidProfileId = new ObjectId('65f3d7742fab56e04524ec65')
const profile = {
    name: 'sample name',
    description: 'sample desc'
}

const app = require('../app')

describe('PROFILE ROUTES', () => {
    describe('POST /profiles', () => {
        describe('positive case', () => {
            it('valid input: should return profile with status 201', (done) => {
                chai.request(app)
                    .post('/profiles')
                    .send(profile)
                    .end((err, res) => {
                        profileId = res.body._id
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id','name','picture','description','createdAt','updatedAt')
                        expect(res.body.name).to.equal(profile.name)
                        expect(res.body.description).to.equal(profile.description)
                        done()
                    })
            })
        })
        describe('negative case', () => {
            it('duplicate name: should return profile with status 422', (done) => {
                chai.request(app)
                    .post('/profiles')
                    .send(profile)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(422)
                        expect(res.body.messages[0]).to.equal('name already registered')
                        done()
                    })
            })
            it('empty name and description: should return profile with status 422', (done) => {
                chai.request(app)
                    .post('/profiles')
                    .send()
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(422)
                        expect(res.body.messages[0]).to.equal('name is required')
                        expect(res.body.messages[1]).to.equal('description is required')
                        done()
                    })
            })
        })
    })
    describe('GET /profiles/:profileId', () => {
        describe('positive case', () => {
            it('valid profileId: should return profile with status 200', (done) => {
                chai.request(app)
                    .get(`/profiles/${profileId}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id','name','picture','description','createdAt','updatedAt')
                        expect(res.body.name).to.equal(profile.name)
                        expect(res.body.description).to.equal(profile.description)
                        done()
                    })
            })
        })
        describe('negative case', () => {
            it('invalid profileId: should return null with status 404', (done) => {
                chai.request(app)
                    .get(`/profiles/${invalidProfileId}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res.statusCode).to.equal(404)
                        expect(res.body).to.be.null
                        done()
                    })
            })
        })
    })
})