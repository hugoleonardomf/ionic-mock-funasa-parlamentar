import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../../providers/user/user';

@Component({
  selector: 'page-acompMinhasEmendas',
  templateUrl: 'acompMinhasEmendas.html'
})

export class AcompMinhasEmendasPage {

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
    //
  }

}
