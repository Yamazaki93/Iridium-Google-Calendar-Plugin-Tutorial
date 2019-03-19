import { Component, OnInit, Injector } from '@angular/core';
@Component({
  selector: 'lib-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  token = '';
  constructor(
    private injector: Injector
  ) { }

  ngOnInit() {
  }
  setAuthCode() {
    this.injector.get('Messenger').Send('SetAuthorizationCode', { token: this.token });
    this.token = ''; // clears the input box after we save the token
  }
}
