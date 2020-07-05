import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface LayoutState {
  isWeb: boolean;
  isHandsetPortrait: boolean;
}
@Injectable({providedIn: 'root'})
export class LayoutService {
  layoutState: LayoutState;

  constructor(private breakpointObserver: BreakpointObserver) {
    if (window.innerHeight < 599) {
      this.layoutState = this.loadHandsetPortrait();
    } else {
      this.layoutState = this.loadWeb();
    }
  }

  getState(): Observable<LayoutState> {
    return combineLatest(
      this.breakpointObserver.observe(Breakpoints.HandsetPortrait),
      this.breakpointObserver.observe(Breakpoints.Web)
    ).pipe(map(states => {
      if (states[0].matches) {
        return this.loadHandsetPortrait();
      } else {
        return this.loadWeb();
      }
    }));

  }

  private loadWeb(): LayoutState {
    return {isWeb: true, isHandsetPortrait: false};
  }
  private loadHandsetPortrait(): LayoutState {
    return {isWeb: false, isHandsetPortrait: true};
  }
}
