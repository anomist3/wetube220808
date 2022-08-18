import Book from '../models/Book.js';

export const getAddBook = (req, res) => {
  return res.render("addbook", { pageTitle: "새 책 추가하기" });
}

export const postAddBook = async (req, res) => {
  try {
    const { body: {
      bookImg, title, author, translator, publisher, hashtags, readCount, wishCount, ISBN, isMeetingDone },
      file: { path: videoUrl },
    } = req;

    if (isMeetingDone === "false") {
      isMeetingDone = false;
    } else {
      isMeetingDone = true;
    }

    await Book.create({
      videoUrl,
      bookImg,
      title,
      author,
      translator,
      publisher,
      hashtags: Book.formatHashtags(hashtags),
      readCount,
      wishCount,
      ISBN: parseInt(ISBN),
      isMeetingDone
    });

    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("addbook", {
      pageTitle: "새 책 추가하기", errorMessage: error._message
    });
  }

}

export const getSeeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const dbBook = await Book.findById(id);

    return res.render("seebook", { pageTitle: `${dbBook.title}`, dbBook });
  } catch (error) {

    return res.status(400).render("404", { pageTitle: "Book Not Found." });
  }
}

export const searchBook = async (req, res) => {
  const { keyword } = req.query;
  let searchedBooks = [];

  if (keyword) {
    const searchedBooks = await Book.find({
      $or: [
        {
          title:
          {
            $regex: new RegExp(keyword, "i"),
          }
        },
        {
          author:
          {
            $regex: new RegExp(keyword, "i"),
          }
        },
        {
          translator: keyword
        },
        {
          publisher: keyword
        },
        {
          hashtags: keyword
        },
      ]
    });

    return res.render("searchbook", { pageTitle: "책 찾아보기", searchedBooks, keyword });
  }

  res.render("searchbook", { pageTitle: "책 찾아보기", searchedBooks });
}

export const getEditBook = async (req, res) => {
  const { id } = req.params;
  const dbBook = await Book.findById(id);

  if (!dbBook) {

    return res.status(400).render("404", { pageTitle: "Book Not Found." });
  }

  return res.render("editbook", { pageTitle: dbBook.title, dbBook });
}

export const postEditBook = async (req, res) => {
  const {
    params: { id },
    body: { bookImg, title, author, translator, publisher, hashtags, isMeetingDone, wishCount, ISBN },
  } = req;
  const dbBook = await Book.exists({ _id: id });

  if (!dbBook) {
    return res.status(404).render("404", { pageTitle: "Book Not Found." });
  }

  await Book.findByIdAndUpdate(id, {
    title,
    author,
    translator,
    publisher,
    hashtags: [...Book.formatHashtags(hashtags)],
    isMeetingDone: isMeetingDone === "완료" ? true : false,
    wishCount,
    bookImg,
    ISBN
  });

  return res.redirect(`/books/${id}`);
}

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await Book.findByIdAndDelete(id);
  }

  return res.redirect("/");
}

