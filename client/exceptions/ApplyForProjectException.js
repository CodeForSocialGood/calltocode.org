function ApplyForProjectException (userResponseStatus, oppResponseStatus) {
  this.name = 'ApplyForProjectException'
  this.message =
  `Failed to apply for project. Update user response status: ${userResponseStatus}. Get opp response status: ${oppResponseStatus}`
}

export default ApplyForProjectException
