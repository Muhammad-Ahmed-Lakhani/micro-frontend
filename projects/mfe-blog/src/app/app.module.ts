import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BlogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
