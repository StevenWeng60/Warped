const { User } = require('../Schemas/User.js');
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
  try{
    // Check to see if username already exists in the database
    const user = await User.findOne().where({username: req.body.username})

    // if not then create an account
    if (user !== null) {
      res.status(200).send("Username taken");
    }
    else {
      try{
        // Create a hashedpassword for encryption generating 10 salts
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        User.create({username: req.body.username, password: hashedPassword});
        res.status(200).send("created user");
      }
      catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
      }
    }
  } catch (e){
    console.log(e.message);
  }
}

const userLogin = async (req, res) => {
  const user = await User.findOne().where({username: req.body.username})
  if (user === null) {
    res.status(400).send('Cannot find user')
  }
  else {
    try{
      console.log(user)
      if(await bcrypt.compare(req.body.password, user.password)){
        res.send('Success')
      }
      else {
        res.send('Not allowed')
      }
    }
    catch {
      res.status(500).send()
    }
  }
}

module.exports = {createUser, userLogin}