import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: string, private afs: AngularFirestore) { }

  blogs: any[] = [];
  wait: boolean = false;
  currentPage = '';
  p: number = 1
  maxSize: number = 5

  calculateReadTime(blogsData: any) {
    blogsData?.forEach((blog: any) => {
      const blogDescriptionLength = blog.description?.split(" ").length;
      let sectionDescriptionsLength: any = 0;
      blog?.sections?.forEach((section: any) => {
        sectionDescriptionsLength += section.description?.split(" ").length;
      });
      const totalTime = (blogDescriptionLength + sectionDescriptionsLength) / 200;
      blog.readTime = Math.floor(totalTime) === 0 ? 1 : Math.floor(totalTime);
    })
    return blogsData;
  }

  pageChangeScrollTop(p?: any) {
    if (this.currentPage !== p) {
      if (isPlatformBrowser(this.platformId)) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
    this.currentPage = p;
  }

  async getBlogs() {
    let blogSnaps: any = [];

    const data: any = await this.afs.collection('blogs', ref => ref.where('status', '==', 'publish').orderBy('lastEdited', 'desc')).snapshotChanges().pipe(take(1)).toPromise();
    data.forEach((element: any) => {
      const item = element.payload.doc.data() as any;
      item.id = element.payload.doc.id;
      blogSnaps.push(item)
    });
    this.blogs = this.calculateReadTime(blogSnaps);
    console.log("BLOGS", this.blogs)
  }

  async ngOnInit() {
    console.log("MICRO-FE BLOG");
    await this.getBlogs();
  }

}
