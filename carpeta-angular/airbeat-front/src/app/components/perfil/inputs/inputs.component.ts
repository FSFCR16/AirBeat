import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
  @Input() text: String = ""
  @Input() textFor: String = ""
  @Input() idText: String = ""
  @Input() nameText: String = ""
  @Input() placeholder: String = ""
  @Input() typeText: String = ""
  //@Input() value:String = ""
  @Output() valueChanged = new EventEmitter<string>();
  
  onInputChange(event: any) {
    this.valueChanged.emit(event.target.value);
  }
}
