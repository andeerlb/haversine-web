import { Component, Input } from '@angular/core'; 

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardTitle: any;
  @Input() navigate: Function;
  @Input() titleNavigate: string;
  @Input() backButton: boolean;
}
