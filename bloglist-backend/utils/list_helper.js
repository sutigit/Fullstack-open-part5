const _ = require("lodash")

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let blog
    let mostLikes = 0
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes >= mostLikes) {
            blog = blogs[i]
            mostLikes = blogs[i].likes
        }
    }

    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}

const mostBlogs = (blogs) => {
    const result = _(blogs)
        .groupBy('author')
        .map((blogs, author) => ({ author, blogs: blogs.length }))
        .maxBy('blogs');

    return result
}

const mostLikes = (blogs) => {
    const result = _(blogs)
        .groupBy('author')
        .map((blogs, author) => ({
            author,
            likes: _.sumBy(blogs, 'likes')
        }))
        .maxBy('likes');

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}