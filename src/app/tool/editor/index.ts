import { AppService } from '../../app.service';

export class Editor {
  public config: object;
  private imageServerURL: string;
  private uploadUrl: string;

  constructor(private appService: AppService) {
    this.imageServerURL = `${this.appService.baseURL}/uc/uploadPicture?type=1`;
    this.uploadUrl = `${this.appService.baseURL}/uc/uploadPicture?type=2`;
    this.initConfig();
  }

  private initConfig() {
    this.config = {
      uiColor: '#ffffff',
      colorButton_colors: '00923E,F8C100,28166F,3a4750,295e6a,4797b1,f9ed69,f08a5d,b83b5e,6a2c70,eaffd0,00b8a9',
      language: 'zh-cn',
      contentsLanguage: 'zh-cn',
      skin: 'moono-lisa',
      height: '400px',
      width: '100%',
      toolbarGroups: [
        { name: 'document', groups: ['mode'] },
        { name: 'basicstyles', groups: ['basicstyles'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
        { name: 'links' },
        { name: 'insert' },
        '/',
        { name: 'styles', groups: ['style', 'font', 'size'] },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },
        { name: 'cleanup' }
      ],
      extraPlugins: 'uploadimage,image2,font,colorbutton,colordialog', // fixed
      removeButtons: 'Font',
      // imageUploadUrl: this.imageServerURL,
      uploadUrl: this.uploadUrl,
      filebrowserImageUploadUrl: this.imageServerURL,
      filebrowserUploadUrl: this.uploadUrl,
      // image2_alignClasses: ['align-left', 'align-center', 'align-right'], // custom define styles
      image2_disableResizer: false,
      stylesSet: [
        { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { class: 'image-narrow' } },
        { name: 'Wide image', type: 'widget', widget: 'image', attributes: { class: 'image-wide' } }
      ],
      // contentsCss: ['/src/asset/lib/ckeditor/contents.css', '/src/asset/lib/ckeditor/plugins/copyformatting/styles/copyformatting.css']
    };
  }
}
