import { AfterViewChecked, AfterViewInit, Component, DoCheck, Inject, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'hia-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName = 'Hilton Hotel';
  title = 'Room List';

  numberOfRooms = 80;

  roomsSelected!: RoomList;

  hideRooms = true;
  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 3,
    totalRooms: 50
  }
  roomList: RoomList[] = [];

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.next('user4');
    observer.complete();
    //observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;


  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  totalBytes = 0;

  subscription !: Subscription;

  rooms$ = this.roomsService.getRooms$;

  constructor(@SkipSelf() private roomsService: RoomsService) { }

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => console.log(data));

    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
  }

  ngDoCheck(): void {
    console.log('DoCheck call on change');
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    console.log(this.headerComponent);
    console.log('AfterViewInit');

    this.headerChildrenComponent.last.title = 'Last Title!';
    console.log(this.headerChildrenComponent);
  }

  ngAfterViewChecked(): void {
    console.log('after view checked!');
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.roomsSelected = room;
  }
  addRoom() {
    const room: RoomList = {
      roomNum: '6',
      roomType: 'Deluxe Apt Room',
      amenities: 'A/C, Cable, Wi-fi, Shower',
      price: 600,
      rating: 6.5232,
      photos: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e',
      checkInTime: new Date('11-02-2023'),
      checkOutTime: new Date('18-02-2023')
    };

    //this.roomList = [...this.roomList, room];
    //this.roomList.push(room);
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNum: '8',
      roomType: 'Deluxe Apt Room',
      amenities: 'A/C, Cable, Wi-fi, Shower',
      price: 600,
      rating: 6.5232,
      photos: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e',
      checkInTime: new Date('11-02-2023'),
      checkOutTime: new Date('18-02-2023')
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

//getData -> addData -> getData  - pull architecture

//getData -> continous stream of data -> addData  - push architecture
