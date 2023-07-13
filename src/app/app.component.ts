import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'udm-recipe';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
