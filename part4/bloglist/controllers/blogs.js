const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, name : 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const currUser = request.user

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

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const currUser = request.user

  const currBlog = await Blog.findById(request.params.id)

  if (currBlog.user.toString() === currUser.id.toString()) {
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(result)
  } else {
    response.status(401).json({ error: 'User not authenticated to delete this blog' })
  }
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