import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SuccessService {
  successes: string[] = [];

  add(success: string) {
    this.successes.push(success);
  }

  clear() {
    this.successes = [];
  }
}
