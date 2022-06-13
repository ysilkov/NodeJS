const responseMiddleware = (req, res, next) => {
   if(res.data){
       res.status(200).json(res.data);
       return next();
   }
   if(res.err){
       res.status(code).json({
        error: true,
        message: res.err.message
       });
       return next();
   }

    next();
}

exports.responseMiddleware = responseMiddleware;
