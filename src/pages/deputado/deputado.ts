import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MinhasEmendasGPage } from '../deputado/minhasEmendasG/minhasEmendasG';
import { PartidoEmendasGPage } from '../deputado/partidoEmendasG/partidoEmendasG';
import { UfEmendasGPage } from '../deputado/ufEmendasG/ufEmendasG';
import { PesquisaAvancadaPage } from '../deputado/pesquisaAvancada/pesquisaAvancada';
import { QuemPage } from '../quem/quem';
import { AcompMinhasEmendasPage } from '../deputado/acompMinhasEmendas/acompMinhasEmendas';
import { AcompInstrumentosPage } from '../deputado/acompInstrumentos/acompInstrumentos';

import { UserProvider } from '../../providers/user/user';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-deputado',
  templateUrl: 'deputado.html'
})

export class DeputadoPage {

  public deputadoNgModel: string;

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
    this.deputadoNgModel = "consulta";
  }

  irParaMinhasEmendas(): void {
    this.navCtrl.push(MinhasEmendasGPage);
  }

  irParaPartidoEmendas(): void {
    this.navCtrl.push(PartidoEmendasGPage, {
      anoParam: '2017'
    });
  }

  irParaUfEmendas(): void {
    this.navCtrl.push(UfEmendasGPage, {
      anoParam: '2017'
    });
  }

  irParaPesquisaAvancada(): void {
    this.navCtrl.push(PesquisaAvancadaPage);
  }

  irParaAcompMinhasEmendas(): void {
    this.navCtrl.push(AcompMinhasEmendasPage);
  }

  irParaAcompInstrumentos(): void {
    this.navCtrl.push(AcompInstrumentosPage);
  }

  quem(): void {
    this.navCtrl.push(QuemPage);
  }

  public logout() {
    this.userProvider.logout().subscribe(success => {
      this.navCtrl.setRoot(HomePage);
    });
  }

}
