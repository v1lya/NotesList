import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LayoutService} from "../shared/layout.service";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  isMobile = false;
  private layoutSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private layoutService: LayoutService) {
    breakpointObserver.observe(['(max-width: 599px)']).subscribe(res => this.isMobile = res.matches);
  }

  ngOnInit(): void {
    this.layoutSubscription = this.layoutService.getState().subscribe(state => {
      if (state.isWeb) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    });
  }

  ngOnDestroy(): void {
      this.layoutSubscription.unsubscribe();
  }

}
