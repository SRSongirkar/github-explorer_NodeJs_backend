const axios = require("axios");
const User = require("../models/User");

exports.saveUser = async (req, res) => {
  const { username } = req.params;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const userData = response.data;

      user = new User({
        username: userData.login,
        id: userData.id,
        avatar_url: userData.avatar_url,
        type: userData.type,
        name: userData.name,
        company: userData.company,
        blog: userData.blog,
        location: userData.location,
        email: userData.email,
        bio: userData.bio,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      });

      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findMutualFollowers = async (req, res) => {
  const { username } = req.params;

  try {
    const followersResponse = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const followers = followersResponse.data.map((follower) => follower.login);

    const followingResponse = await axios.get(
      `https://api.github.com/users/${username}/following`
    );
    const following = followingResponse.data.map((followee) => followee.login);

    const mutualFollowers = followers.filter((follower) =>
      following.includes(follower)
    );

    res.json(mutualFollowers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.searchUsers = async (req, res) => {
  const { username, location } = req.query;

  try {
    let query = {};

    if (username) {
      query.username = new RegExp(username, "i");
    }

    if (location) {
      query.location = new RegExp(location, "i");
    }

    const users = await User.find(query);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { deleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
