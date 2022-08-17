import Book from "../models/Book.js";
import Member from "../models/Member.js";
import Meeting from "../models/Meeting.js";

// globalRouter

export const showDashboard = async (req, res) => {
  try {
    const books = await Book.find({});
    const members = await Member.find({});
    const meetings = await Meeting.find({});

    return res.render("home", { pageTitle: "Home", meetings, books, members });
  } catch {
    return res.render("404", { pageTitle: "고장났어요..." });
  }
}

// meetingRouter

export const getAddMeeting = async (req, res) => {
  const members = await Member.find({});

  return res.render("add-meeting", { pageTitle: "토론 추가하기", members });
}

export const postAddMeeting = async (req, res) => {
  const members = await Member.find({});
  const books = await Book.find({});

  let nicknamesDB = [];

  members.forEach(member => { nicknamesDB.push(member.nickname) });
  const participants = nicknamesDB.filter((nickname) => nickname in req.body);

  let {
    session: {
      member: { _id },
    },
    body: { bookTitle,
      bookAuthor,
      bookTranslator,
      bookPublisher,
      leader,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      hashtags,
      isMeetingDone,
      date,
    }
  } = req;

  if (isMeetingDone === "false") {
    isMeetingDone = false;
  } else {
    isMeetingDone = true;
  }

  const relatedBook = await Book.findOne({ title: bookTitle });

  await Meeting.create({
    leader,
    bookTitle,
    bookAuthor,
    bookTranslator,
    bookPublisher,
    questions: [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
    ],
    hashtags: Meeting.formatHashtags(hashtags),
    participants,
    isMeetingDone,
    date,
    owner: _id,
  });

  return res.redirect("/");
}

export const getEditMeeting = async (req, res) => {
  const { id } = req.params;
  const {
    locals: {
      loggedInMember: { _id }
    }
  } = res;

  const meeting = await Meeting.findById(id);
  const members = await Member.find({});

  return res.render("edit-meeting", { pageTitle: "토론 수정하기", meeting, members, _id, id });
}

export const postEditMeeting = async (req, res) => {
  const members = await Member.find({});
  let nicknamesDB = [];

  members.forEach(member => { nicknamesDB.push(member.nickname) });
  const participants = nicknamesDB.filter((nickname) => nickname in req.body);

  const {
    params: { id },
    body: {
      bookTitle,
      bookAuthor,
      leader,
      bookTranslator,
      bookPublisher,
      hashtags,
      isMeetingDone,
    }
  } = req;

  await Meeting.findByIdAndUpdate(id, {
    bookTitle,
    bookAuthor,
    leader,
    bookTranslator,
    bookPublisher,
    hashtags: Meeting.formatHashtags(hashtags),
    isMeetingDone,
    participants
  });

  return res.redirect("/");
}

export const deleteMeeting = (req, res) => {

  return res.redirect("/");
}