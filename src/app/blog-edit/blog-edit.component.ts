import {
  Component,
  OnInit
} from '@angular/core';
import * as Quill from 'quill';

import '../../../node_modules/quill/dist/quill.snow.css';

@Component({
  selector: 'blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['blog-edit.component.scss']
})

export class BlogEditComponent implements OnInit {

  public ngOnInit() {
    console.warn('edit');

    this.initEditor();
  }

  private initEditor() {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{
        header: 1
      }, {
        header: 2
      }], // custom button values
      [{
        list: 'ordered'
      }, {
        list: 'bullet'
      }],
      [{
        script: 'sub'
      }, {
        script: 'super'
      }], // superscript/subscript
      [{
        indent: '-1'
      }, {
        indent: '+1'
      }], // outdent/indent
      [{
        direction: 'rtl'
      }], // text direction

      [{
        size: ['small', false, 'large', 'huge']
      }], // custom dropdown
      [{
        header: [1, 2, 3, 4, 5, 6, false]
      }],

      [{
        color: []
      }, {
        background: []
      }], // dropdown with defaults from theme
      [{
        font: []
      }],
      [{
        align: []
      }],

      ['clean'] // remove formatting button
    ];

    const options = {
      formula: true,
      syntax: true,
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: '请输入...',
      theme: 'snow'
    };

    const quill = new Quill('#editor', options);
  }
}
