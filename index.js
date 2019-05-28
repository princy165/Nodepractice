const express=require('express');
const app = express();
const logger=require('./logger');
const helmet=require('helmet');
const morgan=require('morgan');
const config=require('config');
const courses=require('./routes/courses')
const home=require('./routes/home')

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home)

//configuration
console.log('Application Name: ' +config.get('name'));
console.log('MailServer Name: ' +config.get('mail.host'));
console.log('MailServer Password: ' +config.get('mail.password'));


if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('Morgan Enabled...')
}


app.use(function(req, res, next){
  console.log('Authenticating');
  next();
  });





 
//port
const port= process.env.PORT || 3000
app.listen(port,() => console.log(`Listening on port ${port}...`))