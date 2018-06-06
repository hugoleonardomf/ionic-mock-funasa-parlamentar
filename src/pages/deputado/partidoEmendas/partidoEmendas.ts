import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from '../../../providers/user/user';
import { UtilsProvider } from '../../../providers/utils/utils';

import { MinhasEmendasPage } from '../minhasEmendas/minhasEmendas';

@Component({
  selector: 'page-partidoEmendas',
  templateUrl: 'partidoEmendas.html'
})

export class PartidoEmendasPage {

  public items: Array<any>;
  public itemsStored: Array<any>;
  public qtdEmendasTotal: any;
  public valorTotal: any;
  public anoParam: any;
  private url: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/partido/format/json?ano=";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public navParams: NavParams, private userProvider: UserProvider, private utilsProvider: UtilsProvider) {
    this.anoParam = this.navParams.get('anoParam');
    this.fetchContent();
  }

  fetchContent(): void {
    let urlParam = this.url + this.anoParam;
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        this.items = data.itens;
        this.itemsStored = data.itens;
        this.qtdEmendasTotal = data.quantidadeEmendas;
        this.valorTotal = data.valorInvestidoFormatado;
        loading.dismiss();
      });
  }

  itemSelected(item: any) {
    this.navCtrl.push(MinhasEmendasPage, {
      tipoConsultaParam: 'partido',
      partidoParam: item.partido,
      anoParam: this.anoParam
    });
  }

  getItems(ev: any) {
    this.items = this.itemsStored;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (this.utilsProvider.removeAcento(item.partido).toLowerCase().indexOf(this.utilsProvider.removeAcento(val).toLowerCase()) > -1);
      })
    }
    else {
      this.items = this.itemsStored;
    }
  }

}
