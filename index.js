var path = require('path');

var express = require('express');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');
var mongoose = require('mongoose');
var winston = require('winston');
var expressWinston = require('express-winston');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect(config.mongodb);

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}));

app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));

app.locals.blog = {
    title: pkg.name
};

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

//successful log
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console) ({
            json: true,
            colorize: true
        }),
        new winston.transports.File ({
            filename: 'logs/success.log'
        })
    ]
}));
routes(app);

//error log
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console) ({
            json: true,
            colorize: true
        }),
        new winston.transports.File ({
            filename: 'logs/error.log'
        })
    ]
}));

//error page
app.use(function(err, req, res, next) {
    res.render('error', {
        error: err
    });
});
app.listen(config.port, function() {
    console.log(`${pkg.name} listening on port ${config.port}`);

})
