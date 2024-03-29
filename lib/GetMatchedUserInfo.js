export default function GetMatchedUserInfo(users, userLoggedInID) {
  const newUsers = { ...users };
  delete newUsers[userLoggedInID];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
}
