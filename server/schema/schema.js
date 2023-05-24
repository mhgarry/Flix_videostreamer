// const userSchema = require('../models/User');
// const bcrypt = require('bcrypt');
// const { GraphQLLocalStrategy } = require('graphql-passport');

// const {
// 	GraphQLObjectType,
// 	GraphQLID,
// 	GraphQLString,
// 	GraphQLSchema,
// 	GraphQLList,
// 	GraphQLNonNull,
// 	GraphQLEnumType,
// } = require("graphql");


// // const userSchema = require("../models/User");
// // const bcrypt = require('bcrypt');

// // const {
// // 	GraphQLObjectType,
// // 	GraphQLID,
// // 	GraphQLString,
// // 	GraphQLSchema,
// // 	GraphQLList,
// // 	GraphQLNonNull,
// // 	GraphQLEnumType,
// // } = require("graphql");

// // //User Type
// // const UserType = new GraphQLObjectType({
// // 	name: "User",
// // 	fields: () => ({
// // 		id: { type: GraphQLID },
// // 		username: { type: GraphQLString },
// // 		email: { type: GraphQLString },
// // 		password: { type: GraphQLString },
// // 	}),
// // });

// // //Root Query
// // const RootQuery = new GraphQLObjectType({
// // 	name: "RootQueryType",
// // 	fields: {
// // 		user: {
// // 			type: UserType,
// // 			args: {
// // 				_id: { type: GraphQLID },
// // 			},
// // 			resolve(parent, args) {
// // 				return userSchema.findById(args._id);
// // 			},
// // 		},
// // 		users: {
// // 			type: new GraphQLList(UserType),
// // 			resolve(parent, args) {
// // 				return userSchema.find();
// // 			},
// // 		},
// // 	},
// // });

// // //Mutations
// // const Mutation = new GraphQLObjectType({
// // 	name: "Mutation",
// // 	fields: {
// // 		registerUser: {
// // 			type: UserType,
// // 			args: {
// // 				username: { type: GraphQLString },
// // 				email: { type: GraphQLString },
// // 				password: { type: GraphQLString },
// // 			},
// // 			resolve(parent, args) {
// // 				let user = new userSchema({
// // 					username: args.username,
// // 					email: args.email,
// // 					password: args.password,
// // 				});
// // 				return user.save();
// // 			},
// // 		},
// // 		deleteUser: {
// // 			type: UserType,
// // 			args: {
// // 				_id: { type: GraphQLID },
// // 			},
// // 			resolve(parent, args) {
// // 				return userSchema.findByIdAndDelete(args._id);
// // 			},
// // 		},
// // 		updateUser: {
// // 			type: UserType,
// // 			args: {
// // 				_id: { type: GraphQLID },
// // 				username: { type: GraphQLString },
// // 				email: { type: GraphQLString },
// // 				password: { type: GraphQLString },
// // 			},
// // 			resolve(parent, args) {
// // 				return userSchema.findByIdAndUpdate(
// // 					args._id,
// // 					{
// // 						username: args.username,
// // 						email: args.email,
// // 						password: args.password,
// // 					},
// // 					{ new: true }
// // 				);
// // 			},
// // 		},
// // 		loginUser: {
// // 			type: UserType,
// // 			args: {
// // 				email: { type: GraphQLString },
// // 				password: { type: GraphQLString },
// // 			},
// // 			async resolve(parent, args) {
// // 				const user = await userSchema.findOne({ email: args.email });
// // 				if (!user) {
// // 					throw new Error("User does not exist");
// // 				}
// // 				const valid = await bcrypt.compare(args.password, user.password);
// // 				if (!valid) {
// // 					throw new Error("Invalid password");
// // 				}
// // 				return user;
// // 			}
// // 		},
// // 	},

// // });
// // // registerUser: {
// // //   type: UserType,
// // //   args: {
// // //     username: { type: GraphQLString },
// // //     email: { type: GraphQLString },
// // //     password: { type: GraphQLString },
// // //   },
// // //   resolve(parent, args) {
// // //     let user = new userSchema({
// // //       username: args.username,
// // //       email: args.email,
// // //       password: args.password,
// // //     });
// // //     return user.save();
// // //   },
// // // }


// // module.exports = new GraphQLSchema({
// // 	query: RootQuery,
// // 	mutation: Mutation,
// // });
