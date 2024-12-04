import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { createUser } from "../auth/create-user/resource";
import { addUserToGroup } from "../auth/add-user-to-group/resource";

const schema = a.schema({

  Zone: a.model({
    name: a.string().required(),
    type: a.string().required(),
    location: a.string().required(),
    logo: a.string().required().array(),
    ownerId: a.id(),
    owner: a.belongsTo('Users', 'ownerId'),
    departments: a.hasMany('Department', 'zoneId'),
    modules: a.hasMany('Modules', 'zoneId'),
    zoneOwnerId: a.id(),
    zoneOwner: a.belongsTo('Zone', 'zoneOwnerId'),
    subZones: a.hasMany('Zone', 'zoneOwnerId'),
    users: a.hasMany("Users", "zoneId")
  })
    .secondaryIndexes((index) => [index("type")])
    .authorization(allow => [
      allow.groups(["SUPERADMIND", "OWNER"]).to(["read", "update", "create", "delete"]),
    ]),

  Department: a.model({
    name: a.string().required(),
    description: a.string(),
    positions: a.hasMany('Position', 'departmentId'),
    zoneId: a.id(),
    zone: a.belongsTo('Zone', 'zoneId'), // Corrected reference from 'Conference' to 'Zone'
  }).authorization(allow => [
    allow.groups(["SUPERADMIND", "OWNER"]).to(["read", "update", "create", "delete"]),
  ]),

  Position: a.model({
    name: a.string().required(),
    level: a.integer().required(),
    description: a.string(),
    departmentId: a.id().required(),
    department: a.belongsTo('Department', 'departmentId'),
    users: a.hasOne('Users', 'positionId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND", "OWNER"]).to(["read", "update", "create", "delete"]),
  ]),

  Users: a.model({
    username: a.string().required(),
    email: a.string().required(),
    role: a.string().required(),
    password: a.string().required(),
    positionId: a.id(),
    position: a.belongsTo('Position', 'positionId'),
    rfc: a.string(),
    curp: a.string(),
    zoneOwner: a.hasOne('Zone', 'ownerId'),
    zoneId: a.id(),
    zone: a.belongsTo('Zone', 'zoneId'),
  })
    .secondaryIndexes((index) => [index("role")])
    .authorization(allow => [
      allow.groups(["SUPERADMIND", "OWNER"]).to(["read", "update", "create", "delete"]),
    ]),

  Modules: a.model({
    name: a.string().required(),
    route: a.string().required(),
    rolesUser: a.string().array(),
    zoneId: a.id(),
    zone: a.belongsTo('Zone', 'zoneId'),
  }).authorization(allow => [
    allow.groups(["SUPERADMIND", "OWNER"]).to(["read", "update", "create", "delete"]),
  ]),

  createUser: a
    .mutation()
    .arguments({
      userName: a.string().required(),
      TemporaryPassword: a.string().required(),
    })
    .authorization((allow) => [allow.groups(["SUPERADMIND", "OWNER", "LEADER"])])
    .handler(a.handler.function(createUser))
    .returns(a.json()),

  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.groups(["SUPERADMIND", "OWNER", "LEADER"])])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json())

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
