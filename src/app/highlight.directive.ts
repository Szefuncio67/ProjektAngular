import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: { current: number | undefined; next: number | undefined } = { current: undefined, next: undefined };

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(false);
  }

  private highlight(shouldHighlight: boolean) {
    const containers = document.querySelectorAll('.ngFor-container');

    containers.forEach((container, index) => {
      if (index === this.appHighlight.current || index === this.appHighlight.next) {
        if (shouldHighlight) {
          container.classList.add('highlighted-leg');
        } else {
          container.classList.remove('highlighted-leg');
        }
      }
    });
  }
}