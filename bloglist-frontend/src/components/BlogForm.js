import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, setNotification, setBlogFormVisible }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const payload = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const newBlog = await blogService.create(payload)

      // get user from local storage
      const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
      const user = JSON.parse(loggedUserJSON)

      // add user to new blog
      newBlog.user = [user]

      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

      setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log('error', exception)
      setNotification({ message: 'Failed to add blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const cancel = (event) => {
    event.preventDefault()
    setBlogFormVisible(false)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
                    title:
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author:
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url:
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create" type="submit">create</button>
        <button id="cancel" onClick={cancel}>cancel</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setBlogFormVisible: PropTypes.func.isRequired,
}

export default BlogForm
