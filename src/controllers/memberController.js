// globalRouter
export const join = (req, res) => {
  res.send("JOIN");
}

export const login = (req, res) => {
  res.send("LOGIN");
}

// memberRouter 
export const addMember = (req, res) => {
  res.render("addmember");
}

export const seeMember = (req, res) => {
  res.render("seemember");
}

export const logout = (req, res) => {
  res.send("LOG OUT");
}

export const editMember = (req, res) => {
  res.send("Edit Member");
}

export const deleteMember = (req, res) => {
  res.send("Delete Member");
}