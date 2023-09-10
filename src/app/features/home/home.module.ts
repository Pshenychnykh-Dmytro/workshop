import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DecoratorsDemoComponent } from './decorators-demo/decorators-demo.component';
import { GuardsDemoComponent } from './guards-demo/guards-demo.component';


@NgModule({
  declarations: [
    HomeComponent,
    DecoratorsDemoComponent,
    GuardsDemoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
