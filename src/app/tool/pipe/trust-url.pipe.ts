import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trustURL'})
export class TrustURLPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}

  public transform(value: string): any {
    return this.sanitized.bypassSecurityTrustUrl(value);
  }
}

