import express from 'express';
import { getAllPosts, insertPosts, getPostById,updatePost,deletePostById} from './db.js';  // Importing insertPosts here

const app = express();

// Enabling JSON body parser middleware
app.use(express.json());

app.get('/posts', async (req, res) => {
    const allPosts = await getAllPosts();
    console.log('ALL POSTS', allPosts);
    res.json(allPosts);
});

// Adding a new route for inserting a post
app.post('/posts', async (req, res) => {
    try {
        const { title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner } = req.body;
        const result = await insertPosts(title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner);
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ROute for getting posts by ID
app.get('/posts/:postId', async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); 
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }
        const post = await getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// including the updatePost function 
app.put('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner } = req.body;

        const id = parseInt(postId, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        const result = await updatePost(id, title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// In your main file, add this after your other endpoints
app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); 
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        const result = await deletePostById(postId);
        if (result.affectedRows > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint does not exist' });
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
