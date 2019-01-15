import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sampling-portal';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {

        this.activatedRoute.queryParams.subscribe(
          params => {
            if (params['q']) {
              this.router.navigate(['engage'], { preserveQueryParams: true });
            }
          },
          err => {
            console.log(err);
          }
        );
  }

}


