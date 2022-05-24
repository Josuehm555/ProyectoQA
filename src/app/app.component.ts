import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'audiophistic';

  mostrar_nav: boolean = true;
  mostrar_sidebar: boolean = false;

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        if (event.urlAfterRedirects.includes('/inicio')) {
          this.mostrar_nav = false;
          this.mostrar_sidebar = true;

        }else {
          this.mostrar_nav = true;
          this.mostrar_sidebar = false;
        }
      });
  }
}
