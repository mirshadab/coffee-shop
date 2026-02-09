export interface Coffee {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  rating: string;
  reviews: number;
  image: string;
  description: string;
  category: string;
}

export const coffees: Coffee[] = [
  {
    id: "1",
    name: "Caffe Mocha",
    subtitle: "Deep Foam",
    price: "4.53",
    rating: "4.8",
    reviews: 230,
    image: "/images/caffe-mocha.jpg",
    description: "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...",
    category: "All Coffee",
  },
  {
    id: "2",
    name: "Flat White",
    subtitle: "Espresso",
    price: "3.53",
    rating: "4.8",
    reviews: 186,
    image: "/images/flat-white.jpg",
    description: "A flat white is a coffee drink consisting of espresso with microfoam (steamed milk with small, fine bubbles and a glossy consistency).",
    category: "Machiato",
  },
  {
    id: "3",
    name: "Caffe Latte",
    subtitle: "Creamy Milk",
    price: "4.15",
    rating: "4.7",
    reviews: 195,
    image: "/images/caffe-latte.jpg",
    description: "A latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, caffelatte or caffellatte.",
    category: "Latte",
  },
  {
    id: "4",
    name: "Americano",
    subtitle: "Classic Black",
    price: "3.10",
    rating: "4.6",
    reviews: 142,
    image: "/images/americano.jpg",
    description: "Caffè Americano is a type of coffee drink prepared by diluting an espresso with hot water, giving it a similar strength but different flavor.",
    category: "Americano",
  },
  {
    id: "5",
    name: "Espresso",
    subtitle: "Bold Shot",
    price: "2.80",
    rating: "4.9",
    reviews: 310,
    image: "/images/espresso.jpg",
    description: "Espresso is a concentrated form of coffee served in small, strong shots. It is the base for many other coffee drinks.",
    category: "Espresso",
  },
  {
    id: "6",
    name: "Cappuccino",
    subtitle: "Frothy Top",
    price: "4.20",
    rating: "4.7",
    reviews: 220,
    image: "/images/cappuccino.jpg",
    description: "A cappuccino is an espresso-based coffee drink that originated in Italy. It is prepared with steamed milk foam.",
    category: "Cappuccino",
  },
  {
    id: "7",
    name: "Macchiato",
    subtitle: "Espresso Mark",
    price: "3.80",
    rating: "4.5",
    reviews: 168,
    image: "/images/macchiato.jpg",
    description: "Caffè macchiato, sometimes called espresso macchiato, is an espresso coffee drink with a small amount of milk, usually foamed.",
    category: "Machiato",
  },
  {
    id: "8",
    name: "Irish Coffee",
    subtitle: "Whiskey Blend",
    price: "5.20",
    rating: "4.8",
    reviews: 156,
    image: "/images/irish-coffee.jpg",
    description: "Irish coffee is a cocktail consisting of hot coffee, Irish whiskey, and sugar, stirred, and topped with cream.",
    category: "All Coffee",
  },
];
