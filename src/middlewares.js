import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "World Classic Book Club";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInMember = req.session.member || {};
  return next();
}

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }

  return res.redirect("/login");

}

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  }

  return res.redirect("/");
}

export const uploadPhoto = multer({
  dest: "uploads/photos/",
  limits: {
    fileSize: 3000000,
  }
});

export const uploadVideo = multer({
  dest: "uploads/videos/",
  fileSize: 1000000000,
});