import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './services/http.service'
import { AuthenticationService } from './services/authentication.service';
import { TribeService } from './services/tribe.service';

import { WidgetModule } from './widget/widget.module';
import { AppComponent } from './app.component';
import { EngageComponent } from './engage/engage.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EngageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    WidgetModule
  ],
  exports: [
    CustomMaterialModule,
    EngageComponent
  ],
  providers: [HttpService,
              AuthenticationService,
              TribeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
