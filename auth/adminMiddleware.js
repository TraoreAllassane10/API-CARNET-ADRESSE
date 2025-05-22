const adminMiddleware = (req, res, next) => {
    const isAdmin = req.user.admin ? req.user.admin : 0;
    console.log(req.user)
    console.log(isAdmin)

    if(isAdmin)
    {
        next();
    }
    else
    {
        res.status(403).json({Message: "Vous n'etes pas autorisé à acceder à cette route"});
    }
}

module.exports = adminMiddleware;