import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { ComputerItem, ComputerItemNames } from '../computer.models';
import { RoutePath } from '@core/constants/route-path';

@Component({
  selector: 'app-list-computers',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public readonly itemNames = ComputerItemNames;
  public readonly routePath = RoutePath;
  public items: ComputerItem[] = [];
  public displayedColumns = Object.values(ComputerItemNames);

  constructor(private computerSvc: ComputerService) { }

  ngOnInit(): void {
    this.computerSvc.getList().subscribe(data => this.items = data);
  }

}
