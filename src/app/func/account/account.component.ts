import { Component, OnInit } from '@angular/core';

import { Account } from '../../account.model';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public account: Account;

  constructor() {
    this.account = JSON.parse(localStorage.getItem('account'));
  }

  public  ngOnInit() {
    // do
  }
}
