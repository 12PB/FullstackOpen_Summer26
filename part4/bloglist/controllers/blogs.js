const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
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