export const addBook = (req, res) => {
  res.render("addbook");
}

export const seeBook = (req, res) => {
  res.render("seebook");
}

export const editBook = (req, res) => {
  res.send("EDIT BOOK");
}

export const deleteBook = (req, res) => {
  res.send("DELETE BOOK");
}