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
export class MusicplayerComponent implements OnInit, OnDestroy {
[x: string]: any;
  @ViewChild ("btnPlay") btnPlay!:ElementRef
  @ViewChild ("duration") duration!:ElementRef
  widthleght:string|undefined;
  duracionNow:string|undefined;
  duracion:string | undefined;
  duracionseg:number | undefined;
  valuetest:number | undefined;
  displayNone = false

  sound!:Howl;
  informacionCompartida: songOrBusqueda | any;
  cancionPredeterminada: busqueda ={
    _id: "",
    userId: "",
    cancionId: "",
    songArtist:"",
    songName:"",
    preview_url:"",
    songImage: [{
      img_url_64:"",
      img_url_300:"",
      img_url_640:"",
    }],
    date: new Date
  }

  private subscription: Subscription = new Subscription;

  constructor(private buscardor:BucadorServiciosService){}

  ngOnInit(): void {


    this.buscardor.traerHistorial().subscribe({
      next:(data:any)=>{ 
        this.cancionPredeterminada = data.historial[0]
        console.log(this.informacionCompartida)
        console.log(this.cancionPredeterminada)
        this.sound= new Howler.Howl({
          src: [this.cancionPredeterminada.preview_url],
          format: ['mpeg'],
          volume: 0.4,
          html5:true
        })
        this.sound.on("play",()=>{
          this.duracion=this.formatTime(Math.round(this.sound.duration()))
          this.duracionseg=this.sound.duration()  
        })

      },
      error:(error)=>{
        console.log(error)
      }
    })


    this.subscription = this.buscardor.obtenerInformacion()
    .subscribe((data) => {
      this.informacionCompartida = data;
      this.playMusic(this.informacionCompartida.preview_url)

      // Utilizar la información compartida
      console.log('Información compartida recibida:', this.informacionCompartida);
    });
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
    if (this.sound && this.sound.playing()) {
      this.sound.stop();
    }

    this.sound= new Howler.Howl({
      src: [informacionCompartida],
      format: ['mpeg'],
      volume: 0.4,
      html5:true
    })

    this.sound.on("play",()=>{
      this.duracion=this.formatTime(Math.round(this.sound.duration()))
      this.duracionseg=this.sound.duration()  
    })

    this.sound.play();
    this.displayNone = !this.displayNone;
    setInterval(() => {
      this.step();
    }, 10);
  }

  stopMusic(){
    this.sound.pause()
    this.displayNone = !this.displayNone;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
