import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Chart } from 'chart.js';

import { UserProvider } from '../../../providers/user/user';
import { UtilsProvider } from '../../../providers/utils/utils';

import { UfEmendasPage } from '../ufEmendas/ufEmendas';

@Component({
  selector: 'page-ufEmendasG',
  templateUrl: 'ufEmendasG.html'
})

export class UfEmendasGPage {

  @ViewChild('barChart') barChart;

  public barChartEl: any;
  public chartLabels: any = [];
  public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;

  public items: Array<any>;
  public qtdEmendasTotal: any;
  public valorTotal: any;
  public anoParam: any;
  private url: string = "http://soa.funasa.gov.br/emendaparlamentar-webservice/rest/dados/api/v1.0.0/parlamentares/emendas/uf/format/json?ano=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http, private userProvider: UserProvider, private utilsProvider: UtilsProvider) {
    this.anoParam = this.navParams.get('anoParam');
    this.fetchContent();
  }

  fetchContent(): void {
    let urlParam = this.url + this.anoParam;
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.http.get(urlParam).map(res => res.json())
      .subscribe(data => {
        this.items = data.itens;
        this.qtdEmendasTotal = data.quantidadeEmendas;
        this.valorTotal = data.valorInvestidoFormatado;
        this.defineChartData();
        this.createBarChart();
        loading.dismiss();
      });
  }

  detalharUfEmendas(): void {
    this.navCtrl.push(UfEmendasPage, {
      anoParam: this.anoParam
    });
  }

  defineChartData() {
    let i: any;
    for (i in this.items) {
      var it = this.items[i];
      this.chartLabels.push(it.uf);
      this.chartValues.push(it.quantidadeEmendas);
      this.chartColours.push(this.utilsProvider.dynamicColorsGraph());
      //this.chartHoverColours.push(this.dynamicColors());
    }
  }

  createBarChart() {
    this.barChartEl = new Chart(this.barChart.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Emendas por UF',
            data: this.chartValues,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.chartColours,
            hoverBackgroundColor: this.chartHoverColours
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
            boxWidth: 80,
            fontSize: 15,
            padding: 0
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 100
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }]
          }
        }
      });
  }

}
