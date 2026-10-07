const session = require('express-session');
const { MongoStore } = require('connect-mongo');

module.exports = function createSession() {
  if (!process.env.SESSION_SECRET) throw new Error('Thiếu SESSION_SECRET');
  return session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI_WRITE,
      collectionName: 'sessions',
      ttl: 24 * 60 * 60,
      autoRemove: 'interval',       
      autoRemoveInterval: 10,
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    },
  });
};
