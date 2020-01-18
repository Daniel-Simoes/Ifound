const axios = require('axios');
const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(request, response) {
        const users = await User.find();

        return response.json(users);
    },





    async store(request, response) {
        const { github_username, techs, latitude, longitude} = request.body;

let user = await User.findOne({github_username});

if (!user) {

    const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
    
    const { name = login, avatar_url, bio  } = apiResponse.data;
    
    const techsArray = parseStringAsArray (techs);
    
    const location = {
        type:'Point',
        coordinates:[longitude, latitude],
    };
    
    user = await User.create({
        github_username,
        name, 
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })

}


    
    
        return response.json(user);
    }
};