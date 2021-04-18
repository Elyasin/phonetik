import {TestBed} from '@angular/core/testing';

import {FontListService} from './font-list.service';
import {ElectronService} from 'ngx-electron';
import {IpcRenderer} from 'electron';

describe('FontListService', () => {

  const fontsList = ['Arial', 'Verdana'];

  let service: FontListService;
  let electronServiceStub: Partial<ElectronService>;
  let ipcRendererStub: Partial<Electron.IpcRenderer>;

  beforeEach(() => {
    ipcRendererStub = {
      sendSync: jest.fn().mockReturnValue(fontsList)
    };

    electronServiceStub = {
      ipcRenderer: ipcRendererStub as IpcRenderer
    };

    TestBed.configureTestingModule({
      providers: [{provide: ElectronService, useValue: electronServiceStub}]
    });
    service = TestBed.inject(FontListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of fonts', () => {
    expect(service.getFontList()).toEqual(fontsList);
  });

  it('should not get fonts list if fonts already retrieved', () => {
    let fonts = service.getFontList();
    expect(fonts).toEqual(fontsList);
    fonts = service.getFontList();
    expect(ipcRendererStub.sendSync).toHaveBeenCalledTimes(1);
    expect(fonts).toEqual(fontsList);
  });

});
