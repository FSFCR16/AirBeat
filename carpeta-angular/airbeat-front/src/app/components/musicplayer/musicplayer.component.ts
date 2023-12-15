import { Component,ViewChild,ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Howler from "howler";

@Component({
  selector: 'app-musicplayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musicplayer.component.html',
  styleUrl: './musicplayer.component.css'
})
export class MusicplayerComponent {
  @ViewChild ("btnPlay") btnPlay!:ElementRef
  //@ViewChild ("duration") duration!:ElementRef
   duracion:string | undefined;
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

  musica(){
    this.sound.on("play",()=>{this.duracion=this.formatTime(Math.round(this.sound.duration()))})
  }

  playMusic(){
    this.sound.play();
    this.displayNone = !this.displayNone;
    this.musica()
  }

  stopMusic(){
    this.sound.pause()
    this.displayNone = !this.displayNone;
  }
}
