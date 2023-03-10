import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'hia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  /**
   *
   */
  title: string = '';
  constructor() {
      
  }

  ngOnInit(): void {
    
  }
}
