import React, { useEffect } from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

export default function Blog({ blog, blogs, setBlogs, setNotification }) {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [visibleRemove, setVisibleRemove] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      console.log('loggedUser', loggedUser.id)
      console.log('blog.user', blog.user[0].id)
      if (loggedUser.id === blog.user[0].id) {
        setVisibleRemove(true)
      }
    }
  }, [])

  const handleLike = async () => {
    const payload = {
      likes: likes + 1,
    }

    try {

      const response = await blogService.update(blog.id, payload)
      setLikes(response.likes)

    } catch (exception) {
      console.log('error', exception)
      setNotification({ message: 'Failed to update blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }
      , 5000)
    }
  }

  const removeBlog = async () => {
    // confirm delete via window.confirm

    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    try {
      await blogService.remove(blog.id)

      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs)

      setNotification({ message: 'Blog deleted', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }
      , 5000)
    } catch (exception) {
      console.log('error', exception)
      setNotification({ message: 'Failed to delete blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }
      , 5000)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '50%'
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} &nbsp;
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {likes} &nbsp;
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user.map((user, index) => <div key={index}>{user.name}</div>)}
        </div>
        {visibleRemove && <button onClick={removeBlog}>remove</button>}
      </div>
    </div>
  )
}
