export interface Gallery {
  name: string;
  address: string;
  website: string;

  image?: string;
}

export interface GalleryEvent {
  title: string;
  website?: string;

  openDate: Date;
  closeDate: Date;

  gallery: Gallery;

  image?: string;
}
