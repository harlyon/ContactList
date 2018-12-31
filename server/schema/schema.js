const graphql = require('graphql');
const Name = require('../models/name');
const Country = require('../models/country');

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLNonNull  } = graphql;

const NameType = new GraphQLObjectType({
  name: 'Name',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      phone_number: { type: GraphQLInt },
      countries: {
          type: new GraphQLList(CountryType),
          resolve(parent, args){
              return Country.find({ nameId: parent.id });
          }
      }
  })
});

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      state: { type: GraphQLString },
      suburb: { type: GraphQLString },
      address: { type: GraphQLString },
      city: { type: GraphQLString },
      name: {
          type: NameType,
          resolve(parent, args){
              return Name.findById(parent.nameId);
          }
      }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
      country: {
          type: CountryType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args){
              return Country.findById(args.id);
          }
      },
      name: {
          type: NameType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args){
              return Name.findById(args.id);
          }
      },
      countries: {
          type: new GraphQLList(CountryType),
          resolve(parent, args){
              return Country.find({});
          }
      },
      names: {
          type: new GraphQLList(NameType),
          resolve(parent, args){
              return Name.find({});
          }
      }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addName: {
          type: NameType,
          args: {
            name: { type: GraphQLString },
            phone_number: { type: GraphQLInt },
          },
          resolve(parent, args){
              let name = new Name({
                  name: args.name,
                  phone_number: args.phone_number
              });
              return name.save();
          }
      },
      addCountry: {
          type: CountryType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              state: { type: new GraphQLNonNull(GraphQLString) },
              suburb: { type: new GraphQLNonNull(GraphQLString) },
              address: { type: new GraphQLNonNull(GraphQLString) },
              city: { type: new GraphQLNonNull(GraphQLString) },
              nameId: { type: new GraphQLNonNull(GraphQLID) }
          },
          resolve(parent, args){
              let country = new Country({
                  name: args.name,
                  state: args.state,
                  suburb: args.suburb,
                  address: args.address,
                  city: args.city,
                  nameId: args.nameId
              });
              return country.save();
          }
      }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});