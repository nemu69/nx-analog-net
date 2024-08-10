import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'notes-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <notes-analog-welcome/>
  `,
})
export default class HomeComponent {
}
