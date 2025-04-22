import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { appRoutes } from './app.routes';
@Component({
  imports: [RouterModule, MatToolbarModule, MatDividerModule, MatTabsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'trialsight';
  readonly navLinks = appRoutes.filter(
    (route) => route.data && route.data['label']
  );
  activeLink = this.navLinks[0];
}
