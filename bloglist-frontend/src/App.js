import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

// My components
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      console.log('no user')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    if (user === null) return

    const payload = {
      token: user.token,
      username: user.username,
      name: user.name
    }

    blogService.getAll(payload)
      .then(blogs => {
        setBlogs( blogs )
      })
      .catch(error => {
        console.log('error', error)
      })
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginUser = await loginService.login({
        username, password,
      })

      blogService.setToken(loginUser.token)

      setUser(loginUser)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(loginUser)
      )

      setNotification({ message: `Welcome ${loginUser.name}`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const LoginForm = () => (
    <div>
      <h2>Log in to application</h2>

      {notification !== null && Notification(notification)}

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          id='login'
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  )

  if (user === null) {
    return LoginForm()
  }

  return (
    <div>
      <h2>blogs</h2>

      {notification !== null && Notification(notification)}

      <div>
        {user.name} logged in &nbsp;
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogListUser')
          setUser(null)
        }}>logout</button>
      </div>
      <br />

      { blogFormVisible ?
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
          setBlogFormVisible={setBlogFormVisible}
        /> :
        <button onClick={() => setBlogFormVisible(true)}>Add blog</button>
      }

      <div className='blogs'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
            />
          )}
      </div>
    </div>
  )
}


export default App