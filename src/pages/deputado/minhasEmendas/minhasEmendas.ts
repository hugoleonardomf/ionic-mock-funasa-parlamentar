import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from '../../../providers/user/user';
import { UtilsProvider } from '../../../providers/utils/utils';

import { DetalhesEmendaPage } from '../detalhesEmenda/detalhesEmenda';

@Component({
  selector: 'page-minhasEmendas',
  templateUrl: 'minhasEmendas.html'
})

export class MinhasEmendasPage {

  public items: Array<any>;
  public itemsStored: Array<any>;
  public qtdEmendasTotal: any;
  public valorTotal: any;
  public tipoConsulta: any;
  public anoParam: any;
  public ufParam: any;
  public partidoParam: any;
  //parametros da pesquisa avancada
  public anoPesqParam: any;
  public ufPesqParam: any;
  public municipioPesqParam: any;
  public partidoPesqParam: any;
  public parlamentarPesqParam: any;
  public programaPesqParam: any;
  public situacaoPesqParam: any;
  public nuEmendaPesqParam: any;
  public nuInstrumentoPesqParam: any;
  public nuPropostaPesqParam: any;
  private urlMinhasEmendas: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/format/json?parlamentar=";
  private urlUf: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/uf/format/json?";
  private urlPartido: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/partido/format/json?";
  private urlPesqAvanc: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/pesquisaavancada/format/json?";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public navParams: NavParams, private userProvider: UserProvider, private utilsProvider: UtilsProvider) {
    this.tipoConsulta = this.navParams.get('tipoConsultaParam');
    this.anoParam = this.navParams.get('anoParam');
    this.ufParam = this.navParams.get('ufParam');
    this.partidoParam = this.navParams.get('partidoParam');
    //parametros da pesquisa avancada
    this.anoPesqParam = this.navParams.get('anoPesqParam');
    this.ufPesqParam = this.navParams.get('ufPesqParam');
    this.municipioPesqParam = this.navParams.get('municipioPesqParam');
    this.partidoPesqParam = this.navParams.get('partidoPesqParam');
    this.parlamentarPesqParam = this.navParams.get('parlamentarPesqParam');
    this.programaPesqParam = this.navParams.get('programaPesqParam');
    this.situacaoPesqParam = this.navParams.get('situacaoPesqParam');
    this.nuEmendaPesqParam = this.navParams.get('nuEmendaPesqParam');
    this.nuInstrumentoPesqParam = this.navParams.get('nuInstrumentoPesqParam');
    this.nuPropostaPesqParam = this.navParams.get('nuPropostaPesqParam');
    if (!this.tipoConsulta) this.tipoConsulta = 'minhas'; //para testes
    this.fetchContent(this.tipoConsulta);
  }

  fetchContent(tipoConsulta: any): void {
    let urlParam;
    if (tipoConsulta == 'minhas') {
      urlParam = this.urlMinhasEmendas + this.userProvider.getUserInfo().nome;
    }
    else if (tipoConsulta == 'uf') {
      urlParam = this.urlUf + "siglaUF=" + this.ufParam + "&ano=" + this.anoParam;
    }
    else if (tipoConsulta == 'partido') {
      urlParam = this.urlPartido + "siglaPartido=" + this.partidoParam + "&ano=" + this.anoParam;
    }
    else if (tipoConsulta == 'pesq') {
      urlParam = this.urlPesqAvanc +
        "siglaUf=" + this.ufPesqParam +
        "&nomeMunicipio=" + this.municipioPesqParam +
        "&ano=" + this.anoPesqParam +
        "&siglaPartido=" + this.partidoPesqParam +
        "&parlamentar=" + this.parlamentarPesqParam +
        "&codigoPrograma=" + this.programaPesqParam +
        "&situacaoSiconv=" + this.situacaoPesqParam +
        "&numeroEmenda=" + this.nuEmendaPesqParam +
        "&numeroInstrumento=" + this.nuInstrumentoPesqParam +
        "&numeroProposta=" + this.nuPropostaPesqParam;
      urlParam = urlParam.replace(/undefined/g, '');
    }
    console.log(urlParam);
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
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
    this.navCtrl.push(DetalhesEmendaPage, {
      emendaParam: item
    });
  }

  getItems(ev: any) {
    this.items = this.itemsStored;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (this.utilsProvider.removeAcento(item.numeroEmenda).toLowerCase().indexOf(this.utilsProvider.removeAcento(val).toLowerCase()) > -1);
      })
    }
    else {
      this.items = this.itemsStored;
    }
  }

}
