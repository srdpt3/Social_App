module.exports = async function(req, res) {
    console.log("Unfollow " + req.param("id"));
  
    const currentUserId = req.session.userId;
    
    const userIdToUnFollow = req.param("id");
    await User.removeFromCollection(currentUserId, "following", userIdToUnFollow);
  
   await FeedItem.destroy({postOwner:userIdToUnFollow})

    await User.removeFromCollection(userIdToUnFollow, "follower", currentUserId);

    res.end();
  };
  