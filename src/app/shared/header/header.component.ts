import { Component} from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwithThemeService } from '../../core/services/switchTheme/swith-theme.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public authService: FirebaseService,
    private router: Router,
    private modalService: NgbModal,
    public themeService: SwithThemeService
  ) {}
  changeLogin(): void {
    this.authService.displaySignInOrOn = !this.authService.displaySignInOrOn;
  }
  logout(): void {
    this.router.navigate(['']);
    this.authService.logout();
  }
  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
