import Book from '../models/Book.js';

export const getAddBook = (req, res) => {

  return res.render("addbook", { pageTitle: "Add New" });
}

export const postAddBook = async (req, res) => {
  try {
    const { bookImg, title, author, translator, publisher, hashtags } = req.body;
    console.log(req.body);

    await Book.create({
      bookImg,
      title,
      author,
      translator,
      publisher,
      hashtags: hashtags.split(",").map(word => `#${word}`),
      meta: {
        readCount: 0,
        wishCount: 0,
        isMeetingDone: false,
        comments: [],
        createdAt: new Date.now,
      }
    });

    return res.redirect("/");
  } catch (error) {
    return res.render("addbook", {
      pageTitle: "Add Book", errorMessage: error._message
    });
  }

}

export const getSeeBook = async (req, res) => {
  const { id } = req.params;
  const dbBook = await Book.findOne({ _id: id });

  if (!dbBook) {

    return res.render("404", { pageTitle: "Book Not Found." });
  }

  return res.render("seebook", { pageTitle: `${dbBook.title}`, dbBook });
}

export const getEditBook = async (req, res) => {
  const { id } = req.params;
  const dbBook = await Book.findById(id);

  if (!dbBook) {

    return res.render("404", { pageTitle: "Book Not Found." });
  }

  return res.render("editbook", { pageTitle: dbBook.title, dbBook });
}

export const postEditBook = async (req, res) => {
  const { id } = req.params;
  const { bookImg, title, author, translator, publisher, hashtags, isMeetingDone, wishCount } = req.body;
  const dbBook = await Book.findById(id);

  if (!dbBook) {
    return res.render("404", { pageTitle: "Book Not Found." });
  }

  await Book.findByIdAndUpdate(id, {
    title,
    author,
    translator,
    publisher,
    hashtags: hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
    isMeetingDone,
    wishCount
  })

  return res.redirect(`/books/${id}`);
}

export const deleteBook = (req, res) => {
  return res.send("DELETE BOOK");
}

