import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FooterModule } from './components/footer/footer.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './components/layout/layout.module';
import { AlertModule } from '../alert/alert.module';
// import { FooterComponent } from './c./footer/footer/footer.component;

/**
 * Modulos que componen la navegación son
 * @module ToolbarModule Barra Superior
 * @module SidenavModule Barra Lateral
 * @module FooterModule Barra de abajo
 */
const navigationModules = [ToolbarModule, LayoutModule, FooterModule];
@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AlertModule,
    navigationModules,
  ],
  exports: [NavigationComponent, navigationModules],
})
export class NavigationModule {}
