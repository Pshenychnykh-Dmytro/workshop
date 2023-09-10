import { Observable } from 'rxjs';
import { ValidationError } from '../models/validation-error';

export interface ICrudService<TModel> {
  get(id: number): Observable<TModel>;
  save(model: TModel): Observable<any>;
  delete(id: number): Observable<any>;
  validate(object: any): Observable<ValidationError>;
}
