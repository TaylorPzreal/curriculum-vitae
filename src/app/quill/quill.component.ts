import { Component, OnInit } from '@angular/core';

// syntax
import 'highlight.js/styles/atom-one-dark.css';
import * as hljs from 'highlight.js';
// KaTex
import 'katex/dist/katex.min.css';
import 'katex';

import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';

@Component({
  selector: 'quill',
  template: `
    <div id="quill-editor"></div>
  `,
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent implements OnInit {
  public ngOnInit() {
    this.initQuill();
  }

  private initQuill() {
    hljs.configure({
      // optionally configure hljs
      useBR: false,
      languages: ['javascript', 'bash', 'python', 'css', 'http', 'html', 'json', 'typescript', 'markdown', 'nginx', 'sql']
    });
    hljs.initHighlighting();

    const fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu', 'Abel', 'Satisfy', 'cursive', 'sans-serif', 'Microsoft Yahei'];
    const Font = Quill.import('formats/font');
    Font.whitelist = fonts;
    Quill.register(Font, true);

    const toolbarOptions: any[] = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      // [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      // [{ direction: 'rtl' }], // text direction

      // [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: fonts }],
      [{direction: 'rtl'}, { align: [] }],

      ['link', 'image', 'video', 'formula'],
      ['clean']
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
