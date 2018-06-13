import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from '../../../providers/user/user';

@Component({
  selector: 'page-detalhesProjeto',
  templateUrl: 'detalhesProjeto.html'
})

export class DetalhesProjetoPage {

  public prjModel: string;
  public obModel: string;
  public nuEmendaParam: any;
  public projetoParam: any;
  public listaInfAdm: Array<any>;
  public listaEmp: Array<any>;
  public listaOb: Array<any>;
  public listaRel: Array<any>;
  public listaPar: Array<any>;
  private urlListaInfAdm: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/propostas/informacoes/format/json?identificadorProjeto=";
  private urlListaEmp: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/propostas/empenho/format/json?identificadorProjeto=";
  private urlListaOb: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/propostas/ob/format/json?identificadorProjeto=";
  private urlListaRel: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/propostas/relatorios/format/json?identificadorProjeto=";
  private urlListaPar: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/propostas/pareceres/format/json?identificadorProjeto=";

  constructor(public navCtrl: NavController, private document: DocumentViewer, private file: File, private transfer: FileTransfer, private platform: Platform, public navParams: NavParams, public http: Http, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private userProvider: UserProvider) {
    this.prjModel = "dados";
    this.obModel = "empenho";
    this.nuEmendaParam = this.navParams.get('nuEmendaParam');
    this.projetoParam = this.navParams.get('projetoParam');
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.fetchContentInfAdm();
    this.fetchContentEmp();
    this.fetchContentOb();
    this.fetchContentRel();
    this.fetchContentPar();
    loading.dismiss();
  }

  fetchContentInfAdm(): void {
    let urlParam = this.urlListaInfAdm + this.projetoParam.identificadorProjeto;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        if (data != null) this.listaInfAdm = data.itens;
      });
  }

  fetchContentEmp(): void {
    let urlParam = this.urlListaEmp + this.projetoParam.identificadorProjeto;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        if (data != null) this.listaEmp = data.itens;
      });
  }

  fetchContentOb(): void {
    let urlParam = this.urlListaOb + this.projetoParam.identificadorProjeto;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        if (data != null) this.listaOb = data.itens;
      });
  }

  fetchContentRel(): void {
    let urlParam = this.urlListaRel + this.projetoParam.identificadorProjeto;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        if (data != null) this.listaRel = data.itens;
      });
  }

  fetchContentPar(): void {
    let urlParam = this.urlListaPar + this.projetoParam.identificadorProjeto;
    console.log(urlParam);
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        if (data != null) this.listaPar = data.itens;
      });
  }

  showAlert(titulo: string, texto: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }

  openPdf() {
    //const options: DocumentViewerOptions = { title: 'My PDF' }
    //this.document.viewDocument('assets/deputadoPDF.pdf', 'application/pdf', options);
    let urlParam = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/relatorio/PDF";
    this.http.get(urlParam);
  }
}
