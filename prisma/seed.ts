import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.chatMessage.deleteMany();
  await prisma.orderDelivery.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.deliveryAgent.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  // Admin user
  await prisma.user.create({
    data: {
      id: "admin-1",
      name: "Admin",
      email: "admin@javagem.com",
      password: adminPassword,
      role: "ADMIN",
      phone: "+1234567890",
    },
  });

  // Test customer
  await prisma.user.create({
    data: {
      id: "customer-1",
      name: "Jooklyn Simmons",
      email: "jooklyn@email.com",
      password: hashedPassword,
      role: "CUSTOMER",
      phone: "+1987654321",
    },
  });

  // Delivery agent user
  await prisma.user.create({
    data: {
      id: "agent-user-1",
      name: "James Wilson",
      email: "james@javagem.com",
      password: hashedPassword,
      role: "DELIVERY_AGENT",
      phone: "+1555123456",
    },
  });

  // Delivery agent profile
  await prisma.deliveryAgent.create({
    data: {
      id: "agent-1",
      name: "James Wilson",
      phone: "+1555123456",
      available: true,
    },
  });

  // Products (coffees)
  const coffees = [
    {
      name: "Caffe Mocha",
      subtitle: "Deep Foam",
      price: 4.53,
      rating: 4.8,
      reviews: 230,
      image: "/images/caffe-mocha.jpg",
      description: "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...",
      category: "All Coffee",
    },
    {
      name: "Flat White",
      subtitle: "Espresso",
      price: 3.53,
      rating: 4.8,
      reviews: 186,
      image: "/images/flat-white.jpg",
      description: "A flat white is a coffee drink consisting of espresso with microfoam (steamed milk with small, fine bubbles and a glossy consistency).",
      category: "Machiato",
    },
    {
      name: "Caffe Latte",
      subtitle: "Creamy Milk",
      price: 4.15,
      rating: 4.7,
      reviews: 195,
      image: "/images/caffe-latte.jpg",
      description: "A latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, caffelatte or caffellatte.",
      category: "Latte",
    },
    {
      name: "Americano",
      subtitle: "Classic Black",
      price: 3.10,
      rating: 4.6,
      reviews: 142,
      image: "/images/americano.jpg",
      description: "Caffè Americano is a type of coffee drink prepared by diluting an espresso with hot water, giving it a similar strength but different flavor.",
      category: "Americano",
    },
    {
      name: "Espresso",
      subtitle: "Bold Shot",
      price: 2.80,
      rating: 4.9,
      reviews: 310,
      image: "/images/espresso.jpg",
      description: "Espresso is a concentrated form of coffee served in small, strong shots. It is the base for many other coffee drinks.",
      category: "Espresso",
    },
    {
      name: "Cappuccino",
      subtitle: "Frothy Top",
      price: 4.20,
      rating: 4.7,
      reviews: 220,
      image: "/images/cappuccino.jpg",
      description: "A cappuccino is an espresso-based coffee drink that originated in Italy. It is prepared with steamed milk foam.",
      category: "Cappuccino",
    },
    {
      name: "Macchiato",
      subtitle: "Espresso Mark",
      price: 3.80,
      rating: 4.5,
      reviews: 168,
      image: "/images/macchiato.jpg",
      description: "Caffè macchiato, sometimes called espresso macchiato, is an espresso coffee drink with a small amount of milk, usually foamed.",
      category: "Machiato",
    },
    {
      name: "Irish Coffee",
      subtitle: "Whiskey Blend",
      price: 5.20,
      rating: 4.8,
      reviews: 156,
      image: "/images/irish-coffee.jpg",
      description: "Irish coffee is a cocktail consisting of hot coffee, Irish whiskey, and sugar, stirred, and topped with cream.",
      category: "All Coffee",
    },
  ];

  for (const coffee of coffees) {
    await prisma.product.create({ data: coffee });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
