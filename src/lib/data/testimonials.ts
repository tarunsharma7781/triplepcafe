export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The most refined coffee experience in the city. Every pour feels intentional, every sip unforgettable.",
    author: "Elena Vasquez",
    role: "Food & Wine Editor",
  },
  {
    id: "2",
    quote:
      "Triple Point doesn't just serve coffee — they curate moments. The space alone is worth the visit.",
    author: "Marcus Chen",
    role: "Architect & Regular",
  },
  {
    id: "3",
    quote:
      "I've traveled to Tokyo, Melbourne, and Copenhagen for coffee. This rivals the best of them.",
    author: "Sophie Laurent",
    role: "Coffee Consultant",
  },
  {
    id: "4",
    quote:
      "The Golden Hour Latte changed my morning ritual. Subtle, complex, absolutely perfect.",
    author: "James Okonkwo",
    role: "Creative Director",
  },
  {
    id: "5",
    quote:
      "A sanctuary of warmth and precision. The baristas remember your order and your story.",
    author: "Amara Patel",
    role: "Local Artist",
  },
];
