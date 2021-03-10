import { NgModule } from '@angular/core';

export type IModuleExtensions = Partial<Pick<NgModule, 'declarations' | 'imports' | 'providers' | 'exports'>>;
