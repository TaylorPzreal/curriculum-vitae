import { Component, OnInit } from '@angular/core';
import { GeetestService } from './geetest.service';

@Component({
  selector: 'hm-geetest',
  templateUrl: './geetest.component.html',
  styleUrls: ['./geetest.component.scss'],
  providers: [GeetestService]
})
export class GeetestComponent implements OnInit {
  private initGeetest: any = window['initGeetest'];

  constructor(private geetestService: GeetestService) {}

  public ngOnInit() {
    this.geetestService.geetestRegister().subscribe((data: any) => {
      if (2000 === data.code) {
        this.initGeetest(
          {
            gt: data.data.gt,
            challenge: data.data.challenge,
            offline: !data.data.success,
            new_captcha: data.data.new_captcha,
            product: 'popup',
            lang: 'en',
            width: '100%'
          },
          (captchaObj: any) => {
            captchaObj.onReady(() => {
              document.getElementById('loading-tip').style.display = 'none';
              captchaObj.appendTo('#captcha-box');
            });

            captchaObj.onSuccess(() => {
              const result = captchaObj.getValidate();
              const param = {
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
              };
              this.geetestService.geetestValidate(param).subscribe((data: any) => {
                if (2000 === data.code) {
                  console.warn(data);
                }
              });
            });

            captchaObj.onError(() => {
              console.warn('There has an geetest error');
            });
          }
        );
      }
    });
  }
}
