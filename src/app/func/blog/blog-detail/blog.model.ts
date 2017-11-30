export class Blog {
  public title: string;
  public createTime: Date;
  public updateTime: Date;
  public tag: string;
  public coverImage?: string;
  public summary?: string;
  public detail: string;

  public author: string;
  public authorId: number;
  public logo: string;

  constructor() {
    this.title = null;
    this.createTime = null;
    this.updateTime = null;
    this.tag = null;
    this.coverImage = null;
    this.summary = null;
    this.detail = null;
    this.author = null;
    this.authorId = null;
    this.logo = null;
  }
}
