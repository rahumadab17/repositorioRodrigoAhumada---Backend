export function onlyLogged (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(400).json({status: 'Error', message: 'Inicie Sesión'})
    }
    // if (!req.session['user']) {
    //     return res.status(400).json({status: 'Error', message: 'Inicie Sesión'})
    // }
    next()
}

export function onlyLoggedWeb (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
    // if (!req.session['user']) {
    //     return res.redirect('/')
    // }
    next()
}