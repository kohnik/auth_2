import { Component, Input } from '@angular/core';
import { SwithThemeService } from '../../../core/services/switchTheme/swith-theme.service';
import { SwitchViewCardsService } from '../../../core/services/switchViewCards/switch-view-cards.service';
import { DataOfCard } from '../../../shared/interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() item!: DataOfCard;
  constructor(
    public themeService: SwithThemeService,
    public viewCardsService: SwitchViewCardsService,
    public authService: AuthService
  ) {}
}
