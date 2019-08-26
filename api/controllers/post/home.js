module.exports = async function(req, res) {
  const userId = req.session.userId
  // const allPosts = await Post.find({user: userId})
  //     .populate('user')
  //     .sort('createdAt DESC')


  const allPosts = []

  const feedItems = await FeedItem.find({user: userId})
      .sort('postCreatedAt DESC')
      .populate('post')
      .populate('postOwner')

  feedItems.forEach(fi => {
      // console.log(fi.postOwner)
      if(fi.post){
        fi.post.user = fi.postOwner 
        fi.canDelete = fi.post.user.id==req.session.userId
        fi.post.hasLiked = fi.hasLiked
        // fi.post.numLikes = 5
        allPosts.push(fi.post)
      }

  })

  allPosts.forEach(p => p.canDelete = true)


  if (req.wantsJSON) {
      return res.send(allPosts)
  }


  // JSON stringify and parse
  const string = JSON.stringify(allPosts)
  const objects = JSON.parse(string)
  // console.log(objects)

  res.view('pages/post/home', {
      allPosts: objects,
      layout: 'layouts/nav-layout'
  })
}