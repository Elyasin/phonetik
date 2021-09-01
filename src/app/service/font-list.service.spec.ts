import {TestBed} from '@angular/core/testing';
import {FontListService} from './font-list.service';
import {ipcRenderer} from 'electron';

jest.mock('electron', () => ({
    ipcRenderer: {
      sendSync: jest.fn().mockReturnValue(['Arial', 'Verdana'])
    }
  })
);

describe('FontListService', () => {

  const fontsList = ['Arial', 'Verdana'];

  let service: FontListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontListService);
  });

  afterEach(() => jest.clearAllMocks());

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
    expect(ipcRenderer.sendSync).toHaveBeenCalledTimes(1);
    expect(fonts).toEqual(fontsList);
  });

});
