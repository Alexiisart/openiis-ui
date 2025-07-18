import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OpeniisTheme, OpeniisThemeService } from 'openiis-ui';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currentTheme: OpeniisTheme = 'classic';
  constructor(private themeService: OpeniisThemeService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  ngOnInit(): void {
    // Configurar tema de OpenIIS UI
    document.documentElement.setAttribute(
      'data-openiis-theme',
      this.currentTheme,
    );
  }

  title = 'openiis-ui';
}
