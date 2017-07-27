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
  // Quill toolbar 配置
  private toolbarOptions: any[] = [
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }, { header: 1 }, { header: 2 }], // custom button values
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ['link', 'image'],
    ['formula', 'blockquote', 'code-block'],
    ['clean']
  ];

  public ngOnInit() {
    this.initQuill();
  }

  private initQuill() {
    const editor: any = new Quill('#quill-editor', {
      bounds: '#quill-editor',
      modules: {
        formula: true,
        syntax: true, // code语法高亮
        toolbar: this.toolbarOptions
      },
      placeholder: 'Free Write...',
      theme: 'snow'
    });

      /**
       * select local image
       *
       */
    function selectLocalImage() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0];

        // file type is only image.
        if (/^image\//.test(file.type)) {
          saveToServer(file);
        } else {
          console.warn('You could only upload images.');
        }
      };
    }

    /**
     * save to server
     *
     * @param {File} file
     */
    function saveToServer(file: File) {
      const fd = new FormData();
      fd.append('image', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/upload/image', true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          // this is callback data: url
          const data = JSON.parse(xhr.responseText);
          if (2000 === data.code) {
            const url = data.data;
            insertToEditor(url);
          }
        }
      };
      xhr.send(fd);
    }

    /**
     * insert image url to rich editor.
     *
     * @param {string} url
     */
    function insertToEditor(url: string) {
      // push image url to rich editor.
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', `http://localhost:9000${url}`);
    }

    // quill editor add image handler
    editor.getModule('toolbar').addHandler('image', () => {
      selectLocalImage();
    });

    editor.on('text-change', () => {
      console.warn(editor.root.innerHTML);
    });
  }
}
