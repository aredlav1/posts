// Fetch method implementation:
async function fetchData(route = "", data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

//user constructor, get and set methods for users
function User(fname, lname, userName, password, dateofbirth) {
  this.fullName = `${fname} ${lname}`;
  this.userName = userName;
  this.password = password;
  this.dateofbirth = dateofbirth;
}
User.prototype.getFullName = function () {
  return this.fullName;
};
User.prototype.getUserName = function () {
  return this.userName;
};
User.prototype.getPassword = function () {
  return this.password;
};
User.prototype.getDateofbirth = function () {
  return this.dateofbirth;
};

User.prototype.setFullName = function (newFullName) {
  this.fullName = newFullName;
};
User.prototype.setUserName = function (newUserName) {
  this.userName = newUserName;
};
User.prototype.setPassword = function (newPassword) {
  this.password = newPassword;
};
User.prototype.setDateofbirth = function (newDateofbirth) {
  this.dateofbirth = newDateofbirth;
};

//Post constructor,  get and set methods for post
function Post(post) {
  this.postContent = post;
}
Post.prototype.getPostContent = function () {
  return this.postContent;
};

Post.prototype.getPostContent = function (newPost) {
  this.postContent = newPost;
};

// Login functionality
const login = document.getElementById("loginForm");
if (login) login.addEventListener("submit", loginPageFunction);
function loginPageFunction(e) {
  e.preventDefault();
  let uname = document.getElementById("username").value;
  let pword = document.getElementById("password").value;
  const user = new User("", "", uname, pword);
  console.log(user);
  console.log(fetchData("/user/login", user, "POST"));
  fetchData("/user/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "post.html";
    })
    .catch((err) => {
      let p = document.querySelector(".error");
      p.innerHTML = err.message;
      console.log(`Error!!! ${err.message}`);
    });

  document.getElementById("loginForm").reset();
}

//Register functionality
const register = document.getElementById("registerForm");
if (register) register.addEventListener("submit", registerPageFunction);
function registerPageFunction(e) {
  e.preventDefault();
  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let userName = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let dateofbirth = document.getElementById("dateofbirth").value;

  const user = new User(firstName, lastName, userName, password, dateofbirth);
  console.log(user);
  fetchData("/user/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "post.html";
    })
    .catch((err) => {
      let p = document.querySelector(".error");
      p.innerHTML = err.message;
      console.log(err);
    });
  document.getElementById("registerForm").reset();
}

//Post Functionality
const post = document.getElementById("postForm");
if (post) post.addEventListener("submit", postPageFunction);
function postPageFunction(e) {
  e.preventDefault();

  let posts = document.getElementById("post").value;
  let post = new Post(posts);
  let user = getCurrentUser();
  post.userID = user.userID;
  console.log(post);
  //getPost()
  fetchData("/post/create", post, "POST")
    .then((data) => {
      window.location.href = "post.html";
    })
    .catch((err) => {
      let p = document.querySelector(".error");
      p.innerHTML = err.message;
      console.log(err);
    });
  document.getElementById("postForm").reset();
}

// logout event listener
let logout = document.getElementById("Logout");
if (logout) logout.addEventListener("click", removeCurrentUser);

// stateful mechanism for user
// setting up current user in local storage
function setCurrentUser(user) {
  console.log("adding ${user} to local storage");
  localStorage.setItem("user", JSON.stringify(user));
}

// getting current user function
// FIX this next class
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// logout function for current user
function removeCurrentUser() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function getPosts() {
  let user = getCurrentUser();
  fetchData("/post/", user, "POST")
    .then((data) => {
      let ul = document.getElementById("postsList");
      //console.log(data)
      data.forEach((post) => {
        let li = document.createElement("li");
        let text = document.createTextNode(post.postContent);
        li.appendChild(text);
        ul.appendChild(li);
      });
    })
    .catch((err) => console.log(`Error! ${err}`));
}

const getUsersBtn = document.getElementById("getUsersBtn");

getUsersBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/users");
    const users = await res.json();
    console.log(users);
  } catch (err) {
    console.error(err);
  }
});
