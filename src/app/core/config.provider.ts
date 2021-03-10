import { InjectionToken } from '@angular/core';
import { CONFIG } from 'src/app/configs';

export const CONFIG_TOKEN = new InjectionToken('CONFIG', { providedIn: 'root', factory: () => CONFIG });
