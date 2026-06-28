export type MenuCategory = "all" | "espresso" | "pour-over" | "cold" | "pastries";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: Exclude<MenuCategory, "all">;
  highlight?: string;
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "espresso", label: "Espresso" },
  { id: "pour-over", label: "Pour Over" },
  { id: "cold", label: "Cold Brew" },
  { id: "pastries", label: "Pastries" },
];

export const menuItems: MenuItem[] = [
  {
    id: "espresso",
    name: "Double Espresso",
    description: "Rich, syrupy extraction with a golden crema crown.",
    price: "$4.00",
    category: "espresso",
    highlight: "Signature",
  },
  {
    id: "cortado",
    name: "Cortado",
    description: "Equal parts espresso and steamed milk. Silky, balanced.",
    price: "$4.75",
    category: "espresso",
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Velvety microfoam over a double ristretto base.",
    price: "$5.25",
    category: "espresso",
  },
  {
    id: "v60",
    name: "V60 Pour Over",
    description: "Hand-brewed to highlight origin character and clarity.",
    price: "$6.50",
    category: "pour-over",
    highlight: "Barista's Choice",
  },
  {
    id: "chemex",
    name: "Chemex",
    description: "Clean cup, floral aromatics, served tableside.",
    price: "$7.00",
    category: "pour-over",
  },
  {
    id: "aeropress",
    name: "AeroPress",
    description: "Concentrated, full-bodied, customizable strength.",
    price: "$5.50",
    category: "pour-over",
  },
  {
    id: "nitro",
    name: "Nitro Cold Brew",
    description: "24-hour steep, nitrogen-infused cascade.",
    price: "$6.00",
    category: "cold",
    highlight: "Popular",
  },
  {
    id: "cold-brew",
    name: "Classic Cold Brew",
    description: "Smooth, low-acid, served over hand-cut ice.",
    price: "$5.25",
    category: "cold",
  },
  {
    id: "affogato",
    name: "Affogato",
    description: "Vanilla bean gelato drowned in fresh espresso.",
    price: "$7.50",
    category: "cold",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "Laminated daily. Shatteringly crisp, deeply buttery.",
    price: "$4.50",
    category: "pastries",
  },
  {
    id: "almond-tart",
    name: "Almond Frangipane Tart",
    description: "Toasted almonds, brown butter, house-made pastry.",
    price: "$5.75",
    category: "pastries",
    highlight: "Fresh Daily",
  },
  {
    id: "cannele",
    name: "Canelé",
    description: "Caramelized crust, custard center, Madagascar vanilla.",
    price: "$4.25",
    category: "pastries",
  },
];
