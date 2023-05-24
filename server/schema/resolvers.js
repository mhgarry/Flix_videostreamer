const User = require('../models/User');
const Video = require('../models/Video');
const passport = require('passport');
const { GraphQLLocalStrategy } = require('graphql-passport');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user by ID");
      }
    },
    getAllVideos: async () => {
      try {
        const videos = await Video.find()
        return videos;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch all videos");
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },
		loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        return { user, token };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to login user");
      }
    },

    logoutUser: (_, __, { req }) => {
      // Clear the session and remove the JWT token
      req.logout();
      return true;
    },
    favoriteVideo: async (_, { id }) => {
      try {
        const video = await Video.findById(id);
        if (!video) {
          throw new Error("Video not found");
        }
        video.likes += 1;
        await video.save();
        return video;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to favorite video");
      }
    },
    deleteFavorite: async (_, { userId, videoId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        const index = user.favorites.indexOf(videoId);
        if (index === -1) {
          throw new Error("Video not found in favorites");
        }
        user.favorites.splice(index, 1);
        await user.save();
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete favorite");
      }
    },
    updateFavorites: async (_, { userId, videoIds }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        user.favorites = videoIds;
        await user.save();
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update favorites");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user");
      }
    },
    updateUser: async (_, { id, username, email, password }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { username, email, password },
          { new: true }
        );
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
    },
  },
};


passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = resolvers;
