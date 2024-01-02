import { Component,ViewChild,ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { BucadorServiciosService, songs } from '../../services/bucador.servicios.service';
import { CommonModule } from '@angular/common';
import { busqueda } from '../../services/bucador.servicios.service';
import * as Howler from "howler";
import { Subscription } from 'rxjs';
type songOrBusqueda= busqueda | songs

@Component({
  selector: 'app-musicplayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musicplayer.component.html',
  styleUrl: './musicplayer.component.css'
})
export class MusicplayerComponent implements  OnDestroy {
[x: string]: any;
  @ViewChild ("btnPlay") btnPlay!:ElementRef
  @ViewChild ("duration") duration!:ElementRef
  activo:boolean=false
  widthleght: string|undefined;
  duracionNow: string|undefined;
  duracion: string | undefined;
  duracionseg: number | undefined;
  valuetest: number | undefined;
  displayNone = false
  cancionPredeterminada: boolean = false
  pausedAt: number = 0

  sound!:Howl;
  informacionCompartida: songOrBusqueda | any;

  private subscription: Subscription = new Subscription;

  constructor(private buscardor:BucadorServiciosService){
    

    this.subscription = this.buscardor.obtenerInformacion()
    .subscribe((data) => {
      this.informacionCompartida = data;
      this.playMusic(this.informacionCompartida.preview_url)

      // Utilizar la información compartida
      console.log('Información compartida recibida:', this.informacionCompartida);
    });

    this.buscardor.tarerCancionMusicPlayer().subscribe({
      next: (data)=>{
        this.informacionCompartida=data
      },
      error: (error)=>{
        if (error.error.message === "No se encontro ninguna canacion en la base"){
          this.cancionPredeterminada = true
        }
      }
    })
  }


  
  formatTime(secs:number) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  step(){
      let sound=this.sound
      let seek=sound.seek() || 0;
      this.duracionNow=this.formatTime(Math.round(seek))
      this.widthleght=(((seek / sound.duration()) * 100) || 0) + '%'
      this.duration.nativeElement.style.width=this.widthleght
  }


  playMusic(informacionCompartida: string){
    console.log(this.informacionCompartida)
    if (this.sound && this.sound.playing()) {
      this.sound.stop();
    }

    this.sound= new Howler.Howl({
      src: [informacionCompartida],
      format: ['mpeg'],
      volume: 0.4,
      html5:true
    })
    console.log(this.sound)

    this.sound.on("play",()=>{
      this.duracion=this.formatTime(Math.round(this.sound.duration()))
      this.duracionseg=this.sound.duration()  
    })

    this.sound.play(); 

    

    if(!this.displayNone){
      this.displayNone = !this.displayNone;
    }

    setInterval(() => {
      this.step();
    }, 10);
    this.activo=true
  }

  stopMusic(){
    this.sound.pause() 
    this.displayNone = !this.displayNone;
    this.activo=false
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
