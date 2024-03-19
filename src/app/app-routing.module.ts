import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const MFE_BLOG_URL = 'http://localhost:4300/remoteEntry.js'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  // {
  //   path: 'blog',
  //   loadChildren: () => loadRemoteModule({
  //     remoteEntry: MFE_BLOG_URL,
  //     remoteName: 'mfeBlog',
  //     exposedModule: './BlogModule'
  //   }).then((m) => m.BlogModule).catch((err) => console.log("Error", err))
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
