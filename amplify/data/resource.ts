import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Definición del esquema con relaciones
const schema = a.schema({

  // Modelo para Conferences
  Conference: a.model({
    name: a.string().required(),
    location: a.string().required(),
    date: a.date().required(),
    description: a.string().required(),
    // Relación con los departamentos dentro de la conferencia
    departments: a.hasMany('Department', 'conferenceId'),
  }),

  // Modelo para Departments (departamentos dentro de la conferencia)
  DepartmentConferences: a.model({
    name: a.string().required(),  // Nombre del departamento (ej. Finanzas, Recursos Humanos, etc.)
    description: a.string(),  // Descripción opcional del departamento
    conferenceId: a.id().required(),  // ID de la conferencia a la que pertenece el departamento
    positions: a.hasMany('PositionConferences', 'departmentId'),  // Los puestos disponibles en este departamento
    conference: a.belongsTo('Conference', 'conferenceId'),  // Relación con el departamento
  }),

  // Modelo para Position (Puestos dentro de un departamento)
  PositionConferences: a.model({
    name: a.string().required(),  // Nombre del puesto (ej. Jefe, Subjefe, Empleado)
    level: a.integer().required(),  // Nivel del puesto (ej. 1 para jefe, 2 para subjefe, 3 para empleado)
    description: a.string(),  // Descripción opcional del puesto
    departmentId: a.id().required(),  // ID del departamento al que pertenece este puesto
    department: a.belongsTo('DepartmentConferences', 'departmentId'),  // Relación con el departamento
  }),

  // Modelo para UsersConferences (Usuarios en la conferencia, asignados a un puesto)
  UsersConferences: a.model({
    username: a.string().required(),
    email: a.string().required(),
    role: a.string().required(),  // Rol base del usuario
    positionId: a.id().required(),  // ID del puesto que ocupa el usuario dentro del departamento
    position: a.belongsTo('PositionConferences', 'positionId'),  // Relación con el puesto
  }),
}).authorization((allow) => allow.publicApiKey());

export type Schema = ClientSchema<typeof schema>;

// Definición de los datos con los esquemas y configuraciones de autorización
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
