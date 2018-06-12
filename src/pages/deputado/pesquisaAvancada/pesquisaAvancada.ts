import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from '../../../providers/user/user';

import { MinhasEmendasPage } from '../minhasEmendas/minhasEmendas';

@Component({
  selector: 'page-pesquisaAvancada',
  templateUrl: 'pesquisaAvancada.html'
})

export class PesquisaAvancadaPage {

  public pageOrigem: string;
  public ufLista: Array<any>;
  public ufSelected: string;
  public municipioLista: Array<any>;
  public municipioSelected: string;
  public partidoLista: Array<any>;
  public partidoSelected: string;
  public parlamentarLista: Array<any>;
  public parlamentarSelected: string;
  public programaLista: Array<any>;
  public programaSelected: string;
  public situacaoLista: Array<any>;
  public situacaoSelected: string;
  public nuEmendaSelected: string;
  public nuInstrumentoSelected: string;
  public nuPropostaSelected: string;
  public anoSelected: string;
  private urlUfAll: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/ufs/format/json";
  private urlMunicipioAll: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/ufs/municipios/format/json?identificadorUf=";
  private urlPartidoAll: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/partidos/format/json";
  private urlParlamentarAll: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/partidos/parlamentar/format/json?siglaPartido=";
  private urlProgramaAll: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/siconv/programas/format/json";
  private urlSituacaoAll: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/siconv/situacao/format/json";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public navParams: NavParams, private userProvider: UserProvider) {
    this.pageOrigem = this.navParams.get('pageOrigemParam');
    this.carregarFiltros();
  }

  carregarFiltros() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.fetchContentUf();
    this.fetchContentPartido();
    this.fetchContentPrograma();
    this.fetchContentSituacao();
    loading.dismiss();
  }

  fetchContentUf(): void {
    this.http.get(this.urlUfAll).map(res => res.json())
      .subscribe(data => {
        this.ufLista = data.itens;
      });
  }

  onSelectUf(selectedValue: any) {
    this.ufSelected = selectedValue;
    console.log(this.ufSelected);
    // carregar municípios ao selecionar UF
    let loading = this.loadingCtrl.create({
      content: 'Carregando Municípios...'
    });
    loading.present();
    this.http.get(this.urlMunicipioAll + this.ufSelected).map(res => res.json())
      .subscribe(data => {
        this.municipioLista = data.itens;
        loading.dismiss();
      });
  }

  onSelectMunicipio(selectedValue: any) {
    this.municipioSelected = selectedValue;
    console.log(this.municipioSelected);
  }

  fetchContentPartido(): void {
    this.http.get(this.urlPartidoAll).map(res => res.json())
      .subscribe(data => {
        this.partidoLista = data.itens;
      });
  }

  onSelectPartido(selectedValue: any) {
    this.partidoSelected = selectedValue;
    console.log(this.partidoSelected);
    // carregar partlamentares ao selecionar partido
    let loading = this.loadingCtrl.create({
      content: 'Carregando Parlamentares...'
    });
    loading.present();
    this.http.get(this.urlParlamentarAll + this.partidoSelected).map(res => res.json())
      .subscribe(data => {
        this.parlamentarLista = data.itens;
        loading.dismiss();
      });
  }

  onSelectParlamenta(selectedValue: any) {
    this.parlamentarSelected = selectedValue;
    console.log(this.parlamentarSelected);
  }

  fetchContentPrograma(): void {
    this.http.get(this.urlProgramaAll).map(res => res.json())
      .subscribe(data => {
        this.programaLista = data.itens;
      });
  }

  onSelectPrograma(selectedValue: any) {
    this.programaSelected = selectedValue;
    console.log(this.programaSelected);
  }

  fetchContentSituacao(): void {
    this.http.get(this.urlSituacaoAll).map(res => res.json())
      .subscribe(data => {
        this.situacaoLista = data.itens;
      });
  }

  onSelectSituacao(selectedValue: any) {
    this.situacaoSelected = selectedValue;
    console.log(this.situacaoSelected);
  }

  pesquisar() {
    this.navCtrl.push(MinhasEmendasPage, {
      tipoConsultaParam: 'pesq',
      ufPesqParam: this.ufSelected,
      municipioPesqParam: this.municipioSelected,
      anoPesqParam: this.anoSelected,
      partidoPesqParam: this.partidoSelected,
      parlamentarPesqParam: this.parlamentarSelected,
      programaPesqParam: this.programaSelected,
      situacaoPesqParam: this.situacaoSelected,
      nuEmendaPesqParam: this.nuEmendaSelected,
      nuInstrumentoPesqParam: this.nuInstrumentoSelected,
      nuPropostaPesqParam: this.nuPropostaSelected
    });
  }

}
