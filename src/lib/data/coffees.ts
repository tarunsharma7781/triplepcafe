export interface Coffee {
  id: string;
  name: string;
  origin: string;
  notes: string[];
  price: string;
  roast: string;
  image: string;
}

export const signatureCoffees: Coffee[] = [
  {
    id: "triple-point",
    name: "Triple Point Espresso",
    origin: "Ethiopia · Colombia · Guatemala",
    notes: ["Dark chocolate", "Caramel", "Orange zest"],
    price: "$5.50",
    roast: "Medium-Dark",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
  },
  {
    id: "golden-hour",
    name: "Golden Hour Latte",
    origin: "Single Origin · Yirgacheffe",
    notes: ["Honey", "Jasmine", "Stone fruit"],
    price: "$6.25",
    roast: "Light",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
  },
  {
    id: "midnight-velvet",
    name: "Midnight Velvet",
    origin: "Brazil · Sul de Minas",
    notes: ["Hazelnut", "Cocoa nib", "Brown sugar"],
    price: "$5.75",
    roast: "Dark",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
  {
    id: "origin-pour",
    name: "Origin Pour Over",
    origin: "Kenya · Nyeri",
    notes: ["Blackcurrant", "Tomato", "Wine"],
    price: "$7.00",
    roast: "Light-Medium",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    origin: "Double Espresso · Steamed Milk",
    notes: ["Caramel", "Cinnamon", "Vanilla"],
    price: "$6.80",
    roast: "Signature",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80",
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    origin: "Ceremonial Matcha · Oat Milk",
    notes: ["Matcha", "Creamy", "Japan"],
    price: "$6.90",
    roast: "Refresh",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=800&q=80",
  },
];
