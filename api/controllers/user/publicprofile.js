module.exports = async function(req, res) {


    const id = req.param('id')
    const user = await User.findOne({ id: id}).populate('following').populate('follower')
    
    // const posts = await Post.find({user:id}).populate('user')
    const posts = await Post.find({user:id}).sort('createdAt DESC').populate('user')

    console.log(posts);
    user.posts = posts

    const string = JSON.stringify(user)
    const sanitizedUser = JSON.parse(string)
    // console.log(object);


    if (req.wantsJSON) {
        return res.send(sanitizedUser)
    }
    
    
    res.view('pages/user/publicprofile',{
        layout: 'layouts/nav-layout',
        user: sanitizedUser
    })
  };
  