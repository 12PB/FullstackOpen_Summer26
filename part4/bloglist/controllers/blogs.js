const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, name : 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const currUser = await User.findById(decodedToken.id)

  if (!currUser) {
    return response.status(400).json({ error: 'No users in database' })
  }

  console.log(currUser.toJSON())

  const newBlog = new Blog({
    title: blog.title,
    url: blog.url,
    author: blog.author,
    likes: blog.likes,
    user: currUser
  })

  const result = await newBlog.save()
  currUser.blogs = currUser.blogs.concat(result.toJSON().id)
  await currUser.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)

  response.status(204).json(result)
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.body.id)

  if (!blog) {
    return response.status(404)
  }

  blog.likes = request.body.likes
  const result = await blog.save()

  return response.json(result)
})

module.exports = blogRouter