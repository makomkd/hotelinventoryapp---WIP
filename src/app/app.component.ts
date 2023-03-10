import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, Optional, Inject } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';

@Component({
  selector: 'hia-root',
  templateUrl: './app.component.html',
  //template: `<h1>Hello World inline template!</h1>
  //<p>Angular is awesome!</p>
  //`,
  styleUrls: ['./app.component.scss']
  //styles:[`h1{color:red}`]
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  role = 'User';

  @ViewChild('name', {static: true}) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage: Storage){

  }
  
  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOnInit');
    this.name.nativeElement.innerText = "Hilton Hotel";

    this.localStorage.setItem('name','Hilton Hotel');
  }
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.rooms.totalRooms = 75;
  // }
}
