import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { DeputadoPage } from '../deputado/deputado';
import { CidadaoPage } from '../cidadao/cidadao';

import { UserProvider } from '../../providers/user/user';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	public homeNgModel: string;
	public registerCredentials = { email: '', password: '' };

	constructor(public navCtrl: NavController, private alertCtrl: AlertController, private userProvider: UserProvider) {
		this.homeNgModel = "deputados";
		this.registerCredentials.email = "flavianomelo@camara.leg.br";
		this.registerCredentials.password = "12345";		
	}

	public login() {
		this.userProvider.login(this.registerCredentials).subscribe(allowed => {
			console.log(allowed);
			if (allowed) {
				//this.navCtrl.push(DeputadoPage);
				this.navCtrl.setRoot(DeputadoPage);
			} else {
				this.showError("Erro ao realizar o login", "Credenciais inválidas");
			}
		},
			error => {
				this.showError("Erro", error);
			});
	}

	irParaCidadao(): void {
		this.navCtrl.push(CidadaoPage);
	}

	showError(title, text) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}

}
