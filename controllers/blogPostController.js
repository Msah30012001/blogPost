const fs = require('fs/promises');
const dataFilePath = 'post.json';


    let posts = [];

/**
 * in createBlogPost Method is responsible for the creating 
 * a new blog post for authorized admin or user
 * 
 *  
 */

    const saveDataToFile = async()=>{
        try {
            await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), 'utf-8');
          } catch (error) {
            console.error('Error writing data to file:', error.message);
          } 
    }

  const createBlogPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const currentDate = new Date();
        const timeStamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
        const authorId = 1;
        // Find the highest ID in existing posts
        const highestId = posts.reduce((maxId, post) => (post.id > maxId ? post.id : maxId), 0);
        
        // Generate a new ID by incrementing the highest ID
        const newPostId = highestId + 1;
        const newPost = { id: newPostId, title, content,authorId,timeStamp };
        posts.push(newPost);
        await saveDataToFile();
        res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  };


/**
 * in readBlogPost Method is responsible for the get all post data 
 * 
 * 
 *  
 */


  const readBlogPost = async (req, res, next) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        posts = JSON.parse(data);
        res.json(posts);
    } catch (error) {
      next(error);
    }
  };


/**
 * in showBlogPost Method is responsible for the read single post using postId 
 * 
 * 
 *  
 */


  const showBlogPost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const post = posts.find(p => p.id === postId);
      
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
      next(error);
    }
  }; 
  
  
  const updateBlogPost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const postIndex = posts.findIndex(p => p.id === postId);

        if (postIndex !== -1) {
            // Update the existing post
            posts[postIndex] = { ...posts[postIndex], ...req.body };

            // Save data to file after updating the post
            await saveDataToFile();

            res.json(posts[postIndex]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
      
    } catch (error) {
      next(error);
    }
  };
  const destroyBlogPost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const postIndex = posts.findIndex(p => p.id === postId);
      
        if (postIndex !== -1) {
          // Remove the post from the array
          const deletedPost = posts.splice(postIndex, 1)[0];
      
          // Save data to file after deleting the post
          await saveDataToFile();
      
          res.json(deletedPost);
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    createBlogPost,
    readBlogPost,
    showBlogPost,
    updateBlogPost,
    destroyBlogPost,
  };
  