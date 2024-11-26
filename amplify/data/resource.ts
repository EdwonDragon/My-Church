import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Conference: a.model({
    name: a.string().required(),
    location: a.string().required(),
    logo: a.string().required(),
    obispId: a.id(),
    obisp: a.belongsTo('Count', 'obispId'),
    departments: a.hasMany('Department', 'fromId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),

  District: a.model({
    name: a.string().required(),
    location: a.string().required(),
    logo: a.string().required(),
    superId: a.id(),
    super: a.belongsTo('Count', 'superId'),
    departments: a.hasMany('Department', 'fromId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),

  Church: a.model({
    name: a.string().required(),
    location: a.string().required(),
    logo: a.string().required(),
    pastorId: a.id(),
    pastor: a.belongsTo('Count', 'pastorId'),
    departments: a.hasMany('Department', 'fromId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),

  Department: a.model({
    name: a.string().required(),
    description: a.string(),
    positions: a.hasMany('Position', 'departmentId'),
    fromId: a.id(),
    conference: a.belongsTo('Conference', 'fromId'),
    district: a.belongsTo('District', 'fromId'),
    church: a.belongsTo('Church', 'fromId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),

  Position: a.model({
    name: a.string().required(),
    level: a.integer().required(),
    description: a.string(),
    departmentId: a.id().required(),
    department: a.belongsTo('Department', 'departmentId'),
    users: a.hasMany('Count', 'positionId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),

  Count: a.model({
    username: a.string().required(),
    email: a.string().required(),
    role: a.string().required(),
    positionId: a.id().required(),
    position: a.belongsTo('Position', 'positionId'),
    type: a.string().required(),
    rfc: a.string(),
    curp: a.string(),
    conference: a.hasOne('Conference', 'obispId'),
    district: a.hasOne('District', 'superId'),
    church: a.hasOne('Church', 'pastorId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),



  Modules: a.model({
    name: a.string().required(),
    route: a.string().required(),
    permision: a.hasMany('Permissions', 'moduleId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),


  Permissions: a.model({
    moduleId: a.id().required(),
    module: a.belongsTo('Modules', 'moduleId'),
    status: a.string().required(),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND"]).to(["read", "update", "create", "delete"]),
  ]),

});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
