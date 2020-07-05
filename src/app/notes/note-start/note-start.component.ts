import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {LayoutService} from "../../shared/layout.service";

@Component({
  selector: 'app-note-start',
  templateUrl: './note-start.component.html',
  styleUrls: ['./note-start.component.css']
})
export class NoteStartComponent implements OnInit, OnDestroy {
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
