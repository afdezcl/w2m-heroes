import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToUpperCase]'
})
export class ToUpperCaseDirective {

  constructor(
    public reference: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInput(event) {
    this.reference.nativeElement.value = event.target.value.toUpperCase();
  }
}
