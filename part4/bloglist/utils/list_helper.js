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

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return {}
  }

  const authorList = _.groupBy(blogs, 'author')
  const likeList = _.mapValues(authorList, (group) => (_.sumBy(group, 'likes')))
  const topAuthor = _.maxBy(Object.keys(likeList), (author) => likeList[author])
  console.log('clogs author:', topAuthor, 'likes:' ,likeList[topAuthor])

  return { author: topAuthor, likes: likeList[topAuthor] }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}