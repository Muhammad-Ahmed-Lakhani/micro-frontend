import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBlogComponent } from './blog/list-blog/list-blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';

const routes: Routes = [
  { path: 'blog', component: ListBlogComponent },
  { path: 'blog/:blogName', component: ViewBlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
