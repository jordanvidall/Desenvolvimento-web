const btn = document.querySelector("#btn");
const campo = document.querySelector("#userId");
const msg = document.querySelector("#msg");
const lista = document.querySelector("#lista");

btn.addEventListener("click", buscar);
async function buscar() {
  const id = Number(campo.value);
  lista.innerHTML = "";

  if (campo.value == "" || !Number.isInteger(id) || id < 1 || id > 10) {
    msg.textContent = "Digite um ID de 1 a 10.";
    return;
  }

  msg.textContent = "Carregando...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id);
    if (!res.ok) throw new Error();
    const posts = await res.json();

    if (posts.length == 0) {
      msg.textContent = "Nenhuma publicação encontrada.";
      return;
    }

    posts.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      const titulo = document.createElement("h2");
      titulo.textContent = p.title;
      const texto = document.createElement("p");
      texto.textContent = p.body;
      card.append(titulo, texto);
      lista.appendChild(card);
    });

    msg.textContent = posts.length + " publicações encontradas.";
  } catch {
    msg.textContent = "Erro ao carregar as publicações. Tente novamente.";
  }
}