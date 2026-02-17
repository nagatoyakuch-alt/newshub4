const API = "/api/articles";

const currentUser = JSON.parse(localStorage.getItem("user"));

// Carregar artigos
async function loadArticles() {
  const res = await fetch(API);
  const articles = await res.json();
  displayArticles(articles);
}

function displayArticles(articles) {
  const container = document.getElementById("articles");
  if (!container) return;
  container.innerHTML = "";

  articles.forEach(article => {
    container.innerHTML += `
      <div class="article-card">
        <h2>${article.title}</h2>
        <img src="${article.image}" />
        <p>${article.content.substring(0, 100)}...</p>
        <a href="article.html?id=${article._id}">Ler mais</a>
      </div>
    `;
  });
}

// Filtrar por categoria
function filterCategory(category) {
  fetch(API)
    .then(res => res.json())
    .then(articles => {
      const filtered = articles.filter(a => a.category === category);
      displayArticles(filtered);
    });
}

loadArticles();

// Comentários
const commentForm = document.getElementById("commentForm");
if (commentForm) {
  commentForm.onsubmit = async (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value;
    if (!message) return;

    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId: new URLSearchParams(window.location.search).get("id"),
        name: currentUser ? currentUser.name : "Visitante",
        message
      })
    });
    alert("Comentário enviado!");
    document.getElementById("message").value = "";
  };
}