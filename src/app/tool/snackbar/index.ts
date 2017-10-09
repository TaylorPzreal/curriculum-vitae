import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBar {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * 成功
   *
   * @param {string} [msg='']
   * @param {string} [code='']
   * @memberof SnackBar
   */
  public success(msg: string = '', code: string = '') {
    this.snackBar.open(msg, code, {
      duration: 2000,
      extraClasses: ['text-success']
    });
  }

  /**
   * 提示
   *
   * @param {string} [msg='']
   * @param {string} [code='']
   * @memberof SnackBar
   */
  public info(msg: string = '', code: string = '') {
    this.snackBar.open(msg, code, {
      duration: 3000,
      extraClasses: ['text-info']
    });
  }

  /**
   * 警告
   *
   * @param {string} [msg='']
   * @param {string} [code='']
   * @memberof SnackBar
   */
  public warning(msg: string = '', code: string = '') {
    this.snackBar.open(msg, code, {
      duration: 4000,
      extraClasses: ['text-warning']
    });
  }

  /**
   * 严重错误
   *
   * @param {string} [msg='']
   * @param {string} [code='']
   * @memberof SnackBar
   */
  public danger(msg: string = '', code: string = '') {
    this.snackBar.open(msg, code, {
      duration: 5000,
      extraClasses: ['text-danger']
    });
  }
}
