import { Component, Input } from '@angular/core';

export interface Tag {
  id: number;
  name: string;
}

/**
 * Tag things.
 *
 * **When To Use**
 *
 * To show a set of removable items
 */
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  /** List of tag elements */
  @Input() tags: Tag[];
  /** Function which gets called when a tag is removed */
  @Input() onTagRemove: (tag: Tag) => void;
}
