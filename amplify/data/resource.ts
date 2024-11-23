import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Definición del esquema con relaciones
const schema = a.schema({

  // Modelo para Conference
  Conference: a.model({
    name: a.string().required(),
    location: a.string().required(),
    date: a.date().required(),
    description: a.string().required(),
    departments: a.hasMany('DepartmentConferences', 'conferenceId'),
  }).authorization(allow => [allow.owner()]),

  // Modelo para Departments (departamentos dentro de la conferencia)
  DepartmentConferences: a.model({
    name: a.string().required(),
    description: a.string(),
    conferenceId: a.id().required(),
    positions: a.hasMany('PositionConferences', 'departmentId'),
    conference: a.belongsTo('Conference', 'conferenceId'),
  }).authorization(allow => [allow.owner()]),

  // Modelo para Position (Puestos dentro de un departamento)
  PositionConferences: a.model({
    name: a.string().required(),
    level: a.integer().required(),
    description: a.string(),
    departmentId: a.id().required(),
    department: a.belongsTo('DepartmentConferences', 'departmentId'),
    users: a.hasMany('UsersConferences', 'positionId'),  // Relación inversa con UsersConferences
  }).authorization(allow => [allow.owner()]),

  // Modelo para UsersConferences (Usuarios en la conferencia, asignados a un puesto)
  UsersConferences: a.model({
    username: a.string().required(),
    email: a.string().required(),
    role: a.string().required(),
    positionId: a.id().required(),
    position: a.belongsTo('PositionConferences', 'positionId'),  // Relación a PositionConferences
  }).authorization(allow => [allow.owner()]),
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
