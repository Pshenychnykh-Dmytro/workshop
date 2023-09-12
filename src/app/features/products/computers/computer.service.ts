import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICrudService } from '@core/interfaces/crud.service';
import { ComputerModel } from './computer.models';

@Injectable()
export class ComputerService implements ICrudService<ComputerModel> {

  constructor(http: HttpClient) {}

}
