import { Component,ViewChild,ElementRef, Input, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import * as Howler from "howler";

@Component({
  selector: 'app-musicplayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musicplayer.component.html',
  styleUrl: './musicplayer.component.css'
})
export class MusicplayerComponent implements OnInit {
  @ViewChild ("btnPlay") btnPlay!:ElementRef
  @ViewChild ("duration") duration!:ElementRef
  widthleght:string|undefined;
  duracionNow:string|undefined;
  duracion:string | undefined;
  duracionseg:number | undefined;
  valuetest:number | undefined;
  public displayNone = false
  sound= new Howler.Howl({
    src: ['../../assets/music.mp3'],
    onplay: function(){
      
    }
  })

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

  ngOnInit(): void {
    this.sound.on("play",()=>{
      this.duracion=this.formatTime(Math.round(this.sound.duration()))
      this.duracionseg=this.sound.duration()  
    })
  }


  playMusic(){
    this.sound.play();
    this.displayNone = !this.displayNone;
    setInterval(() => {
      this.step();
    }, 1);
  }

  stopMusic(){
    this.sound.pause()
    this.displayNone = !this.displayNone;
  }
}
