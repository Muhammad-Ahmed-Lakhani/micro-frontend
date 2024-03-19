import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../../src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { PipesModule } from '../../../../../src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    ListBlogComponent,
    ViewBlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule
      .forChild([
        { path: '', component: ListBlogComponent },
        { path: 'blog/:blogName', component: ViewBlogComponent }
      ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    PipesModule
  ],
  exports: [
    ListBlogComponent,
    ViewBlogComponent
  ]
})
export class BlogModule { }
