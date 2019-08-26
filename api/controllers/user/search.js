module.exports = async function(req, res) {
  console.log(":show list of users");
  const users = await User.find({
    id: { "!=": req.session.userId }
  });

  const currentUser = await User.findOne({ id: req.session.userId }).populate(
    "following"
  );

  //O(n x m)
  // currentUser.following.forEach(f => {
  //     console.log(f.fullName);
  //     users.forEach(u => {
  //         if(f.id == u.id){
  //             u.isFollowing = true
  //         }
  //     })

  // })

  // O(n)
  const followingDictionary = new Object();
  currentUser.following.forEach(f => {
    followingDictionary[f.id] = f;
  });

  users.forEach(u => {
    u.isFollowing = followingDictionary[u.id] != null;
  });

  const sanitizedUsers = users.map(u => {
    return {
      id: u.id,
      fullName: u.fullName,
      emailAddress: u.emailAddress,
      isFollowing: u.isFollowing
    };
  });

  if (req.wantsJSON) {
    return res.send(sanitizedUsers);
  }
  res.view("pages/user/search", {
    layout: "layouts/nav-layout",
    users: sanitizedUsers
  });
};
