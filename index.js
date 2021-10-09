var express = require('express')
var mongoose = require('mongoose')
var exhbs = require('express-handlebars')
var path = require('path')
var Handlebars = require('handlebars')
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const localStorage = require("node-localstorage")
const mainRoute = require('./routes/main')
const userRoute = require('./routes/user')
const authMiddleware = require('./middlewares/auth')
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://Danylo:Danylo2006@cluster0.a4qmo.mongodb.net/shop'

var app = express()

const hbs = exhbs.create({
    defaultLayout: 'mainLayout',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('img'))

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'secret val',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(authMiddleware)

app.use(mainRoute)
app.use(userRoute)

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })


        app.listen(PORT, 
            () => console.log(`server is running on ${PORT}`)
        )
    }

    catch(e) {
        console.log(e)
    }
    
}

start()