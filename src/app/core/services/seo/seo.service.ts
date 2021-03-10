import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ContentService } from '../content/content.service';
import { PageTypes } from 'src/app/configs/pagetypes';
import { PanelService } from '../panel/panel.service';
import { getUrlPathname, getUrlQueryParams, ensureNever } from 'src/app/core/shop/utils';
import { Router } from '@angular/router';

interface Options {
  moreToLoad: boolean;
  fallbackData: {
    title: string;
    description: string;
    img: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  metaData: MetaDefinition[] = [];
  prevLink: HTMLLinkElement;
  nextLink: HTMLLinkElement;

  constructor(
    private meta: Meta,
    private contentService: ContentService,
    private panelService: PanelService,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  private removeLinks() {
    if (this.prevLink) {
      this.doc.head.removeChild(this.prevLink);
    }
    if (this.nextLink) {
      this.doc.head.removeChild(this.nextLink);
    }
  }

  private createDirectionalLinks(prevUrl: string, nextUrl: string) {
    this.removeLinks();
    if (prevUrl && prevUrl !== '') {
      const link: HTMLLinkElement = this.doc.createElement('link');
      link.id = 'prev';
      link.setAttribute('rel', 'prev');
      link.setAttribute('href', prevUrl);
      this.prevLink = link;
      this.doc.head.appendChild(this.prevLink);
    }

    if (nextUrl && nextUrl !== '') {
      const link: HTMLLinkElement = this.doc.createElement('link');
      link.id = 'next';
      link.setAttribute('rel', 'next');
      link.setAttribute('href', nextUrl);
      this.nextLink = link;
      this.doc.head.appendChild(this.nextLink);
    }
  }

  private resetMetaTags() {
    this.meta.removeTag(`name='robots'`);
    this.meta.removeTag(`name='title'`);
    this.meta.removeTag(`name='description'`);
    this.meta.removeTag(`name='og:title'`);
    this.meta.removeTag(`name='og:description'`);
    this.meta.removeTag(`name='og:image'`);
    this.meta.removeTag(`name='og:site_name'`);
    this.metaData = [];
  }

  private seoForHome(options: Options = null) {
    this.metaData.push({ name: 'robots', content: 'index, follow' });

    this.contentService.getHomepageContents().subscribe((data: any) => {
      const title = data.seo.title ? data.seo.title : options.fallbackData.title;
      this.metaData.push({ name: 'title', content: title });
      this.metaData.push({
        name: 'description',
        content: data.seo.description ? data.seo.description : options.fallbackData.description,
      });
      this.metaData.push({
        name: 'og:title',
        content: data.seo.og.title ? data.seo.og.title : options.fallbackData.title,
      });
      this.metaData.push({
        name: 'og:description',
        content: data.seo.og.description ? data.seo.og.description : options.fallbackData.description,
      });
      this.metaData.push({
        name: 'og:image',
        content: data.seo.og.image ? data.seo.og.image : options.fallbackData.img,
      });
      this.metaData.push({
        name: 'og:site_name',
        content: data.seo.og.site_name ? data.seo.og.site_name : options.fallbackData.title,
      });
      this.titleService.setTitle(title);
      this.meta.addTags(this.metaData);
    });
  }

  private seoForPlp(options: Options = null) {
    // set link prev & next
    const currentUrl: string = this.router.url;
    const urlBase: string = getUrlPathname(currentUrl);
    const params: any = getUrlQueryParams(currentUrl);
    let prevUrl = '';
    let nextUrl = '';

    if (!params.page) {
      nextUrl = urlBase + '?page=2';
    } else {
      prevUrl = params.page === '2' ? urlBase : urlBase + '?page=' + (parseInt(params.page, 10) - 1);
      nextUrl = urlBase + '?page=' + (parseInt(params.page, 10) + 1);
    }
    if (!options.moreToLoad) {
      nextUrl = '';
    }

    this.createDirectionalLinks(prevUrl, nextUrl);

    this.metaData.push({ name: 'robots', content: 'noindex, follow' });

    this.panelService.getPlpSeo().subscribe((data: any) => {
      const title = data.seo.title ? data.seo.title : options.fallbackData.title;
      this.metaData.push({ name: 'title', title });
      this.metaData.push({
        name: 'description',
        content: data.seo.description ? data.seo.description : options.fallbackData.description,
      });
      this.metaData.push({
        name: 'og:title',
        content: data.seo.og.title ? data.seo.og.title : options.fallbackData.title,
      });
      this.metaData.push({
        name: 'og:description',
        content: data.seo.og.description ? data.seo.og.description : options.fallbackData.description,
      });

      this.metaData.push({
        name: 'og:image',
        content: data.seo.og.image ? data.seo.og.image : options.fallbackData.img,
      });
      this.metaData.push({
        name: 'og:site_name',
        content: data.seo.og.site_name ? data.seo.og.site_name : data.seo.title,
      });
      this.titleService.setTitle(title);
      this.meta.addTags(this.metaData);
    });
  }

  seoForPdp(options: Options = null) {
    this.metaData = [];
    this.metaData.push({ name: 'robots', content: 'index, follow' });

    this.panelService.getPdpSeo().subscribe((data: any) => {
      const title = data.seo.title ? data.seo.title : options.fallbackData.title;
      this.metaData.push({ name: 'title', content: title });
      this.metaData.push({
        name: 'description',
        content: data.seo.description ? data.seo.description : options.fallbackData.description,
      });
      this.metaData.push({
        name: 'og:title',
        content: data.seo.og.title ? data.seo.og.title : options.fallbackData.title,
      });
      this.metaData.push({
        name: 'og:description',
        content: data.seo.og.description ? data.seo.og.description : options.fallbackData.description,
      });

      this.metaData.push({
        name: 'og:image',
        content: data.seo.og.image ? data.seo.og.image : options.fallbackData.img,
      });
      this.metaData.push({
        name: 'og:site_name',
        content: data.seo.og.site_name ? data.seo.og.site_name : options.fallbackData.title,
      });
      this.titleService.setTitle(title);
      this.meta.addTags(this.metaData);
    });
  }

  seoForSearchPage(options: Options = null) {
    this.metaData = [];
    this.metaData.push({ name: 'robots', content: 'noindex, nofollow' });

    this.panelService.getSearchPageSeo().subscribe((data: any) => {
      this.metaData.push({ name: 'title', content: data.seo.title });
      this.metaData.push({ name: 'description', content: data.seo.description });
      this.titleService.setTitle(data.seo.description);
      this.meta.addTags(this.metaData);
    });
  }

  seoForBasket(options: Options = null) {
    this.metaData = [];
    this.metaData.push({ name: 'robots', content: 'index, nofollow' });
    this.metaData.push({ name: 'title', content: options.fallbackData.title });
    this.metaData.push({ name: 'description', content: options.fallbackData.description });
    this.titleService.setTitle(options.fallbackData.title);
    this.meta.addTags(this.metaData);
  }

  loadSeoMetadata(pageType: PageTypes, options: Options = null) {
    this.resetMetaTags();
    this.metaData.push({ name: 'og:type', content: 'website' });

    switch (pageType) {
      case PageTypes.HOME: {
        this.seoForHome(options);
        break;
      }
      case PageTypes.PLP: {
        this.seoForPlp(options);
        break;
      }
      case PageTypes.PDP: {
        this.seoForPdp(options);
        break;
      }
      case PageTypes.SEARCH: {
        this.seoForSearchPage(options);
        break;
      }
      case PageTypes.BASKET: {
        this.seoForBasket(options);
        break;
      }
      default: {
        ensureNever(pageType);
        break;
      }
    }
  }
}
