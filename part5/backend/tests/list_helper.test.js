const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes(testHelper.emptyBlog), 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    assert.strictEqual(result, 5)  })
  test('when list has only many blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(testHelper.blogList)
    assert.strictEqual(result, 36)  })
})

describe('most likes', () => {
  test('when list has only one blog, produces the blog', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
    assert.deepStrictEqual(result,   {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    })  })
  test('when list has only many blogs,produces the blog with most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.blogList)
    assert.deepStrictEqual(result,
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },)  })
  test('when list has multiple blogs with same votes,produces the first blog', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithMultipleBlogs)
    assert.deepStrictEqual(result,
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
        __v: 0
      },)  })

})

describe('mostBlogs', () => {
  test('of empty list is zero', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(testHelper.emptyBlog), {})
  })
  test('when list has only one blog, shows author of blog', () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })  })

  test('when list has only many blogs, returns author with most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.blogList)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })  })
})

describe('most Popular', () => {
  test('of empty list is zero', () => {
    assert.deepStrictEqual(listHelper.mostLikes(testHelper.emptyBlog), {})
  })
  test('when list has only one blog, shows author of blog', () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })  })

  test('when list has only many blogs, returns author with most blogs', () => {
    const result = listHelper.mostLikes(testHelper.blogList)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })  })
})
