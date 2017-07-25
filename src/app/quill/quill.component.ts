import { Component, OnInit } from '@angular/core';

// syntax
import 'highlight.js/styles/atom-one-dark.css';
// const hljs = require('highlight.js');

// KaTex
import 'katex/dist/katex.min.css';

import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';

@Component({
  selector: 'quill',
  template: `
    <div id="quill-editor">
    </div>
  `,
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent implements OnInit {
  public ngOnInit() {
    (async () => {
      // await this.initHljs();
      await this.initQuill();
    })();
  }

  // private initHljs() {
  //   hljs.initHighlightingOnLoad();
  // }

  private initQuill() {
    const fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu', 'Abel', 'Satisfy', 'cursive', 'sans-serif', 'Microsoft Yahei'];
    const Font = Quill.import('formats/font');
    Font.whitelist = fonts;
    Quill.register(Font, true);

    const toolbarOptions: any[] = [
      [{font: []}, { size: ['small', false, 'large', 'huge'] }, { header: 1 }, { header: 2 }], // custom button values
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],

      ['link', 'image', 'formula', 'blockquote', 'code-block', 'clean']
    ];

    const editor = new Quill('#quill-editor', {
      bounds: '#quill-editor',
      modules: {
        formula: true,
        syntax: true, // code语法高亮
        toolbar: toolbarOptions
      },
      placeholder: 'Free Write...',
      theme: 'snow'
    });

    editor.on('text-change', () => {
      console.warn(editor.root.innerHTML);
    });
  }
}
