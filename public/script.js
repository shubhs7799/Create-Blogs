const blogForm = document.getElementById("blogForm");
const blogList = document.getElementById("blogList");
const API = "/blogs";

window.onload = fetchBlogs;

blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const blog = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    content: document.getElementById("content").value,
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });

  blogForm.reset();
  fetchBlogs();
});

async function fetchBlogs() {
  blogList.innerHTML = "Loading...";
  const res = await fetch(API);
  const blogs = await res.json();

  blogList.innerHTML = "";

  blogs.forEach((blog) => {
    const blogEl = document.createElement("div");
    blogEl.className = "blog-card";

    blogEl.innerHTML = `
      <div class="blog-header" onclick="toggleBlog(this)">
        <span class="blog-title">${blog.title}</span>
        <button class="toggle-btn">+</button>
      </div>
      <div class="blog-details hidden">
        <div class="author">Author - <span class="author-name">${blog.author}</span></div>
        <div class="content">${blog.content}</div>

        <div class="comments">
          <div class="comment-title">Comments</div>
          <div class="comment-list" id="comments-${blog.id}">
            ${blog.Comments.map((c) => `
              <div class="comment">
                <span>${c.content}</span>
                <button onclick="deleteComment(${blog.id}, ${c.id})">Delete</button>
              </div>
            `).join("")}
          </div>
          <div class="add-comment">
            <input type="text" placeholder="Write a comment" id="input-${blog.id}" />
            <button onclick="addComment(${blog.id})">➤</button>
          </div>
        </div>
      </div>
    `;

    blogList.appendChild(blogEl);
  });
}

async function addComment(blogId) {
  const input = document.getElementById(`input-${blogId}`);
  const content = input.value.trim();
  if (!content) return;

  await fetch(`${API}/${blogId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  input.value = "";
  fetchBlogs();
}

async function deleteComment(blogId, commentId) {
  await fetch(`${API}/${blogId}/comments/${commentId}`, {
    method: "DELETE",
  });

  fetchBlogs();
}

function toggleBlog(headerElement) {
  const details = headerElement.nextElementSibling;
  const btn = headerElement.querySelector(".toggle-btn");

  if (details.classList.contains("hidden")) {
    details.classList.remove("hidden");
    btn.textContent = "-";
  } else {
    details.classList.add("hidden");
    btn.textContent = "+";
  }
}
