import { Component } from '@angular/core';

@Component({
  selector: 'app-home-sec',
  standalone: true,
  imports: [],
  template: `
    <div class="home-container">
      <h1>Bienvenido a la biblioteca de componentes de Openiis UI</h1>
      <p>
        Explora nuestra biblioteca de componentes navegando a través del menú
        lateral o usando los enlaces a continuación.
      </p>
    </div>
  `,
  styles: `
    .home-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-color-secondary);
      margin-bottom: 2rem;
    }

  `,
})
export class HomeSecComponent {}
