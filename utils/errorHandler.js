const errorHandlerMiddleware = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;
  console.log('Error: ', err)

  switch (name) {
    case 'NOT_NULLABBLE':
      code = 400;
      message = 'Missing required field(s)!';
      break;

    case 'EMAIL_EXIST':
      code = 400;
      message = 'Email already exist!';
      break;

    case 'FALSE_LOGIN':
      code = 401;
      message = 'Invalid email or password!';
      break;

    case 'INVALID_TOKEN':
      code = 401;
      message = 'Invalid Access token!';
      break;

    case 'MISSING_TOKEN':
      code = 401;
      message = 'Missing Access token!';
      break;

    case 'FORBIDDEN':
      code = 403;
      message = 'Forbidden access!';
      break;
      
    case 'NOT_FOUND':
      code = 200;
      message = 'Data not found!';
      break;

    default:
      code = 500;
      message = 'Internal server error!';
  }
  res.status(code).json({success: false, message});
};

module.exports = errorHandlerMiddleware;
