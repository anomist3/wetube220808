const bookMixinTitle = document.querySelector(".book-mixin__title");

const handleClick = () => {
  const { id } = bookMixinTitle.dataset;
  fetch(`/api/books/${id}/views`, {
    method: "POST",
  });
}

bookMixinTitle.addEventListener("click", handleClick);