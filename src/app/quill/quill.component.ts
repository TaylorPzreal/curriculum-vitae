import { Component, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { ServiceConf } from '../service-conf';
// syntax
import 'highlight.js/styles/atom-one-dark.css';
// const hljs = require('highlight.js');

// KaTex
import 'katex/dist/katex.min.css';

import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';

interface IEditorConfig {
  toolbarOptions: any[];
  height: number;
}

@Component({
  selector: 'quill',
  template: `
    <div id="quill-editor">
    </div>
  `,
})
export class QuillComponent implements AfterViewInit, OnChanges {
  private editor: any; // 用于局部使用，跟editor指向的是同一个quill
  @Output() private returnDetail: EventEmitter<string> = new EventEmitter<string>();
  @Input() private setDetail: string = null;
  @Input() private editorConfig: IEditorConfig; // {toolbarOptions:[]}

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

  public ngAfterViewInit() {
    this.initQuill();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.editorConfig) {
      $('#quill-editor').height(this.editorConfig.height || 'auto');
      this.toolbarOptions = this.editorConfig.toolbarOptions || this.toolbarOptions;
    }
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add 'implements OnChanges' to the class.
    if (changes && this.editor) {
      // Default content from server(edit blog.)
      this.editor.root.innerHTML = changes['setDetail'].currentValue;
    }
  }

  private initQuill() {
    // 将detail的第一张图片作为封面图片
    let coverImage: string;
    let gettingCoverImage: boolean = true;

    const editor: any = new Quill('#quill-editor', {
      bounds: '#quill-editor',
      modules: {
        formula: true,
        syntax: true, // code语法高亮
        toolbar: this.toolbarOptions,
        // history: {
        //   delay: 2000,
        //   maxStack: 500,
        //   userOnly: true
        // }
      },
      placeholder: 'Free Write...',
      theme: 'snow'
    });
    this.editor = editor;

    // Default content from server(edit blog.)
    editor.root.innerHTML = this.setDetail;

    /**
     * 1. select local image
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
     * 2. save to server
     *
     * @param {File} file
     */
    function saveToServer(file: File) {
      const fd = new FormData();
      fd.append('image', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${ServiceConf.baseURL}/upload/image`, true);
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
     * 3. insert image url to rich editor.
     *
     * @param {string} url
     */
    function insertToEditor(url: string) {
      // push image url to rich editor.
      const range = editor.getSelection();
      const fullUrl = `https://www.honeymorning.com${url}`;
      editor.insertEmbed(range.index, 'image', fullUrl);

      if (gettingCoverImage) {
        coverImage = fullUrl;
        gettingCoverImage = false;
      }
    }

    // quill editor add image handler
    editor.getModule('toolbar').addHandler('image', () => {
      selectLocalImage();
    });

    // 监听同步detail
    editor.on('text-change', () => {
      const emitData = {
        detail: editor.root.innerHTML,
        coverImage
      };
      this.returnDetail.emit(JSON.stringify(emitData));
    });
  }
}
