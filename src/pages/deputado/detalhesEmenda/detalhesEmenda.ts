import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from '../../../providers/user/user';

import { DetalhesProjetoPage } from '../detalhesProjeto/detalhesProjeto';

@Component({
  selector: 'page-detalhesEmenda',
  templateUrl: 'detalhesEmenda.html'
})

export class DetalhesEmendaPage {

  public emendaParam: any;
  public items: Array<any>;
  private url: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/propostas/format/json?nuEmenda=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http, private userProvider: UserProvider) {
    this.emendaParam = this.navParams.get('emendaParam');
    this.fetchContent();
  }

  fetchContent(): void {
    let urlParam = this.url + this.emendaParam.numeroEmenda;
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        if (data == null) {
          this.fetchContentTemp(); //fix
        }
        else {
          this.items = data.item.projetos;
        }
        loading.dismiss();
      });
  }

  fetchContentTemp(): void { //fix
    let urlParam = this.url + '201624240006';
    let loading = this.loadingCtrl.create({
      content: 'Carregando Temp...'
    });
    loading.present();
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        this.items = data.item.projetos;
        loading.dismiss();
      });
  }

  itemSelected(item: any): void {
    this.navCtrl.push(DetalhesProjetoPage, {
      nuEmendaParam: this.emendaParam.numeroEmendaParlamentarFormatado,
      projetoParam: item
    });
  }

}
