import { Injectable } from '@angular/core';
import { MyForm } from '../../types/form.type';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  submit(payload: MyForm):  Promise<MyForm> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(payload)
      }, 500)
    });
  }
}
