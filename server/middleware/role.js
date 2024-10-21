

const check = (...roles) => (req, res, next) => {



  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  console.log("Available Roles:", roles);
  console.log("User Role:", req.user.role);

  const hasRole = roles.find(role => req.user && req.user.role && req.user.role.toUpperCase() === role);

  console.log("Has Role:", hasRole);

  if (!hasRole) {
    return res.status(403).send('You are not allowed to make this request.');
  }

  return next();
};


const role = { check };
module.exports = role;
