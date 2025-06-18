import { Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    data: { roles: ['administrador', 'coordinador', 'solicitante'] },
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'coordinador',
    canActivate: [RoleGuard],
    data: { roles: ['coordinador'] },
    loadChildren: () => import('./coordinador/coordinador.module').then((m) => m.CoordinadorModule)
  },
  {
    path: 'solicitante',
    canActivate: [RoleGuard],
    data: { roles: ['solicitante'] },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./solicitante/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'registrar',
        loadChildren: () => import('./solicitante/registrar/registrar.module').then((m) => m.RegistrarModule),
      },
      {
        path: 'reportes',
        loadChildren: () => import('./reportes/reportes.module').then((m) => m.ReportesModule),
      },

    ]
  },
  {
    path: 'administrador',
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
    loadChildren: () => import('./administrador/administrador.module').then((m) => m.AdministradorModule),
  },
  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
    // data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'apps/users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'apps/roles',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'apps/permissions',
    loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
