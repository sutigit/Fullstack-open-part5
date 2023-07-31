const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        response.status(401).send("Unauthorized").end()
        return
    }

    if (!body.title || !body.author) {
        response.status(400).send("missing title or author").end()
        return
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
    if (!request.params.id) {
        response.status(400).end()
        return
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).send("blog not found").end()
    }

    const user = request.user

    if (user.id === blog.user.toString()) {
        const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
        response.json(deletedBlog)
    } else{
        response.status(400).end()
        return
    }

})


blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const oldBlog = await Blog.findById(request.params.id)

    const newBlog = {
        title: body.title || oldBlog.title,
        author: body.author || oldBlog.author,
        url: body.url || oldBlog.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
})



module.exports = blogsRouter