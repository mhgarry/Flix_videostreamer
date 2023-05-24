const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Query {
		getUserById(id: ID!): User!
		getUserByUserName(username: String!): User!
		getUserByEmail(email: String!): User!
		getAllUsers: [User!]!
		getAllVideos: [Video!]!
	}

	type Mutation {
		createUser(username: String!, email: String!, password: String!, repeatPassword: String!): User
		loginUser(email: String!, password: String!): AuthPayload
		logoutUser: Boolean
		updateUser(id: ID!, username: String!, email: String!, password: String!, repeatPassword: String!): User
		deleteUser(id: ID!): Boolean
		favoriteVideo(userId: ID!, videoId: ID!): User
		updateFavorite(userId: ID!, videoId: [ID!]!): User
		deleteFavorite(id: ID!): User
	}

	type User {
		id: ID!
		username: String!
		email: String!
		favorites: [Video!]!
	}

	type Video {
		id: ID!
		title: String!
		likes: Int!
	}

	type AuthPayload {
		user: User
		token: String
	}
`;

module.exports = typeDefs;
