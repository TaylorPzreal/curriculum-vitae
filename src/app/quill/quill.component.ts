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

    private toolbarOptions: any[] = [
      [{font: []}, { size: ['small', false, 'large', 'huge'] }, { header: 1 }, { header: 2 }], // custom button values
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],

      ['link', 'image'], ['formula', 'blockquote', 'code-block'], ['clean']
    ];

  public ngOnInit() {
      this.initQuill();
  }

  // open local file upload image to server.
  private imageHandler() {


    // var fd = new FormData();
    // fd.append('image', image, image.name);


  }

  private initQuill() {
    const fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu', 'Abel', 'Satisfy', 'cursive', 'sans-serif', 'Microsoft Yahei'];
    const Font = Quill.import('formats/font');
    Font.whitelist = fonts;
    Quill.register(Font, true);

    const editor: any = new Quill('#quill-editor', {
      bounds: '#quill-editor',
      modules: {
        formula: true,
        syntax: true, // code语法高亮
        toolbar: {
          container: this.toolbarOptions,
          // handlers: {
          //   image: () => {
          //    const range = editor.getSelection();
          //    const value = prompt('Please input image URL:');
          //    editor.insertEmbed(range.index, 'image', value);
          //   }
          // }
        }
      },
      placeholder: 'Free Write...',
      theme: 'snow',
    });

    function uploadImage() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      input.onchange = () => {
        console.warn(input.files[0]);
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
          // const URL = window.URL || window.webkitURL;
          // const blob: Blob = URL.createObjectURL(file);

          // saveToServer(blob, file.name);
          const fd = new FormData();
          fd.append('image', file);

          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:3000/upload/image', true);
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.warn(xhr.responseText);
            }
          };
          xhr.send(fd);

        } else {
          console.warn('You could only upload images.');
        }
      };
    }

    /**
     * Upload image to server.
     *
     * @param {Blob} blob
     * @param {string} fileName
     * @returns
     */
    function saveToServer(blob: Blob, fileName: string) {
      const fd = new FormData();
      const name = 'file';
      fd.append(name, blob, fileName);

      console.warn(blob);

      if (blob.size > 512000) {
        const size = Math.ceil(blob.size / 1024);
        console.warn(`Image size is more then 500k, Current size is ${size}`);
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/upload/image', true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.warn(xhr.responseText);
        }
      };
      xhr.send(fd);
    }

    editor.getModule('toolbar').addHandler('image', () => {
     uploadImage();
    });

    editor.on('text-change', () => {
      console.warn(editor.root.innerHTML);
    });
  }
}
