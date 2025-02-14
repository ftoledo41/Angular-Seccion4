import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInpunt!: ElementRef<HTMLInputElement>;

  // Debemos inyetar el servicio en el constructor
  constructor(private gifsService: GifsService) {}

  // Metodo
  searchTag() {
    const newTag = this.tagInpunt.nativeElement.value;
    
    this.gifsService.searchTag(newTag);

    this.tagInpunt.nativeElement.value = "";
  }
}
