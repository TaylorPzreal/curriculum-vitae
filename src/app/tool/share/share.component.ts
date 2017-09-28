import { Component, Input, OnChanges, SimpleChange, OnInit, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ShareService } from './share.service';
// import 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';

@Component({
  selector: 'hm-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  providers: [ShareService]
})
export class ShareComponent implements OnChanges, AfterViewInit, OnInit {
  private siteName: string = 'HoneyMorning'; // Website name
  private title: string; // header title
  private url: string;
  private summary: string; //
  private desc: string = 'Share'; // default share reason
  @Input() private sharePic: string; // picture url
  @Input() private shareDesc: string; // desc, summary
  // @Input() private shareTitle: string;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private shareService: ShareService
  ) {
    this.url = location.href;
  }

  public ngOnInit() {
    // do
  }

  public ngAfterViewInit() {

    // This is used for wechat share.
    this.metaService.addTags([
      { content: this.title, property: 'og:title'},
      { content: this.siteName, property: 'og:site_name' }
    ]);
  }

  public ngOnChanges(changes: {
    [propKey: string]: SimpleChange
  }) {
    // 延迟获取title
    this.title = this.titleService.getTitle();
    this.metaService.addTag({ content: 'article', property: 'og:type' }); // 延迟初始化title

    if (changes['shareDesc'].currentValue) {
      this.metaService.addTag({
        content: changes['shareDesc'].currentValue,
        property: 'og:description'
      });
      this.summary = changes['shareDesc'].currentValue;

      // test
      // this.initWechat(this.signature, this.timestamp, this.nonceStr);
      this.generateWechatSignature();
    }
    if (changes['sharePic'].currentValue) {
      this.metaService.addTag({
        content: changes['sharePic'].currentValue,
        property: 'og:image'
      });
    }
  }

  /**
   * 1. Get Wechat signature
   *
   * @private
   * @memberof ShareComponent
   */
  private generateWechatSignature() {
    this.shareService.generateWechatSignature().subscribe((data: any) => {
      if (2000 === data.code) {
        // response signature, timestamp, noncestr
        this.initWechat(data.data.signature, data.data.timestamp, data.data.noncestr);
      }
    });
  }

  /**
   * 2. 初始化 Wechat js-sdk conf
   *
   * @private
   * @param {string} signature
   * @param {number} timestamp
   * @param {string} nonceStr
   * @memberof ShareComponent
   */
  private initWechat(signature: string, timestamp: number, nonceStr: string) {
    // console.warn(signature, timestamp, nonceStr);
    // 注入权限验证配置
    window['wx'].config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx4f0b7157d9ac218e', // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    window['wx'].ready(() => {
      // console.warn('wechat ready');
      this.initWechatApiList();
    });
  }

  /**
   * 3. init wechat share api list.
   *
   * @private
   * @memberof ShareComponent
   */
  private initWechatApiList() {
    window['wx'].checkJsApi({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: (res: any) => {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          console.warn(res);
      }
    });
    // share to 朋友圈
    window['wx'].onMenuShareTimeline({
      title: this.title,
      link: this.url,
      imgUrl: this.sharePic,
      success: () => {
        console.warn('Success share to wechat');
      },
      cancel: () => {
        console.warn('Cancel share to wechat');
      }
    });

    // share to Friend
    window['wx'].onMenuShareAppMessage({
      title: this.title, // 分享标题
      desc: this.summary, // 分享描述
      link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: this.sharePic, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: () => {
          // 用户确认分享后执行的回调函数
      },
      cancel: () => {
          // 用户取消分享后执行的回调函数
      }
    });

    // share to QQ
    window['wx'].onMenuShareQQ({
      title: this.title, // 分享标题
      desc: this.desc, // 分享描述
      link: this.url, // 分享链接
      imgUrl: this.sharePic, // 分享图标
      success: () => {
         // 用户确认分享后执行的回调函数
      },
      cancel: () => {
         // 用户取消分享后执行的回调函数
      }
    });

    // share to QZone
    window['wx'].onMenuShareQZone({
      title: this.title, // 分享标题
      desc: this.summary, // 分享描述
      link: this.url, // 分享链接
      imgUrl: this.sharePic, // 分享图标
      success: () => {
         // 用户确认分享后执行的回调函数
      },
      cancel: () => {
          // 用户取消分享后执行的回调函数
      }
    });
  }

  /**
   * Share to Weibo
   *
   * @private
   * @memberof ShareComponent
   */
  private shareToWeibo() {
    window['sharetitle'] = this.title;
    window['shareUrl'] = this.url;

    const p = this.sharePic;
    const code = 'utf-8';
    this.doShareToWeibo(screen, document, encodeURIComponent, this.siteName, this.url, p, this.title, this.summary, code);
  }

  private doShareToWeibo(s: Screen, d: Document, e: any, r: string, l: string, pics: string, t: string, z: string, c: string) {
    const f = 'http://v.t.sina.com.cn/share/share.php?';
    let u = d.location.href;
    // tslint:disable-next-line:max-line-length
    const p = ['url=', e(u), '&title=', e(t || d.title), '&appkey=4056035540', '&source=', e(r), '&sourceUrl=', e(l), '&content=', c || 'utf-8', '&pic=', e(pics || '')].join('');

    function a() {
      // tslint:disable-next-line:max-line-length
      if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=620,height=450,left=', (s.width - 620) / 2, ',top=', (s.height - 450) / 2].join(''))) {
        u = [f, p].join('');
      }
    }
    if (/Firefox/.test(navigator.userAgent)) {
      setTimeout(a, 0);
    } else {
      a();
    }
  }

  /**
   * 分享到QZone
   *
   * @private
   * @memberof ShareComponent
   */
  private shareToQZone() {
    const p = {
      url: this.url.replace(location.protocol + '//', ''),
      showcount: '1', /*是否显示分享总数,显示：'1'，不显示：'0' */
      desc: this.desc, /*默认分享理由(可选)*/
      summary: this.summary, /*分享摘要(可选)*/
      title: this.title, /*分享标题(可选)*/
      site: this.siteName, /*分享来源 如：腾讯网(可选)*/
      pics: this.sharePic, /*分享图片的路径(可选)*/
      style: '201',
      width: 113,
      height: 39
    };

    const s = [];
    for (const i in p) {
      if (p.hasOwnProperty(i)) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
      }
    }
    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'), '_blank');
  }
}
