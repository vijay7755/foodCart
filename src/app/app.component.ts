import { authService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoggingServices } from './logging.sevices';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './store/appReducer';
import * as fromAuthAction from './auth/store/authAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [LoggingServices]
})
export class AppComponent implements OnInit {

  constructor(private authService: authService, private loggingService: LoggingServices, private store: Store<fromAppReducer.AppState>) { }
  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new fromAuthAction.AutoLogin());
    this.loggingService.printLog("Hello from AppComponent")
  }
}
