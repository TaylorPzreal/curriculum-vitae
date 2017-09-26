import { Component, Input } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'hm-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {
  private siteName: string = 'HoneyMorning'; // Website name
  private title: string; // header title
  private url: string;
  private summary: string; //
  private desc: string = 'Share'; // default share reason
  @Input() private sharePics: string; // picture url

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {
    this.title = this.titleService.getTitle();
    this.url = location.href;

    // This is used for wechat share.
    this.metaService.addTags([
      { content: this.title, property: 'og:title'},
      { content: 'article', property: 'og:type' },
      { content: this.siteName, property: 'og:site_name' },
      { content: this.sharePics, property: 'og:image'},
      { content: this.summary, property: 'og:description'}
    ]);
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

    const p = this.sharePics;
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
      pics: this.sharePics, /*分享图片的路径(可选)*/
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
