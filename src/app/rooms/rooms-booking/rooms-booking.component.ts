import { ObserversModule } from '@angular/cdk/observers';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hia-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent {

  id: number = 0;
  id$ = this.router.paramMap.pipe(
       map(params => params.get('id'))
     );

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    //this.id = this.router.snapshot.params['id'];
    // this.id$ = this.router.params.pipe(
    //   map(params => params['id'])
    // )
    // this.router.paramMap.subscribe((params) => {
    // params.get('id');
    // });
  }
}
