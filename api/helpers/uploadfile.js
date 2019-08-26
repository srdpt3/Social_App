module.exports = {

  friendlyName: 'Uploadfile',
  description: 'Uploadfile something.',
  inputs: {
    file:{
      type:'ref',
      description:"upload file to AWS S3"
    }

  },


  exits: {
    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs, exits) {
    console.log("Trying to upload file with helper method");
    const file = inputs.file

    const options = {
      // This is the usual stuff
      adapter: require("skipper-better-s3"),
      key: "AKIAIBBXPZGRRFLUC3KA",
      secret: "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",
      bucket: "fullstack-social",
      s3params: { ACL: "public-read" }
      // And while we are at it, let's monitor the progress of this upload
    };


    file.upload(options, async (err, files) => {
      if (err) {
        return res.serverError(err.toString());
      }
  
      const fileUrl = files[0].extra.Location;
      return exits.success(fileUrl)
  
      res.end();
    });
  }


};

