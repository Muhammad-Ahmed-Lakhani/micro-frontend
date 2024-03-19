import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'blog-view-page',
  templateUrl: 'view-blog.component.html',
  styleUrls: ['view-blog.component.scss']
})

export class ViewBlogComponent implements OnInit {
  constructor(private afs: AngularFirestore, private route: ActivatedRoute,
    private router: Router, private meta: Meta, @Inject(PLATFORM_ID) private platformId: string) { }

  blog: any;
  readTime: any;
  lastUpdated: any;
  blogs: any = [];
  prevBlog: any;
  prevBlogImage: any;
  nextBlog: any;
  nextBlogImage: any;
  loadingData: boolean = true;
  fallbackImg = '../../../../assets/images/fallback.jpg';
  viewPagination: any;
  collection: any;

  youtubeUrlMatch = [
    /https:\/\/www.youtube.com\/watch\?v=([^&]+)/,
    /https:\/\/youtu.be\/([^&]+)/,
    /https:\/\/www.youtube.com\/live\/([^&]+)/
  ];

  calculateUpdatedTime() {
    const currentTime: any = new Date();
    const inputTime: any = new Date(this.blog.lastEdited.seconds * 1000 + this.blog.lastEdited.nanoseconds / 1000000);
    const lastEditedDate = new Date(this.blog.lastEdited.seconds * 1000 + this.blog.lastEdited.nanoseconds / 1000000).toLocaleDateString();

    const timeDifference = currentTime - inputTime;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    if (minutesDifference <= 30) {
      this.lastUpdated = 'Just Now';
    } else {
      this.lastUpdated = lastEditedDate;
    }
  }
  calculateReadTime() {
    const blogDescriptionLength = this.blog?.description?.split(" ").length;
    let sectionDescriptionsLength: any = 0;

    this.blog?.sections?.forEach((section: any) => {
      sectionDescriptionsLength += section?.description?.split(" ").length;
      const urlResponse = this.checkUrl(section.url)
      if (urlResponse.match) {
        section.url = `https://www.youtube.com/embed/${urlResponse.videoId}`
        section.validUrl = urlResponse.match
      } else {
        section.validUrl = urlResponse.match
      }
    });
    const totalTime = (blogDescriptionLength + sectionDescriptionsLength) / 200;
    this.readTime = Math.floor(totalTime) === 0 ? 1 : Math.floor(totalTime);

  }

  checkUrl(url: string) {
    let match: boolean = false;
    let videoId: any;

    for (const youtubeUrl of this.youtubeUrlMatch) {
      const matchResult = url.match(youtubeUrl);
      if (matchResult) {
        videoId = matchResult[1];
        match = true;
        break;
      }
    }

    return { match, videoId };
  }

  async prev() {
    if (this.prevBlog.title) {
      await this.getDocumentWithPreviousAndNext(this.prevBlog.title)
      this.router.navigate([`/blog/${this.blog?.title.replaceAll(' ', '-')}`]);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  async next() {
    if (this.nextBlog.title) {
      await this.getDocumentWithPreviousAndNext(this.nextBlog.title)
      this.router.navigate([`/blog/${this.blog?.title.replaceAll(' ', '-')}`]);
      if (isPlatformBrowser(this.platformId)) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    this.loadingData = true;
    this.viewPagination = this.route.snapshot.routeConfig?.path?.includes('preview');
    this.collection = this.viewPagination ? 'previews' : 'blogs';
    const blogName = this.route.snapshot.params?.blogName;
    console.log(blogName)
    // if (!blogName) return this.notify.update("No ID found!", 'error');

    await this.getDocumentWithPreviousAndNext(blogName);
    this.loadingData = false;
  }

  setBlogMeta() {
    this.meta.addTags([
      { name: 'title', content: this.blog.title },
      { name: 'description', content: this.blog.metaDescription },
      { name: 'keywords', content: this.blog?.tags.join(',') }
    ]);
  }

  async getDocumentWithPreviousAndNext(docName: any) {

    const [blogResp] = await this.afs.collection(this.collection, ref => ref.where('title', '==', docName?.replaceAll('-', ' '))).valueChanges({ idField: 'id' }).pipe(take(1)).toPromise();
    this.blog = blogResp;
    this.setBlogMeta();

    if (this.collection === 'blogs') {
      const prevBlogQuery = this.afs.collection('blogs', ref => ref.where('status', '==', 'publish').orderBy('lastEdited', 'desc')
        .endBefore(this.blog.lastEdited)
        .limitToLast(1)).valueChanges({ idField: 'id' }).pipe(take(1)).toPromise();

      const nextBlogQuery = this.afs.collection('blogs', ref => ref.where('status', '==', 'publish').orderBy('lastEdited', 'desc')
        .startAfter(this.blog.lastEdited)
        .limit(1)).valueChanges({ idField: 'id' }).pipe(take(1)).toPromise();

      const [previousDoc, nextDoc] = await Promise.all([prevBlogQuery, nextBlogQuery]);

      if (previousDoc.length > 0) {
        this.prevBlog = previousDoc[0];
        this.prevBlog.id = previousDoc[0].id;
        this.prevBlogImage = this.prevBlog?.coverImageFile?.coverImageUrl ? this.prevBlog.coverImageFile.coverImageUrl : this.fallbackImg;
      } else {
        this.prevBlog = null;
        this.prevBlogImage = null;
      }

      if (nextDoc.length > 0) {
        this.nextBlog = nextDoc[0];
        this.nextBlog.id = nextDoc[0].id;
        this.nextBlogImage = this.nextBlog?.coverImageFile?.coverImageUrl ? this.nextBlog.coverImageFile.coverImageUrl : this.fallbackImg;
      } else {
        this.nextBlog = null;
        this.nextBlogImage = null;
      }
    }

    console.log("PREV", this.prevBlog)
    console.log("BLOG", this.blog)
    console.log("NEXT", this.nextBlog)

    this.calculateReadTime();
    this.calculateUpdatedTime();
  }
}