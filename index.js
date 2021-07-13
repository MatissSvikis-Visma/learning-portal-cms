const dotenv = require("dotenv").config();
const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");

const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const PROJECT_NAME = "Learning Portal CMS";
const adapterConfig = {
  dbName: "learningPortal",
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb://mongodb-learning-portal:JmwsMVa9X3LFeROdx0Yv1POUtg41KNwdOGp0fdrYBxAdcXHUdcVilXtGuBVkRGpPKeQoqPs9fmbmLZMYVhU5SQ==@mongodb-learning-portal.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-learning-portal@",
};

const MongoStore = require("connect-mongo");

//const PostSchema = require("./lists/Post.js");
const KeystoneUserSchema = require("./lists/KeystoneUser.js");
const DisciplineSchema = require("./lists/Discipline.js");
const CategorySchema = require("./lists/Category.js");
const RoleSchema = require("./lists/Role.js");
const StorySchema = require("./lists/Story.js");
const UserSchema = require("./lists/User.js");
const GuildSchema = require("./lists/Guild.js");
const LinkSchema = require("./lists/Link.js");
const TagSchema = require("./lists/Tag.js");

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
    autoRemove: "interval",
    autoRemoveInterval: 10,
    collectionName: "learningPortal",
  }),
});

keystone.createList("KeystoneUser", {
  fields: KeystoneUserSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
});

keystone.createList("User", {
  fields: UserSchema.fields,
  access: {
    read: true,
    create: false,
    update: false,
    delete: false,
  },
});

keystone.createList("Guild", {
  fields: GuildSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

keystone.createList("Tag", {
  fields: TagSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

keystone.createList("Link", {
  fields: LinkSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

keystone.createList("Discipline", {
  fields: DisciplineSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

keystone.createList("Category", {
  fields: CategorySchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

keystone.createList("Role", {
  fields: RoleSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

keystone.createList("Story", {
  fields: StorySchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labelResolver: (item) => item.title,
});

//keystone.set('signin logo', './visma-eAccounting-dark.svg');

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "KeystoneUser",
  config: {
    identityField: "email",
    secretField: "password",
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: isAdmin,
      hooks: {
        logo: require.resolve("./logo.js"),
      },
    }),
    new StaticApp({
      path: "/",
      src: "public",
      fallback: "index.html",
    }),
  ],
  configureExpress: (app) => {
    app.set("trust proxy", 1);
  },
};
