const jwt = require("jsonwebtoken");

const fs = require('fs/promises');

function registerUser(username, password) {
  // Load existing user data from JSON file
  let users;
  try {
    const data = fs.readFileSync('users.json');
    users = JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, initialize users as an empty object
    users = {};
  }

  // Check if the username already exists
  if (users[username]) {
    console.log("Username already exists. Please choose a different username.");
    return;
  }

  // Add new user to the object
  users[username] = { password };

  // Save the updated user data back to the JSON file
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

}

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body; 
    const currentDate = new Date();
    const timeStamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    // Find the highest ID in existing posts
    const highestId = posts.reduce((maxId, post) => (post.id > maxId ? post.id : maxId), 0);
        
    // Generate a new ID by incrementing the highest ID
    const newUserId = highestId + 1;
    const newPost = { id: newUserId, username, password,timeStamp };
    registerUser(username,password);
    res.status(200).send(`User '${username}' registered successfully.`);
  } catch (error) {
    next(error);
  }
};

const userDetail = async (req, res, next) => {
  const username = req.params.username;

  // Load existing user data from JSON file
  try {
    const data = fs.readFileSync('users.json');
    const users = JSON.parse(data);

    // Check if the user exists
    if (users[username]) {
      // Return user details without the password hash
      const userWithoutPassword = { username, ...users[username] };
        delete userWithoutPassword.password;
      return res.json(userWithoutPassword);
    } else {
      return res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    next(error);
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check admin is exist or not
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("Invalid Authentication Credentials"));
    }

    // check admin password is valid or not
    const checkPassword = await admin.isValidPassword(password);
    if (!checkPassword) {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("Invalid Authentication Credentials"));
    }

    // update status admin
    await Admin.updateOne({ email: email }, { $set: { status: "online" } });

    // generate jwt token
    const token = await admin.generateAuthToken();
    res.cookie("jwt", token, {
      //cookie expires in 7 days
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });
    res
      .status(new HTTPResponse200().status)
      .send(new HTTPResponse200("Admin login successfully"));
  } catch (error) {
    next(error);
  }
};


const destroyAuthAdmin = async (req, res, next) => {
  try {
    // check admin is authorized
    if (req.type != "admin") {
      return res
        .status(new HTTPResponse401().status)
        .send(new HTTPResponse401("un authorized access"));
    }
    const admin = await Admin.findOne({ _id: req.adminId });
    admin.tokens = admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await admin.save();
    await Admin.findByIdAndUpdate(
      { _id: req.adminId },
      { $set: { status: "offline" } }
    );
    res.clearCookie("jwt", { httpOnly: true });
    res
      .status(new HTTPResponse200().status)
      .send(new HTTPResponse200("Admin logout successfully"));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getAdmin,
  authAdmin,
  destroyAuthAdmin,
};
