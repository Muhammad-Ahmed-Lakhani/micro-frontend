import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/home/home.component';
import { RouterModule } from '@angular/router';
import { BlogModule } from '../../projects/mfe-blog/src/app/blog/blog.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlogModule,
    RouterModule.forRoot([
      { path: 'blog', loadChildren: () => import('../../projects/mfe-blog/src/app/blog/blog.module').then(m => m.BlogModule) }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
