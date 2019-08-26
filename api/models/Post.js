module.exports = {

  customToJSON: function(){

    const fromNow = sails.moment(this.createdAt).fromNow()
    this.fromNow = fromNow
    return this 
  },

  attributes: {

    numLikes:{
      type: 'number',
      defaultsTo: 0
    },
    text: {
        type: 'string',
        required: true,
      },
      user:{
          model:'user'
      },
      imageUrl:{
        type:'String',
        defaultsTo:'',
      }
    }
}