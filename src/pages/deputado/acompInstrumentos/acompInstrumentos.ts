import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../../providers/user/user';

@Component({
  selector: 'page-acompInstrumentos',
  templateUrl: 'acompInstrumentos.html'
})

export class AcompInstrumentosPage {

  public instModel: string;

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
    this.instModel = "acomp";
  }


}
