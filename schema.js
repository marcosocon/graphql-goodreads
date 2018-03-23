const fetch = require('node-fetch');
const apiKey = 'Kf9MpidEkf6ozUZa5hAGdQ';
const bluebird = require("bluebird");
const _ = require('lodash');
const xmlParser = bluebird.promisify(require('xml2js').parseString);
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const BookType = new GraphQLObjectType({
  name: "Book",
  description: '...',

  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: xml => xml.title[0]
    },
    description: {
      type: GraphQLString,
      resolve: xml => xml.description[0]
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => _.isString(xml.isbn[0]) ? xml.isbn[0] : null
    }
  })
})


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: GraphQLList(BookType),
      resolve: xml => xml.GoodreadsResponse.author[0].books[0].book
    },
    gender: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].gender[0]
    },
    hometown: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].hometown[0]
    },
    fans_count: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].fans_count[0]._
    },
    author_followers_count: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].author_followers_count[0]._
    },
    image_url: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].image_url[0]
    }
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&key=${apiKey}`)
          .then((response) => response.text())
          .then(xmlParser)
      }
    })
  })
})