getPosts();

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

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

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
