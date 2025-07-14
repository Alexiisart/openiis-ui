import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { menuItems } from './sidebar';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { HeaderSecComponent } from '../pages/main/header-sec.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderSecComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  menuItems = menuItems;
  private subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit() {
    // Escuchar cambios de navegación para hacer scroll a los fragmentos
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // Obtener el fragmento de la URL
          const fragment = this.router.parseUrl(this.router.url).fragment;
          if (fragment) {
            // Pequeño delay para asegurar que el contenido se haya renderizado
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition - 200;

                window.scrollBy({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              }
            }, 100);
          }
        })
    );
  }
}
