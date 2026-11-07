export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the image is cropped to a frame */
  position?: string;
  /** "contain" for artwork that must not be cropped (e.g. the logo). Default "cover". */
  fit?: "cover" | "contain";
  /** Visible disclosure for historical label details or illustrative imagery. */
  note?: string;
};

export type Variant = {
  id: string;
  label: string;
  /** e.g. "1 กก." — null while the owner has not confirmed it */
  weightLabel: string | null;
  /** Price in THB — null while the owner has not confirmed it */
  price: number | null;
};

export type ProductDetail = { label: string; value: string | null };

export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  summary: string;
  description: string;
  images: ProductImage[];
  variants: Variant[];
  details: ProductDetail[];
  /** Storage advice — null until confirmed by the owner */
  storage: string | null;
};

export type CartItem = { productId: string; variantId: string; qty: number };
