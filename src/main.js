import express from 'express';
import { getAllPosts, insertPosts, getPostById,updatePost,deletePostById} from './db.js'; 

const app = express();

// Enabling JSON body parser middleware
app.use(express.json());

//get post function
app.get('/posts', async (req, res) => {
    const allPosts = await getAllPosts();
    console.log('ALL POSTS', allPosts);
    res.json(allPosts);
});

// adding a post function
app.post('/posts', async (req, res) => {
    const { title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner } = req.body;

    
    if (!title || !content || !featuredTeam || !featuredPlayer || !relatedMatch || !tactics || !highlightedEvent || !banner) {
        return res.status(400).json({ error: 'Wrong format. Use the correct format.' });
    }

    try {
        const result = await insertPosts(title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// getting post by id function
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

// put a post function
app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner } = req.body;

    
    if (isNaN(parseInt(postId, 10)) || !title || !content || !featuredTeam || !featuredPlayer || !relatedMatch || !tactics || !highlightedEvent || !banner) {
        return res.status(400).json({ error: 'Wrong format. Use the correct format.' });
    }

    try {
        const result = await updatePost(postId, title, content, featuredTeam, featuredPlayer, relatedMatch, tactics, highlightedEvent, banner);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete a post
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

//Manejo de errores
app.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(req.method)) {
        return res.status(501).json({ error: "Método no implementado" });
    }
    next();
});

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint does not exist' });
});



const port = 5000;
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
