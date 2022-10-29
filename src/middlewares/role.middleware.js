
const adminValidate = (req, res, next) => {
    const role = req.user.role;
    if (role === 'admin') {
        return next();
    }
    return res.status(401).json({msg: 'Access Denied'})
}

module.exports = adminValidate