import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FooterModule } from './components/footer/footer.module';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './components/layout/layout.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

/**
 * Modulos que componen la navegación son
 * @module ToolbarModule Barra Superior
 * @module SidenavModule Barra Lateral
 * @module FooterModule Barra de abajo
 */
const navigationModules = [ToolbarModule, LayoutModule, FooterModule];
@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    navigationModules,
  ],
  exports: [NavigationBarComponent, navigationModules],
})
export class NavigationModule {}
