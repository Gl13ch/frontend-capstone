import { Component, OnInit } from '@angular/core';
import { SuccessService } from '../success.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public successService: SuccessService) { }

  ngOnInit(): void {
  }

}
