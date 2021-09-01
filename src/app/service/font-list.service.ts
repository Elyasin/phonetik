import {Injectable} from '@angular/core';
import {ipcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FontListService {

  private fonts: string[] = [];

  /**
   * Returns an array of font names.
   * The list of fonts is requested if it was not requested before.
   * Otherwise the previously requested is returned.
   */
  getFontList(): string[] {
    if (this.fonts.length === 0) {
      this.fonts = ipcRenderer.sendSync('request-font-list');
    }
    return this.fonts;
  }

}
