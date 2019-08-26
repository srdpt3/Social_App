module.exports = async function(req, res) {
  console.log("following " + req.param("id"));

  const currentUserId = req.session.userId;
  console.log("asdfasdfa" + req);
  
  const userIdToFollow = req.param("id");
  await User.addToCollection(currentUserId, "following", userIdToFollow);


  const postsForUserImFollowing = await Post.find({user: userIdToFollow})
  postsForUserImFollowing.forEach(async p => {
      await FeedItem.create({
          post: p.id,
          postOwner: userIdToFollow,
          user: currentUserId,
          postCreatedAt: p.createdAt
      })
      console.log("Finished creating feed item")
  })
  await User.addToCollection(userIdToFollow , "follower", currentUserId);


  res.end();
};
