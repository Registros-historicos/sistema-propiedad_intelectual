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
        path: 'derechos-autor',
        loadChildren: () => import('./coordinador/derechos-autor/derechos-autor.module').then((m) => m.DerechosAutorModule),
      },
      {
        path: 'diseno-industrial',
        loadChildren: () => import('./coordinador/diseno-industrial/diseno-industrial.module').then((m) => m.DisenoIndustrialModule),
      },
      {
        path: 'marca',
        loadChildren: () => import('./coordinador/marca/marca.module').then((m) => m.MarcaModule),
      },
      {
        path: 'modelos-utilidad',
        loadChildren: () => import('./coordinador/modelos-utilidad/modelos-utilidad.module').then((m) => m.ModelosUtilidadModule),
      },
      {
        path: 'patentes',
        loadChildren: () => import('./coordinador/patentes/patentes.module').then((m) => m.PatentesModule),
      },
      {
        path: 'reportes',
        loadChildren: () => import('./coordinador/reportes/reportes.module').then((m) => m.ReportesModule),
      },
      {
        path: 'solicitantes',
        loadChildren: () => import('./coordinador/solicitantes/solicitantes.module').then((m) => m.SolicitantesModule),
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
        path: 'registrar',
        loadChildren: () => import('./solicitante/registrar/registrar.module').then((m) => m.RegistrarModule),
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
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
