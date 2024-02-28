import express from 'express'
import {
  getAllPosts,
  insertPosts,
  getPostById,
  updatePost,
  deletePostById,
} from './db.js'

const app = express()

app.use(express.json())

app.get('/posts', async (req, res) => {
  try {
    const allPosts = await getAllPosts()
    return res.status(201).json(allPosts)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.post('/posts', async (req, res) => {
  const {
    title,
    content,
    featuredTeam,
    featuredPlayer,
    relatedMatch,
    tactics,
    highlightedEvent,
    banner,
  } = req.body

  if (
    !title
    || !content
    || !featuredTeam
    || !featuredPlayer
    || !relatedMatch
    || !tactics
    || !highlightedEvent
    || !banner
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await insertPosts(
      title,
      content,
      featuredTeam,
      featuredPlayer,
      relatedMatch,
      tactics,
      highlightedEvent,
      banner,
    )
    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.get('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }
  try {
    const post = await getPostById(postId)
    if (post) {
      return res.json(post)
    }
    return res.status(404).json({ error: 'Post not found' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.put('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)
  const {
    title,
    content,
    featuredTeam,
    featuredPlayer,
    relatedMatch,
    tactics,
    highlightedEvent,
    banner,
  } = req.body

  if (
    Number.isNaN(postId)
    || !title
    || !content
    || !featuredTeam
    || !featuredPlayer
    || !relatedMatch
    || !tactics
    || !highlightedEvent
    || !banner
  ) {
    return res.status(400).json({ error: 'Missing required fields or invalid ID' })
  }

  try {
    const result = await updatePost(
      postId,
      title,
      content,
      featuredTeam,
      featuredPlayer,
      relatedMatch,
      tactics,
      highlightedEvent,
      banner,
    )
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Post updated successfully' })
    }
    return res.status(404).json({ error: 'Post not found' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.delete('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }
  try {
    const result = await deletePostById(postId)
    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    return res.status(404).json({ error: 'Post not found' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.use((req, res, next) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
  if (!allowedMethods.includes(req.method)) {
    return res.status(501).json({ error: 'Method not implemented' })
  }
  return next()
})

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint does not exist' })
})

const port = 5000
app.listen(port, () => {
})
