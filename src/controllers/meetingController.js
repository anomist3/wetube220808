import Book from "../models/Book.js";
import Member from "../models/Member.js";

// globalRouter

export const showDashboard = async (req, res) => {
  try {
    const dbBooks = await Book.find({});
    const dbMembers = await Member.find({});

    return res.render("home", { pageTitle: "Home", dbBooks, dbMembers });
  } catch {
    return res.send(error);
  }
}

// meetingRouter

export const addMeeting = (req, res) => {
  return res.render("addmeeting");
}

export const editMeeting = (req, res) => {
  return res.render("editmeeting");
}

export const deleteMeeting = (req, res) => {
  return res.render("deletemeeting");
}