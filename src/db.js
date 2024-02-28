import conn from './conn.js'

export async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

export async function insertPosts(
  title,
  content,
  featuredTeam,
  featuredPlayer,
  relatedMatch,
  tactics,
  highlightedEvent,
  banner,
) { // Added trailing comma here
  const sql = `
    INSERT INTO blog_posts 
    (title, content, featured_team, featured_player, related_match, tactics, highlighted_event, banner) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  const [rows] = await conn.query(sql, [
    title,
    content,
    featuredTeam,
    featuredPlayer,
    relatedMatch,
    tactics,
    highlightedEvent,
    banner,
  ])
  return rows
}

export async function getPostById(postId) {
  const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId])
  return rows.length > 0 ? rows[0] : null
}

export async function updatePost(
  id,
  title,
  content,
  featuredTeam,
  featuredPlayer,
  relatedMatch,
  tactics,
  highlightedEvent,
  banner,
) { // Added trailing comma here
  const sql = `
    UPDATE blog_posts 
    SET title = ?, content = ?, featured_team = ?, featured_player = ?, related_match = ?, tactics = ?, highlighted_event = ?, banner = ? 
    WHERE id = ?
  `
  const [result] = await conn.query(sql, [
    title,
    content,
    featuredTeam,
    featuredPlayer,
    relatedMatch,
    tactics,
    highlightedEvent,
    banner,
    id,
  ])
  return result
}

export async function deletePostById(postId) {
  const sql = 'DELETE FROM blog_posts WHERE id = ?'
  const [result] = await conn.query(sql, [postId])
  return result
}
