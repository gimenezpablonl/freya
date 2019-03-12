const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
    // INIT
const app = express();
    // SETTINGS
app.set('port',process.env.PORT | 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir:  path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');
app.use(cors({
    methods: ['POST'],  
    origin: 'http://localhost:4000'
}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
    // VAR

app.use((req,res,next) =>{
    next();
});
app.use(morgan('dev'));
    // ROUTES
app.use(require('./routes'));
app.use('/summoner', require('./routes/summoner'));
app.listen(app.get('port'), ()=> {
    console.log('Servidor andando en el puerto ',app.get('port'));
})