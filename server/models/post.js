const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS posts ( 
        postID INT NOT NULL AUTO_INCREMENT,
        postContent VARCHAR(255),
        userID INT,
        CONSTRAINT posts_pk PRIMARY KEY (postID),
        CONSTRAINT posts_fk FOREIGN KEY (userID) REFERENCES users(userID)
    )`;
  await con.query(sql);
}
createTable();

//get all posts
async function getAllPosts() {
  //console.log("posts from models function getposts")
  const sql = `SELECT * FROM posts`;
  let posts = await con.query(sql);
  //console.log(posts)
  return posts;
}

//create posts
async function createPost(post) {
  const sql = `INSERT INTO posts(postContent,userID) VALUES ("${post.postContent}",${post.userID});`;
  await con.query(sql);
}
//read posts
async function fetch(post) {
  let cpost = await getpost(post);
  if (!cpost[0]) throw Error("post not found");
  return cpost[0];
}

//update post
async function editPost(post) {
  let sql = `UPDATE posts
      SET postContent = "${post.postContent}"
      Where postID = ${post.postID};
    `;
  await con.query(sql);
  let updatedpost = await getpost(post);
  return updatedpost[0];
}
//Delete post
async function deletePost(post) {
  let sql = `DELETE FROM posts
    WHERE postID = ${post.postID}`;
  await con.query(sql);
}

//Useful functions
async function getPost(post) {
  let sql;
  if (post.userID) {
    sql = `SELECT * FROM posts
        WHERE userID = ${post.userID}`;
  } else {
    sql = `
        SELECT * FROM posts 
          WHERE postID = "${post.postID}"
      `;
  }
  return await con.query(sql);
}

module.exports = { createPost, getAllPosts, getPost };
