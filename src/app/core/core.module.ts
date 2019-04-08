import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// guard
import { AuthGuard } from './guard/auth.guard';

// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
} from '@angular/material';

import { OwlModule } from 'ngx-owl-carousel';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
//Component
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SidebarUserdetailsComponent } from './components/sidebar-userdetails/sidebar-userdetails.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import {AddressComponent} from '../core/components/address/address.component';
import { ChartsModule } from 'ng2-charts';
//services 
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { LightboxModule } from 'ngx-lightbox';
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCwmrD9NEiBAtmQS8_UfaIO4wFg99N8MU'
    }),
    NgbModule.forRoot(),
    ChartsModule,


    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//

    OwlModule,
    NgxImageGalleryModule,
    LightboxModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarButtonComponent,
    SidebarMenuComponent,
    SidebarUserdetailsComponent,
    UserSidebarComponent,
   AddressComponent,
   SearchBarComponent
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//
    OwlModule,
    NgxImageGalleryModule,
    LightboxModule,
    HeaderComponent,
    FooterComponent,
    SidebarButtonComponent,
    SidebarMenuComponent,
    SidebarUserdetailsComponent,
    UserSidebarComponent,
    AddressComponent,
    SearchBarComponent,
    NgbModule,
    ChartsModule

  ],
  entryComponents: [
    AddressComponent
  ]
})

export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        UserService,
        ProductService,
        CartService
      ]
    };
  }
}
