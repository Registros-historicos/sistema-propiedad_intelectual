import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// NgBootstrap modules
import { NgbCollapseModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Componentes del administrador
import { CoordinatorListingComponent } from './coordinator-listing/coordinator-listing.component';
import { ApplicantListingComponent } from './applicant-listing/applicant-listing.component';

// Servicios
import { CoordinatorService, ApplicantService, InstitucionService } from './shared-services';

// Componente para manejar el redirect dinámico
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: '<div>Redirigiendo...</div>'
})
export class DynamicRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const redirectTo = this.route.snapshot.data['redirectTo'];
    if (redirectTo) {
      this.router.navigate([redirectTo], { relativeTo: this.route });
    } else {
      this.router.navigate(['coordinators'], { relativeTo: this.route });
    }
  }
}

@NgModule({
  declarations: [
    DynamicRedirectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'coordinators',
        component: CoordinatorListingComponent,
        data: {title: 'Gestión de Coordinadores'}
      },
      {
        path: 'applicants',
        component: ApplicantListingComponent,
        data: {title: 'Gestión de Solicitantes'}
      },
      {
        path: '',
        component: DynamicRedirectComponent
      }
    ]),

    // NgBootstrap modules
    NgbCollapseModule,
    NgbTooltipModule,
    NgbModalModule,

    // SweetAlert2
    SweetAlert2Module.forChild(),
    ApplicantListingComponent,
    CoordinatorListingComponent,
  ],
  providers: [
    CoordinatorService,
    ApplicantService,
    InstitucionService
  ]
})
export class AdministradorModule { }
