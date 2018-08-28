/**跨域资源共享。*/
function cros(allow_origins) {
    return function (req, res, next) {
        var origin = allow_origins.split(',');
        if (origin.indexOf(req.headers.origin) >= 0 || origin == "*") {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        if (req.method == 'OPTIONS') {
            return res.end('ok');
        } else {
            if (req.error) {
                return res.json(req.error);
            } else {
                next();
            }
        }
    }
}
module.exports = cros;