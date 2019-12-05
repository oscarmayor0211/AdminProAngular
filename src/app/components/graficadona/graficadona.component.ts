import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficadona',
  templateUrl: './graficadona.component.html',
  styles: []
})
export class GraficadonaComponent implements OnInit {

  Doughnut
  @Input() doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: number [] = [];
  @Input() doughnutChartType: String = '';


  constructor() { }

  ngOnInit() {
  }

}
