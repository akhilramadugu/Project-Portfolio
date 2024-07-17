import {Component, EventEmitter, Output} from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-entry-page',
  standalone: true,
  imports: [],
  templateUrl: './entry-page.component.html',
  styleUrl: './entry-page.component.css'
})
export class EntryPageComponent {
  @Output() typingCompleted = new EventEmitter<void>();

  ngOnInit() {
    const options = {
      strings: ["Hello, Welcome to My Portfolio!"],
      typeSpeed: 50,
      backSpeed: 25,
      onComplete: () => {
        setTimeout(() => {
          this.typingCompleted.emit();
        }, 1000); // Wait 1 second after typing completes
      }
    };

    const typed = new Typed('#typed-output', options);
  }

}
