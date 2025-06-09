import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'coordinador',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./coordinador/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'derechos-autores',
        loadChildren: () => import('./coordinador/derechos-autor/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'derecho-autor/registro',
        loadChildren: () => import('./coordinador/derechos-autor/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: 'disenos-industriales',
        loadChildren: () => import('./coordinador/diseno-industrial/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'diseno-industrial/registro',
        loadChildren: () => import('./coordinador/diseno-industrial/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: 'marcas',
        loadChildren: () => import('./coordinador/marca/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'marca/registro',
        loadChildren: () => import('./coordinador/marca/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: 'modelos-utilidad',
        loadChildren: () => import('./coordinador/modelos-utilidad/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'modelo-utilidad/registro',
        loadChildren: () => import('./coordinador/modelos-utilidad/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: 'patentes',
        loadChildren: () => import('./coordinador/patentes/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'patente/registro',
        loadChildren: () => import('./coordinador/patentes/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: 'reportes',
        loadChildren: () => import('./coordinador/reportes/reportes.module').then((m) => m.ReportesModule),
      },
      {
        path: 'solicitantes',
        loadChildren: () => import('./coordinador/solicitantes/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'solicitante/registro',
        loadChildren: () => import('./coordinador/solicitantes/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'solicitante',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./solicitante/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'administrador',
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
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
