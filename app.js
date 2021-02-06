var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    mongoose = require('mongoose'),
    config = require('./config/index');
    eventRoutes = require('./routes/events.routes');

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Custom api routes
app.use('/api', eventRoutes);

/** connect to MongoDB datastore */
// mongoose.connect( config.DB.uri, config.DB.options)
//     .then(()=>{
//         console.log(chalk.green('Server successfully connected with MongoDB!'));
//         app.listen(config.PORT, function(){
//             console.log('Listening on port ' + config.PORT);
//             mongoose.set('debug', config.DB.debug);
//         });
        
//     })
//     .catch(err => {
//         console.error(chalk.red('Could not connect to MongoDB!'));
//         console.log(err);
//     });  
  
    app.listen(config.PORT, function(){
        console.log('Listening on port ' + config.PORT);
        mongoose.set('debug', config.DB.debug);
    });
    