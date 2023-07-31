const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.get('/', async (request, response) => {
    console.log('Testing route works')
    response.send('Testing route works')
})

testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter