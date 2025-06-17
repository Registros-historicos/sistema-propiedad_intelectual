export enum Rol {
  ADMINISTRADOR = 1,
  COORDINADOR = 2,
  SOLICITANTE = 3,
}

export const RolNombre: Record<Rol, string> = {
  [Rol.ADMINISTRADOR]: 'administrador',
  [Rol.COORDINADOR]: 'coordinador',
  [Rol.SOLICITANTE]: 'solicitante',
};
