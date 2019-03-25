const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const db = require('./Database/index');
const Event = require('./Models/event');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res,next)=>{
    res.send("HellowWorld");
});
const events = [];
app.use("/graphql", graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: ID!,
        title: String!,
        description: String!,
        price: Float!,
        date: String!
    }
    input EventInput {
        title: String!,
        description: String!,
        price: Float!,
        date: String!
    }
    type RootQuery {
        events: [Event!]!,
        name: String!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue:{
        events: () => {
            return Event.find().then((doc)=>{
                return doc;
            }).catch((err)=>{
                throw new Error(err);
            })
        },
        name: () => {
            return "Vini!!!"
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(args.eventInput.date),
            });
           return event.save().then((result)=>{
                console.log(result);
                return {...result._doc};
            }).catch((err)=>{
                console.log(err);
                throw new Error(err);
            });
        }
    },
    graphiql: true,
}));
db.connection().then(()=>{
    app.listen(3000,()=>{
        console.log("Server running");
    });
});
