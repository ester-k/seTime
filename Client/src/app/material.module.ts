import { NgModule } from '@angular/core';
import { MatInputModule, } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRippleModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

//import {MatFormFieldControl} from '@angular/material/form-field';
//import { MatIconRegistry } from "@angular/material"

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatFormFieldModule,
  MatIconModule,
  MatDialogModule,
  MatStepperModule,
  MatListModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatDividerModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatRippleModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatChipsModule,
  MatTreeModule,
  MatTabsModule,
  MatExpansionModule,
 // MatFormFieldControl
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}


