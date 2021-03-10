import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Adapted from: https://stackoverflow.com/a/48557304
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private readonly sanitized: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
