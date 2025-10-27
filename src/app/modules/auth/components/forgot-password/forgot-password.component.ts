import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

// Enumeración para manejar los estados de error del formulario
enum ErrorStates {
  NotSubmitted,  // Formulario no enviado
  HasError,      // Error en el envío
  NoError        // Envío exitoso
}

@Component({
  selector: 'app-forgot-password',  // Selector para usar en templates
  templateUrl: './forgot-password.component.html',  // Ruta al template HTML
  styleUrls: ['./forgot-password.component.scss'],  // Ruta a los estilos SCSS
  host: {
    '(window:load)': 'onWindowLoad()'  // Escucha el evento load de la ventana
  }
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  // Propiedades públicas
  forgotPasswordForm: FormGroup;  // FormGroup para manejar el formulario
  errorState: ErrorStates = ErrorStates.NotSubmitted;  // Estado inicial del formulario
  errorStates = ErrorStates;  // Referencia a la enum para usar en el template
  isLoading$: Observable<boolean>;  // Observable para estado de carga
  
  // Propiedades privadas
  private footerElement: HTMLElement | null = null;  // Referencia al elemento footer
  private styleElement: HTMLStyleElement;  // Elemento style para CSS dinámico
  private unsubscribe: Subscription[] = [];  // Array para manejar suscripciones

  // Constructor con inyección de dependencias
  constructor(
    private fb: FormBuilder,  // Para crear formularios reactivos
    private authService: AuthService,  // Servicio de autenticación
    private renderer: Renderer2,  // Para manipulación segura del DOM
    private el: ElementRef  // Referencia al elemento del componente
  ) {
    // this.isLoading$ = this.authService.isLoading$;  // Inicializa observable de carga
    this.styleElement = this.renderer.createElement('style');  // Crea elemento style
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.initForm();  // Inicializa el formulario
    this.hideFooter();  // Oculta el footer
    this.addGlobalStyle();  // Añade estilos globales
    setTimeout(() => this.hideFooter(), 100);  // Fallback para asegurar ocultación
  }

  // Método que se ejecuta al destruir el componente
  ngOnDestroy(): void {
    this.showFooter();  // Muestra el footer nuevamente
    this.removeGlobalStyle();  // Elimina estilos globales añadidos
    // Limpia todas las suscripciones
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  // Método que se ejecuta cuando la ventana termina de cargar
  onWindowLoad() {
    this.hideFooter();  // Asegura que el footer esté oculto
  }

  // Método privado para ocultar el footer
  private hideFooter() {
    // Intenta encontrar el footer usando diferentes selectores:
    
    // 1. Por clases específicas (Metronic)
    this.footerElement = document.querySelector('.d-flex.flex-center.flex-wrap.px-5');
    
    // 2. Por etiqueta footer si el primer método falla
    if (!this.footerElement) {
      this.footerElement = document.querySelector('footer');
    }
    
    // 3. Por atributo data-role como último recurso
    if (!this.footerElement) {
      this.footerElement = document.querySelector('[data-role="global-footer"]');
    }

    // Si encontró el footer, lo oculta
    if (this.footerElement) {
      this.renderer.setStyle(this.footerElement, 'display', 'none');  // Oculta con estilo
      this.renderer.addClass(this.footerElement, 'kt-hidden-footer');  // Añade clase CSS
    }
  }

  // Método privado para mostrar el footer
  private showFooter() {
    if (this.footerElement) {
      this.renderer.removeStyle(this.footerElement, 'display');  // Quita estilo inline
      this.renderer.removeClass(this.footerElement, 'kt-hidden-footer');  // Quita clase
    }
  }

  // Método privado para añadir estilos globales
  private addGlobalStyle() {
    // CSS para asegurar que el footer permanezca oculto
    const css = `
      .kt-hidden-footer, 
      body[route*="forgot-password"] footer,
      body[route*="forgot-password"] .global-footer {
        display: none !important;
      }
    `;
    this.styleElement.innerHTML = css;  // Asigna el CSS
    this.renderer.appendChild(document.head, this.styleElement);  // Añade al head
  }

  // Método privado para remover estilos globales
  private removeGlobalStyle() {
    if (this.styleElement && this.styleElement.parentNode) {
      this.renderer.removeChild(document.head, this.styleElement);  // Limpia el estilo
    }
  }

  // Getter conveniencia para acceder a los controles del formulario
  get f() {
    return this.forgotPasswordForm.controls;
  }

  // Método para inicializar el formulario reactivo
  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        'admin@demo.com',  // Valor por defecto
        Validators.compose([  // Validadores sincrónicos
          Validators.required,  // Campo obligatorio
          Validators.email,     // Formato email válido
          Validators.minLength(3),  // Mínimo 3 caracteres
          Validators.maxLength(320), // Máximo 320 caracteres
        ]),
      ],
    });
  }

  // Método para manejar el envío del formulario
  submit() {
    /* this.errorState = ErrorStates.NotSubmitted;  // Resetea estado
    
    // Realiza petición al servicio de autenticación
    const forgotPasswordSubscr = this.authService
      .forgotPassword(this.f.email.value)
      .pipe(first())  // Toma solo el primer valor
      .subscribe((result: boolean) => {
        // Actualiza estado según respuesta
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
    
    // Guarda suscripción para limpieza
    this.unsubscribe.push(forgotPasswordSubscr); */
  }
}