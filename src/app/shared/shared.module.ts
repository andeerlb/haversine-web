import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JsonpModule } from '@angular/http';

/* components */
import { CardComponent } from './components/card/card.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TabContentComponent } from './components/tabset/tab-content/tab-content.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AlertComponent } from './components/alert/alert.component';
import { WeatherComponent } from './components/weather/weather.component';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    JsonpModule,
  ],
  declarations: [
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    WeatherComponent
  ],
  exports: [
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    WeatherComponent,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
