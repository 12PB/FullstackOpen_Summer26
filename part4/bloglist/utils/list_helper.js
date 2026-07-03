const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  const reducer = (max, item) => {
    return max.likes >= item.likes
      ? max
      : item
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return {}
  }
  const authorList = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.keys(authorList), (author) => authorList[author])

  return { author: topAuthor, blogs: authorList[topAuthor] }
}


module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}