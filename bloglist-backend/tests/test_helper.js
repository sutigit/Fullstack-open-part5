const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "test1",
        author: "author1",
        url: "url1",
        likes: 1
    },
    {
        title: "test2",
        author: "author2",
        url: "url2",
        likes: 2
    },
    {
        title: "test3",
        author: "author3",
        url: "url3",
        likes: 3
    },
]

const nonExistingId = async () => {
    const note = new Blog({ content: 'willremovethissoon' })
    await note.save()
    await note.remove()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}