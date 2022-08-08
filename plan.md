<routers>

/
/add/
/:id/
/:id/edit/
/:id/delete/
/join/ ?
/login/ ?
/search/ ?

/members/:id/
/members/:id/edit/
/members/:id/delete/

/books/
/books/add/
/books/:id/
/books/:id/edit/
/books/:id/delete/

<controllers>

/memberController/ => addMember, editMember, deleteMember
/bookController/ => addBook, editBook, deleteBook
/meetingController/ => addMeeting, editMeeting, deleteMeeting
