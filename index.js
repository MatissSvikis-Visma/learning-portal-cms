const dotenv = require("dotenv").config();
const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const PROJECT_NAME = "Learning Portal CMS";
const adapterConfig = { mongoUri: process.env.MONGO_URI || "mongodb://mongodb-learning-portal:JmwsMVa9X3LFeROdx0Yv1POUtg41KNwdOGp0fdrYBxAdcXHUdcVilXtGuBVkRGpPKeQoqPs9fmbmLZMYVhU5SQ==@mongodb-learning-portal.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-learning-portal@" };

const MongoStore = require('connect-mongo');

const PostSchema = require("./lists/Post.js");
const UserSchema = require("./lists/KeystoneUser.js");

const isAdmin = ({ authentication: { item: user } }) => {
  return !!user && !!user.isAdmin;
};

const isLoggedIn = ({ authentication: { item: user } }) => {
  return !!user;
};

const keystone = new Keystone({
  name: "Learning Portal",
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET || "very-secret2",
  secureCookies: false,
  sessionStore: MongoStore.create({
    mongoUrl: adapterConfig.mongoUri,
    ttl: 24 * 60 * 60 * 1000,
    autoRemove: 'interval',
    autoRemoveInterval: 10 // Value in minutes (default is 10)
  }),

});

keystone.createList("Post", {
  fields: PostSchema.fields,
  access: {
    read: true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  }
});

keystone.createList("KeystoneUser", {
  fields: UserSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  }
});

keystone.set('signin logo', './visma-eAccounting-dark.svg');

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "KeystoneUser",
  config: {
    identityField: "email",
    secretField: "password"
  }
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({
    name: PROJECT_NAME,
    enableDefaultRoute: true,
    authStrategy,
    isAccessAllowed: isAdmin,
    // hooks: {
    //   logo: logoHook
    // }
  })],
  configureExpress: app => {
    app.set('trust proxy', 1);
  }
}
