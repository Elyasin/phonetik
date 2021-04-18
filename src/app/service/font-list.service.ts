import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class FontListService {

  private fonts: string[] = [];

  constructor(private electronService: ElectronService) {
  }

  /**
   * Returns an array of font names.
   */
  getFontList(): string[] {
    if (this.fonts.length === 0) {
      this.fonts = this.electronService.ipcRenderer.sendSync('request-font-list');
    }
    return this.fonts;
  }

}
