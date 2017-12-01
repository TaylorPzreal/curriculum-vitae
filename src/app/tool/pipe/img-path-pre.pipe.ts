import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '../../app.service';

@Pipe({ name: 'ImgPathPre' })
export class ImgPathPrePipe implements PipeTransform {
  /**
   * Usage
   * img src="{{logoPath | ImgPathPre}}"
   *
   * @param {string} value
   * @returns {string}
   * @memberof ImgpathPrePipe
   */
  public transform(value: string): string {
    const host = `${window.location.protocol}//${window.location.host}`;
    let prePath: string = '';

    // 判断 是否是本地图片，不是本地图片需要添加host
    if (!/^src\/assets\/(.)*/.test(value) && !/^http(.)+/.test(value)) {
      prePath += `${new AppService().baseURL || host}/`;
    }

    return prePath + value;
  }
}
