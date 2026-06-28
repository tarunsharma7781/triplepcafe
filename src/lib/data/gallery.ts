export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    alt: "Latte art being poured",
    aspect: "tall",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    alt: "Coffee beans close up",
    aspect: "square",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    alt: "Café interior ambiance",
    aspect: "wide",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    alt: "Barista crafting pour over",
    aspect: "tall",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80",
    alt: "Espresso extraction",
    aspect: "square",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    alt: "Cozy café seating",
    aspect: "wide",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    alt: "Fresh roasted beans",
    aspect: "tall",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    alt: "Morning coffee ritual",
    aspect: "square",
  },
  {
    id: "9",
    src: "/gallery-1.jpg",
    alt: "Triple Point Coffee",
    aspect: "wide",
  },
  {
    id: "10",
    src: "/gallery-2.jpg",
    alt: "Triple Point Coffee",
    aspect: "tall",
  },
  {
    id: "11",
    src: "/gallery-3.jpg",
    alt: "Triple Point Coffee",
    aspect: "square",
  },
  {
    id: "12",
    src: "/gallery-4.jpg",
    alt: "Triple Point Coffee",
    aspect: "wide",
  },
];
