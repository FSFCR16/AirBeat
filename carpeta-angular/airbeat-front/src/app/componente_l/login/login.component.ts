import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild("btniniciar") btnIniciar!: ElementRef
  @ViewChild("btnregistrar") btnRegistrar!: ElementRef
  @ViewChild(RegistroComponent) login!:  RegistroComponent
  @ViewChild("infoInicio") infoInicio!: ElementRef

  constructor(private render:Renderer2){}
  ngAfterViewInit(){
    this.render.addClass(this.btnIniciar.nativeElement, "colorMorado")
    this.render.removeClass(this.btnRegistrar.nativeElement, "colorMorado")
  }

  inicioColor(){
    this.ngAfterViewInit()
    this.render.addClass(this.infoInicio.nativeElement,"displayInicio")
    this.render.removeClass(this.login.infoR().nativeElement,"displayRegistro")
    this.render.removeClass(this.infoInicio.nativeElement,"displayInicioNone")
  }

  registroColor(){
    this.render.addClass(this.btnRegistrar.nativeElement, "colorMorado")
    this.render.removeClass(this.btnIniciar.nativeElement, "colorMorado")
    this.render.addClass(this.infoInicio.nativeElement,"displayInicioNone")
    this.render.addClass(this.login.infoR().nativeElement,"displayRegistro")
    this.infoInicio.nativeElement.hidden="true"
  }
}
