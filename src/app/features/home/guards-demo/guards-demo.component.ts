import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GuardsDemoModel } from './guards-demo.model';

@Component({
  selector: 'app-guards-demo',
  templateUrl: './guards-demo.component.html',
  styleUrls: ['./guards-demo.component.scss']
})
export class GuardsDemoComponent implements OnInit {
  public model: GuardsDemoModel = {
    address: '',
    email: '',
    name: '',
    options: []
  };

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.dataSvc.getGuardDemo().subscribe(model => this.model = model);
  }
}
