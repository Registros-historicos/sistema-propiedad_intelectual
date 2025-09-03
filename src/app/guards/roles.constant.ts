export enum Rol {
  ADMINISTRADOR = 1,
  COORDINADOR = 2,
  SOLICITANTE = 3,
  CEPAT = 4,
}

export const RolNombre: Record<Rol, string> = {
  [Rol.ADMINISTRADOR]: 'administrador',
  [Rol.COORDINADOR]: 'coordinador',
  [Rol.SOLICITANTE]: 'solicitante',
  [Rol.CEPAT]: 'cepat',
};
