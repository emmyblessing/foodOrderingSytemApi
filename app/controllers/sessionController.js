const dotEnv = require('dotenv');

dotEnv.config();

class SessionController {
  constructor() {
    this.checkUserSession = (req, res, next) => {
      const user = this.getSession(req);
      if (user) {
        req.userData = user;
        return next();
      }
      this.destroySession(res);
      return next({ message: 'session expire, login', status: 401 });
    };

    this.checkEmployeeSession = (req, res, next) => {
      const employee = this.getSession(req);
      if (employee) {
        req.employeeData = employee;
        return next();
      }
      this.destroySession(res);
      return next({ message: 'session expire, login', status: 401 });
    };

    this.getSession = (req) => {
      const { sessId } = req.signedCookies;
      if (sessId) {
        const buffer = Buffer.from(sessId, 'base64');
        return JSON.parse(buffer.toString('utf8'));
      }
      return false;
    };

    this.setUserSession = (res, user) => {
      const buffer = Buffer.from(JSON.stringify(user));
      const maxAge = process.env.SESSION_EXPIRE;
      res.cookies('sessId', buffer.toString('base64'), { signed: true, httpOnly: true, maxAge });
    };

    this.setEmployeeSession = (res, employee) => {
      const buffer = Buffer.from(JSON.stringify(employee));
      const maxAge = process.env.SESSION_EXPIRE;
      res.cookies('sessId', buffer.toString('base64'), { signed: true, httpOnly: true, maxAge });
    };

    this.destroySession = (res) => {
      res.clearCookies('sessId');
    };

    this.isEmployee = (req, res, next) => {
      if (!req.employee) {
        return next({ message: 'Unauthorized', status: 401 });
      }
      return next();
    };
  }
}

module.exports = new SessionController();
