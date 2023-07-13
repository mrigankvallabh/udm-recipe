import { Directive, ElementRef, HostBinding, HostListener, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) { this.sanitizer.sanitize(SecurityContext.HTML, elementRef); }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const nativeElementofDirective = this.elementRef.nativeElement as HTMLElement;
    const elementClicked = event.target as HTMLElement;
    this.isOpen = nativeElementofDirective.contains(elementClicked) ? !this.isOpen : false;
  }
}
