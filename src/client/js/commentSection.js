const bookContainer = document.getElementById("bookContainer");
const form = document.getElementById("commentForm");

const addComment = (textInput, id) => {
  const bookComments = document.querySelector(".book__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  const text = document.createElement("span");
  const delBtn = document.createElement("span");
  newComment.className = "book__comment";
  newComment.dataset.id = id;
  icon.className = "fas fa-comment";
  text.innerText = ` ${textInput}`;
  delBtn.innerText = "X";
  newComment.appendChild(icon);
  newComment.appendChild(text);
  newComment.appendChild(delBtn);
  bookComments.prepend(newComment);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const bookId = bookContainer.dataset.id;

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/books/${bookId}/add-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}