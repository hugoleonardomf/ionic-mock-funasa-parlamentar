import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-quem',
  templateUrl: 'quem.html'
})

export class QuemPage {

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {

  }


}
