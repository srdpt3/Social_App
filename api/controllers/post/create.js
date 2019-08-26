module.exports = async function(req, res) {
  const postBody = req.body.postBody;
  console.log("create post object:   " + postBody);
  const file = req.file("imagefile");
  console.log("file name is" + file);
  const options = {
    // This is the usual stuff
    adapter: require("skipper-better-s3"),
    key: "AKIAIBBXPZGRRFLUC3KA",
    secret: "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",
    bucket: "fullstack-social",
    s3params: { ACL: "public-read" },
    // And while we are at it, let's monitor the progress of this upload
    onProgress: progress => sails.log.verbose("Upload progress:", progress)
  };

  file.upload(options, async (err, files) => {
    if (err) {
      return res.serverError(err.toString());
    }

    //success
    // res.send(files);
    const fileUrl = files[0].extra.Location;
    const userId = req.session.userId;
    const postRecord = await Post.create({
      text: postBody,
      user: userId,
      imageUrl: fileUrl
    }).fetch();

    await FeedItem.create({
      post: postRecord.id,
      postOwner: userId,
      user: userId,
      postCreatedAt: postRecord.createdAt
    });

    // I'm now going to insert a FeedItem for all of my followers
    const user = await User.findOne({ id: userId }).populate("follower");
    user.follower.forEach(async f => {
      console.log(f.fullName);
      await FeedItem.create({
        post: postRecord.id,
        postOwner: userId,
        user: f.id,
        postCreatedAt: postRecord.createdAt
      });
    });

    res.end();
    // res.send(fileUrl)

    // ... Continue as usual
  });

  // file.upload({
  //     adapter: require('skipper-s3'),
  //     key: 'AKIAIBBXPZGRRFLUC3KA',
  //     secret: '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',
  //     bucket: 'fullstack-social'
  //   }, function (err, filesUploaded) {
  //     if (err) return res.serverError(err);
  //     return res.ok({
  //       files: filesUploaded,
  //       textParams: req.allParams()
  //     });
  //   });

  //   return res.end();
  //Waterline create syntax

  //   // res.send(record)
  //
};
