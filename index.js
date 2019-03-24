const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res,next)=>{
    res.send("HellowWorld");
});
app.use("/graphql", graphqlHttp({
    schema: buildSchema(`
    type RootQuery{
        events: [String!]!,
        name: String!
    }
    type RootMutation{
        createEvent(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue:{
        events: () => {
            return ['Romantict Cokkgin', 'Salling']
        },
        name: () => {
            return "Vini!!!"
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true,
}));
app.listen('3000',()=>{
    console.log('Server running');
})

