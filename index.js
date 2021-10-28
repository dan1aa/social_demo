var express = require('express')
var mongoose = require('mongoose')
var exhbs = require('express-handlebars')
var path = require('path')
var Handlebars = require('handlebars')
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const mainRoute = require('./routes/main')
const userRoute = require('./routes/user')
const searchRoute = require('./routes/search')
const authMiddleware = require('./middlewares/auth')
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI

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

app.use(bodyParser.urlencoded({ extended: false }))

app.use(authMiddleware)

app.use(mainRoute)
app.use(userRoute)
app.use(searchRoute)

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
        throw new Error(e)
    }
    
}

start()