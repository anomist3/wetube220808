import Book from '../models/Book';
import Comment from "../models/Comment";
import Member from "../models/Member";

export const getAddBook = (req, res) => {
  return res.render("addbook", { pageTitle: "새 책 추가하기" });
}

export const postAddBook = async (req, res) => {
  try {
    let {
      body: {
        bookImg, title, author, translator, publisher, hashtags, readCount, wishCount, ISBN, isMeetingDone
      },
    } = req;

    if (isMeetingDone === "false") {
      isMeetingDone = false;
    } else {
      isMeetingDone = true;
    }

    await Book.create({
      bookImg,
      title,
      author,
      translator,
      publisher,
      hashtags: Book.formatHashtags(hashtags),
      readCount,
      wishCount,
      ISBN: parseInt(ISBN),
      // ISBN,
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
    const dbBook = await Book.findById(id).populate("owner").populate("comments");

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

export const registerViews = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    return res.sendStatus(404);
  }

  book.views = book.views + 1;
  await book.save();

  return res.sendStatus(200);
}

export const addComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { member },
  } = req;

  const book = await Book.findById(id).populate("owner").populate("comments");

  if (!book) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: member._id,
    book: id,
  });

  book.comments.push(comment._id);
  book.save();

  return res.status(201).json({ newCommentId: comment._id });
}