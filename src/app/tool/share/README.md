# Share btns

- Weibo
- QQ Zone
- Wechat
- QQ
- Twitter
- Facebook

## Usage

### 1. Module

```ts
import { ShareModule } from 'path/to/tool/share';

@NgModule({
  imports: [
    ShareModule
  ]
})
```

### 2. HTML

```html
<hm-share sharePic="{{currentPageLogoURL}}"></hm-share>
```

### 3. index.html

```html
<html xmlns:wb="http://open.weibo.com/wb">

<!-- Add this to head -->
<meta property="wb:webmaster" content="b7c976401f270fdf" />

<!-- Add this to </body> -->
<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>
```

## 一、Share to Weibo

### 1. index.html

```html
  <meta property="wb:webmaster" content="b7c976401f270fdf" />
```

### 2. App key & App sercet

App Key：4056035540
App Sercet：6a906ed33c018bc3919441af203aa713

## 二、Share to Wechat

### Steps

- Get access_token [http://admin.wechat.com/wiki/index.php?title=Access_token](http://admin.wechat.com/wiki/index.php?title=Access_token)
- Get jsapi_ticket [https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
- generate
- IP 白名单 [http://ip.qq.com/](http://ip.qq.com/)

### server conf
