const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {

  const reducer = (max, item) => {
    return max.likes >= item.likes
      ? max
      : item
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

module.exports = {
  totalLikes,
  mostLikes
}