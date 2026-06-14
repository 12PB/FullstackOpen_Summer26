const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(testHelper.blogList)
})

describe('all blogs', () => {
  test(' are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, testHelper.blogList.length)
  })

  test(' are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('have unique identifier field id', async () => {
    const blogs = await api.get('/api/blogs')
    assert('id' in blogs.body[0])
  })
})

describe('a new valid blog', () => {
  test('can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Test Author',
      url: 'testAddition',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await testHelper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, testHelper.blogList.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('autofills missing likes property', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Test Author',
      url: 'testAddition',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    const createdBlog = blogs.body.find(blog => blog.title === 'async/await simplifies making async calls')
    assert.equal(createdBlog.likes, 0)
  })

  test('checks if title property exists', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'testAddition',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('checks if url property exists', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Test Author',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})