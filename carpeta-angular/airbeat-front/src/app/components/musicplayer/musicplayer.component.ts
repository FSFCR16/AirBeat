import { Component,ViewChild,ElementRef } from '@angular/core';
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
  sound= new Howler.Howl({
    src: ['../../assets/music.mp3']
  })

  playMusic(){
    this.sound.play()
    
  }

  stopMusic(){
    this.sound.pause()
  }
}
