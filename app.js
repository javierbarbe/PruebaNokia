const express      = require('express');
const path         = require('path');
const db         = require('./src/models');
const exphbs       = require('express-handlebars');
const PORT       = process.env.PORT || 3000;

// inicializacion
const app = express();


// settings 
app.set('views', path.join(__dirname,'src/views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
}));
app.set('view engine','.hbs');

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(require('./src/routes/enrutador'));
app.use(express.static(path.join(__dirname,'public')));


try {
  db.sequelize.sync().then(()=>{
      app.listen(PORT, ()=>{
          console.log(`escuchando en localhost:${PORT}`);
      });
    });
console.log("database autenticaa fernando");
} catch (error) {
  console.log('error',error);
}





