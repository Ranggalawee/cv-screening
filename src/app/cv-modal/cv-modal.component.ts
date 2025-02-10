import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cv-modal',
  templateUrl: './cv-modal.component.html',
  styleUrls: ['./cv-modal.component.css']
})
export class CvModalComponent {
  @Input() cvData: any;
}
