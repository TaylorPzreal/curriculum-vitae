# Custom Editor Usage

- AngularHTML

```html
<ckeditor
[(ngModel)]="ckeditorContent"
[config]="editorConf"
[readonly]="false"
(ready)="onReady($event)"
(change)="onChange($event)"
(focus)="onFocus($event)"
(blur)="onBlur($event)"
debounce="500">
</ckeditor>
```

- AngularModule

```ts
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    FormsModule,
    CKEditorModule
  ]
})
```

- AngularComponent

```ts
import { Editor } from 'path/tool/editor';

export class AngularComponent {
  public editorConf: object;

  constructor () {
    this.editorConf = (new Editor()).config;
  }
}

```