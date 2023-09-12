import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DecoratorsDemoComponent } from './decorators-demo/decorators-demo.component';
import { GuardsDemoComponent } from './guards-demo/guards-demo.component';
import { DefaultApproachComponent } from './decorators-demo/default-approach/default-approach.component';
import { AdvancedApproachComponent } from './decorators-demo/advanced-approach/advanced-approach.component';
import { DataService } from './data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    DecoratorsDemoComponent,
    GuardsDemoComponent,
    DefaultApproachComponent,
    AdvancedApproachComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataService
  ]
})
export class HomeModule { }
