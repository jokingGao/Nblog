module.exports = {
    checkLogin: function checkLogin(req, res, next) {

        if (!req.session.user) {
            req.flash('error', 'You need to log in!');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        
        if (req.session.user) {
            req.flash('error', 'You have already signed in!');
            return res.redirect('back');
        }
        next();
    }
}