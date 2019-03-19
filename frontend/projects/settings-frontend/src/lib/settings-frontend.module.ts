import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    FormsModule
  ],
  exports: [SettingsPageComponent],
  entryComponents: []
})
export class SettingsFrontendModule { }
