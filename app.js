var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    multer = require('multer'), // handling of multipart/form-data
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler');

require('./models/video-category-model');
require('./models/video-files-model');

var homeController = require('./controllers/home-controller');

var app = express();
var views = path.join(__dirname, 'views');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev')); // types: tiny/common/dev/short
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer(
    {
        dest: path.join(__dirname, 'temp'),
        onFileUploadComplete: function (file, req, res) {
            console.log(file.originalname + ' uploaded to  ' + file.path)
        }
     }));
app.use(cookieParser());

//app.use(app.router);

 /* development only */
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/*
    send back to
*/
app.get('/', function(req, res){
    console.log('Default');
    res.sendFile(path.join(views, 'index.html'));
});

app.get('/partials/:folder/:file', function(req, res) {
    console.log('partial/folder');
    res.sendFile(path.join(views, 'partials/' + req.params.folder + '/' + req.params.file));
});

app.get('/partials/:name', function(req, res){
    console.log('partial');
    res.sendFile(path.join(views, 'partials/' + req.params.name));
});

/*
    api routes
*/
homeController.init(app);


 /*
 -- Global error handler
 */
//app.use(function(err, req, res, next){
//    if(err){
//        res.status(500);
//        res.end(JSON.stringify(err) + "\n");
//    }
//    res.end();
// send error File instead
//});

// redirect all others to the index (HTML5 history)
app.get("/*", function(req,res){
    console.log('Catch all');
    res.sendFile(path.join(views, 'index.html'));
});

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
