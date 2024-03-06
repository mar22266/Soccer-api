import express from 'express'
import cors from 'cors'
import {
  getAllPosts,
  insertPosts,
  getPostById,
  updatePost,
  deletePostById,
} from './db.js'
import {
  logAPiRequest,
  logAPiResponse,
  logError,
} from './log.js'

const app = express()
app.use(cors())

app.use(express.json())

app.get('/posts', async (req, res) => {
  logAPiRequest('GET', '/posts', ' ')
  try {
    const allPosts = await getAllPosts()
    logAPiResponse('GET', '/posts', allPosts)
    return res.status(201).json(allPosts)
  } catch (error) {
    logError(error)
    return res.status(500).json({ error: error.message })
  }
})

app.post('/posts', async (req, res) => {
  logAPiRequest('POST', '/posts', req.body)
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
    logError('Missing required fields')
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
    logAPiResponse('POST', '/posts', result)
    return res.status(201).json(result)
  } catch (error) {
    logError(error)
    return res.status(500).json({ error: error.message })
  }
})

app.get('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)
  logAPiResponse('GET', `/posts/${postId}`, '')
  if (Number.isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }
  try {
    const post = await getPostById(postId)
    if (post) {
      logAPiResponse('GET', '/posts', post)
      return res.status(201).json(post)
    }
    logError('Post not found')
    return res.status(404).json({ error: 'Post not found' })
  } catch (error) {
    logError(error)
    return res.status(500).json({ error: error.message })
  }
})

app.put('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)
  logAPiRequest('PUT', `/posts/${postId}`, req.body)
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
    logError('Missing required fields or invalid ID')
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
      logAPiResponse('PUT', `/posts/${postId}`, result)
      return res.status(200).json({ message: 'Post updated successfully' })
    }
    logError('Post not found')
    return res.status(404).json({ error: 'Post not found' })
  } catch (error) {
    logError(error)
    return res.status(500).json({ error: error.message })
  }
})

app.delete('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)
  logAPiRequest('DELETE', `/posts/${postId}`, req.body)
  if (Number.isNaN(postId)) {
    logError('Invalid post ID')
    return res.status(400).json({ error: 'Invalid post ID' })
  }
  try {
    const result = await deletePostById(postId)
    if (result.affectedRows > 0) {
      logAPiResponse('DELETE', `/posts/${postId}`, result)
      return res.status(204).send()
    }
    logError('Post not found')
    return res.status(404).json({ error: 'Post not found' })
  } catch (error) {
    logError(error)
    return res.status(500).json({ error: error.message })
  }
})

app.use((req, res, next) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
  if (!allowedMethods.includes(req.method)) {
    logError('Method not implemented')
    return res.status(501).json({ error: 'Method not implemented' })
  }
  return next()
})

app.use((req, res) => {
  logError('Endpoint does not exist')
  res.status(404).json({ error: 'Endpoint does not exist' })
})

const port = 22266
app.listen(port, () => {
})
