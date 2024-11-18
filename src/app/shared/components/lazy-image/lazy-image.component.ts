import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyimage',
  templateUrl: './lazy-image.component.html',
})
export class LazyimageComponent implements OnInit {
  @Input()
  // "!" signo de admiracion que indica que siempre vendra, se agrega porque no se declara como string vacio por venir siempre
  public url!: string;
  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required.');
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
