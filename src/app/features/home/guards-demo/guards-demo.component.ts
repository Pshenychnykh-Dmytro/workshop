import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GuardsDemoModel } from './guards-demo.model';
import { ITouchable } from '@core/interfaces/touchable';

@Component({
  selector: 'app-guards-demo',
  templateUrl: './guards-demo.component.html',
  styleUrls: ['./guards-demo.component.scss']
})
export class GuardsDemoComponent implements OnInit, ITouchable {
  private _touched = false;

  public model: GuardsDemoModel = {
    address: '',
    email: '',
    name: '',
    options: []
  };

  constructor(private dataSvc: DataService) {}


  get isTouched(): boolean {
    return this._touched;
  }

  get discardChangesMessage(): string {
    return null;
  }

  ngOnInit(): void {
    this.dataSvc.getGuardDemo().subscribe(model => this.model = model);
  }

  public onChange(e: any): void {
    this._touched = true;
  }
}
