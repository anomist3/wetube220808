// globalRouter

export const showMeetings = (req, res) => {
  res.render("home");
}

// meetingRouter

export const addMeeting = (req, res) => {
  res.render("addmeeting");
}

export const editMeeting = (req, res) => {
  res.render("editmeeting");
}

export const deleteMeeting = (req, res) => {
  res.render("deletemeeting");
}