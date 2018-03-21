const fetch = require('node-fetch');
const bluebird = require("bluebird");
const xmlParser = bluebird.promisify(require('xml2js').parseString);
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');



fetch('https://www.goodreads.com/author/show.xml?id=18541&key=Kf9MpidEkf6ozUZa5hAGdQ')
  .then((response) => response.text())
  .then(xmlParser)
  .then((data) => console.log(data));

const AuthorType = '';

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    description: '...',

    fields: () => {
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        }
      }
    }
  })
})