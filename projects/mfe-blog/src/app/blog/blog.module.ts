import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../../src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    ListBlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ListBlogComponent }
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ]
})
export class BlogModule { }
