const User = require('./models/User');
const Institute = require('./models/Institute')
const Kind = require('graphql/language')
const { GraphQLScalarType }= require('graphql')
const dayjs = require('dayjs')

const userDB=
[{id:"2",first_name: "pasdad",birth_date: new Date()},{id:"3",first_name: "qwedas",birth_date: new Date()},
{id:"4",first_name: "adsas",birth_date: new Date()},{id:"5",first_name: "adewger",birth_date: new Date()}]

const resolvers = {
    Query: {
      users: () =>{
        return User.find({},function getUsers(error,doc){if(error){console.log(error)}})
      },
      user: (_, { first_name: name }) =>{
        return userDB.find(obj=> obj.first_name=name)
      },
      institutes: () => {
        return Institute.find({},function getInstitutes(error,doc){//no funca lel
          if(error){ console.log(error)}
        });
      }
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Datetime',
        serialize(value) {
          return dayjs(value).format("MM-DD-YYYY");
        },
        parseValue(value) {
          return dayjs(value);
        },
        parseLiteral(ast) {
          if (ast.kind==Kind.INT) {
              return dayjs(ast.value)
          }
          return null;
        }
      })
  };

module.exports = resolvers;