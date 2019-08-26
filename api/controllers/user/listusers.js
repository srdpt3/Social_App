module.exports =  async function(req, res) {
    //fetch all users using waterline

    const users = await User.find({});


    // const obj = [];
    // users.forEach(users => {
    //     obj.push({id:users.id, fullName:users.fullName, email:users.email})
        
    // });
    res.send(users)
    
};
