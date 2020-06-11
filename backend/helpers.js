let activeUsers = []

function userSignIn(name) {
  if (!name) return console.log("Missing name")
  if (name === '') return console.log("Missing name")
  if (name.match(/[^A-Za-z0-9]+/g)) return console.log("Invalid name, use only letters and numbers")
  if (activeUsers.includes(name)) return console.log("Username already taken");

  activeUsers.push(name)
  console.log('This name was added to active users: ', name)
  return true
}

exports.activeUsers = activeUsers;
exports.userSignIn = userSignIn;
