import Member from "../models/Member.js";
import bcrypt from "bcrypt";
import fetch from 'node-fetch';
import Meeting from '../models/Meeting.js';

// globalRouter
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "세계고전문학 모임에 오신 것을 환영합니다!" });
}

export const postJoin = async (req, res) => {
  const { nickname, password, password2, email, location } = req.body;
  const pageTitle = "회원 등록";
  const isPasswordValid = password == password2;

  if (!isPasswordValid) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "암호가 서로 일치하지 않습니다.",
    })
  }

  const nicknameExists = await Member.exists({ nickname });

  if (nicknameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 등록된 이름입니다.",
    });
  }

  // const emailExists = await Member.exists({ email });

  // if (emailExists) {
  //   return res.status(400).render("join", {
  //     pageTitle,
  //     errorMessage: "이미 등록된 이메일입니다."
  //   });
  // }

  try {
    await Member.create(
      {
        nickname,
        password,
        email,
        socialOnly: false,
        location,
        since: Date.now(),
        photoUrl: "",
      }
    );
  } catch (error) {
    return res.status(400).render("404", { pageTitle: "로그인 실패 ㅠㅠ", errorMessage: `로그인 오류가 발생했습니다. ${error}` });
  }

  res.redirect("/login");
}

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "로그인" });
}
export const postLogin = async (req, res) => {
  const { nickname, password } = req.body;
  const member = await Member.findOne({ nickname, socialOnly: false });

  if (!member) {
    return res.status(400).render("login", { pageTitle: "로그인", errorMessage: "등록된 이름이 아닙니다." });
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, member.password);

    req.session.loggedIn = true;
    req.session.member = member;

    if (!isPasswordValid) {
      return res.status(400).render("login", {
        pageTitle: "로그인", errorMessage: "암호가 일치하지 않습니다."
      });
    }

  } catch (error) {
    res.status(400).redirect("/login", {
      pageTitle: "로그인", errorMessage: "로그인 오류"
    });
  }

  return res.redirect("/");
}

export const startGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "user:email",
  }
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  }
  const baseUrl = "https://github.com/login/oauth/access_token";
  const params = new URLSearchParams(config).toString();
  const fullUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(fullUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const memberData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`
        },
      })
    ).json();
    const emailObj = emailData.find(email => email.primary === true && email.verified === true);

    if (!emailObj) {
      return res.redirect("/login");
    }

    let member = await Member.findOne({ email: emailObj.email });

    if (!member) {
      member = await Member.create({
        nickname: memberData.name ? memberData.name : memberData.login,
        password: "",
        email: emailObj.email,
        location: memberData.location,
        socialOnly: true,
        avatarUrl: memberData.avatar_url,
        since: Date.now(),
      });
    }

    req.session.loggedIn = true;
    req.session.member = member;

    return res.redirect("/");

  } else {
    return res.redirect("/login");
  }
}

// memberRouter 
export const addMember = (req, res) => {
  res.render("addmember", { pageTitle: "회원 추가" });
}

export const seeMember = async (req, res) => {

  res.render("seemember", { pageTitle: "회원 보기" });
}

export const logout = (req, res) => {
  req.session.destroy();

  res.redirect("/");
}

export const editMember = (req, res) => {
  res.send("Edit Member");
}

export const deleteMember = (req, res) => {
  res.send("Delete Member");
}

export const getMyProfile = (req, res) => {
  const { member } = req.session;

  return res.render("my-profile", { pageTitle: "나의 프로필", member });
}

export const postMyProfile = async (req, res) => {
  const {
    session: {
      member: { _id, photoUrl },
    },
    body: { nickname, email, location },
    file,
  } = req;

  const updatedMember = await (
    Member.findByIdAndUpdate(_id, {
      nickname,
      email,
      location,
      photoUrl: file ? file.path : photoUrl,
    }, { new: true })
  );

  req.session.member = updatedMember;

  res.redirect(`/members/profile/${_id}`);
}

export const getChangePassword = (req, res) => {
  // FIXME:  if (req.session.member.socialOnly === true) {
  //     return res.redirect("/");
  //   }
  return res.render("change-password", { pageTitle: "암호 변경" });
}

export const postChangePassword = async (req, res) => {
  const {
    session: {
      member: { _id, password },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;

  const isOldPasswordValid = await (bcrypt.compare(oldPassword, password));

  if (!isOldPasswordValid) {
    return res.render("change-password", { pageTitle: "암호 변경", errorMessage: "기존 비밀번호를 다시 입력해 주세요." });
  }

  const isNewPasswordValid = newPassword == newPassword2;

  if (!isNewPasswordValid) {
    return res.status(400).render("change-password",
      {
        pageTitle: "암호 변경",
        errorMessage: "암호가 서로 일치하지 않습니다. 다시 시도해 주세요.",
      });
  }

  const member = await Member.findById(_id);

  member.password = newPassword;
  await member.save();

  return res.redirect(`/members/profile/${_id}`);
}

export const getSeeOtherMemberProfile = async (req, res) => {
  const { id } = req.params;
  const member = await Member.findById(id);
  const meetings = await Meeting.find({});

  let participatedMeetings = [];
  meetings.forEach(meeting => {
    if (meeting.participants.includes(member.nickname)) {
      participatedMeetings.push(meeting);
    }
  });

  if (!member) {
    return res.status(404).render("404", { pageTitle: "등록되지 않은 회원입니다." });
  }

  return res.render("see-other-member", { pageTitle: `${member.nickname}님의 프로필`, member, participatedMeetings });
}