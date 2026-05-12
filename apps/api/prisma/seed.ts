import { getPrisma } from "../src/lib/prisma.js";

const prisma = getPrisma(process.env.DATABASE_URL!);

async function main() {
  console.log("Starting database seed...");

  // 1. Clean existing data (optional, be careful in production; here we assume safe local dev)
  await prisma.review.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.businessHours.deleteMany();
  await prisma.business.deleteMany();
  await prisma.category.deleteMany();
  await prisma.pincode.deleteMany();
  await prisma.area.deleteMany();
  await prisma.city.deleteMany();
  // We'll leave Users mostly alone, but create mock ones if we need

  // 1. Locations
  console.log("Seeding Locations...");
  const city = await prisma.city.create({
    data: {
      name: "Bangalore",
      slug: "bangalore",
      state: "Karnataka",
      country: "IN",
      areas: {
        create: [
          {
            name: "Indiranagar",
            slug: "indiranagar",
            pincodes: {
              create: [{ code: "560038" }],
            },
          },
          {
            name: "Koramangala",
            slug: "koramangala",
            pincodes: {
              create: [{ code: "560034" }],
            },
          },
        ],
      },
    },
    include: {
      areas: {
        include: { pincodes: true },
      },
    },
  });

  const indiranagar = city.areas.find((a: any) => a.slug === "indiranagar")!;
  const indiranagarPincode = indiranagar.pincodes[0]!;

  // 2. Categories
  console.log("Seeding Categories...");
  await prisma.category.createMany({
    data: [
      { name: "Restaurants", slug: "restaurants", icon: "Utensils", description: "Great places to eat and dine out." },
      { name: "Spa & Salon", slug: "spa-salon", icon: "Scissors", description: "Relax, refresh, and rejuvenate." },
      { name: "Gym & Fitness", slug: "gym-fitness", icon: "Dumbbell", description: "Fitness centers and gyms." },
      { name: "Cafés & Bakeries", slug: "cafes-bakeries", icon: "Coffee", description: "Coffee shops, bakeries, and dessert parlours." },
      { name: "Health & Medical", slug: "health-medical", icon: "HeartPulse", description: "Clinics, hospitals, and healthcare services." },
      { name: "Education & Coaching", slug: "education-coaching", icon: "GraduationCap", description: "Tuitions, coaching centres, and skill classes." },
      { name: "Automotive", slug: "automotive", icon: "Car", description: "Car and bike service, detailing, and accessories." },
      { name: "Home Services", slug: "home-services", icon: "Wrench", description: "Plumbing, electrical, cleaning, and pest control." },
      { name: "Real Estate", slug: "real-estate", icon: "Building2", description: "Property dealers, brokers, and co-working spaces." },
      { name: "Fashion & Apparel", slug: "fashion-apparel", icon: "Shirt", description: "Clothing stores, boutiques, and tailoring." },
      { name: "Electronics & Gadgets", slug: "electronics-gadgets", icon: "Smartphone", description: "Mobile, laptop, and electronics repair and retail." },
      { name: "Entertainment", slug: "entertainment", icon: "Clapperboard", description: "Movie theatres, gaming zones, and amusement parks." },
      { name: "Travel & Tourism", slug: "travel-tourism", icon: "Plane", description: "Travel agencies, tour operators, and holiday packages." },
      { name: "Pet Care", slug: "pet-care", icon: "PawPrint", description: "Veterinary clinics, pet grooming, and supplies." },
      { name: "Photography", slug: "photography", icon: "Camera", description: "Photo studios, event photography, and videography." },
      { name: "Grocery & Essentials", slug: "grocery-essentials", icon: "ShoppingBasket", description: "Supermarkets, kirana stores, and daily essentials." },
      { name: "Legal & Finance", slug: "legal-finance", icon: "Scale", description: "CA firms, lawyers, tax consultants, and insurance." },
      { name: "Events & Party", slug: "events-party", icon: "PartyPopper", description: "Event planners, caterers, and party supplies." },
      { name: "Interior & Decor", slug: "interior-decor", icon: "Paintbrush", description: "Interior designers, furniture stores, and home décor." },
      { name: "Wellness & Yoga", slug: "wellness-yoga", icon: "Leaf", description: "Yoga studios, meditation centres, and wellness retreats." },
    ],
  });

  const categories = await prisma.category.findMany();
  const restaurantCat = categories.find((c) => c.slug === "restaurants")!;
  console.log(`Seeded ${categories.length} categories.`);

  // 3. Mock Users (Owner + Customer)
  // We mock the user ids as strings, similar to what auth might generate.
  console.log("Seeding Users...");
  
  const owner = await prisma.user.upsert({
    where: { email: "owner@mock.com" },
    update: {},
    create: {
      id: "owner_usr_123",
      name: "Alice Owner",
      email: "owner@mock.com",
      role: "business_owner",
      emailVerified: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@mock.com" },
    update: {},
    create: {
      id: "cust_usr_456",
      name: "Bob Customer",
      email: "customer@mock.com",
      role: "user",
      emailVerified: true,
    },
  });

  // 4. Businesses
  console.log("Seeding Businesses...");
  const b1 = await prisma.business.create({
    data: {
      name: "The Great Indian Thali",
      slug: "great-indian-thali",
      description: "Authentic Indian cuisine with unlimited servings.",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
      phone: "+91-9876543210",
      email: "hello@greatindianthali.in",
      addressLine: "100 Feet Road",
      areaId: indiranagar.id,
      pincodeId: indiranagarPincode.id,
      categoryId: restaurantCat.id,
      ownerId: owner.id,
      featured: true,
      verified: true,
      hours: {
        create: [
          { dayOfWeek: 1, openTime: "11:00", closeTime: "23:00" },
          { dayOfWeek: 2, openTime: "11:00", closeTime: "23:00" },
          { dayOfWeek: 3, openTime: "11:00", closeTime: "23:00" },
          { dayOfWeek: 4, openTime: "11:00", closeTime: "23:00" },
          { dayOfWeek: 5, openTime: "11:00", closeTime: "23:00" },
          { dayOfWeek: 6, openTime: "11:00", closeTime: "23:30" }, // Saturday
          { dayOfWeek: 0, openTime: "11:00", closeTime: "23:30" }, // Sunday
        ],
      },
      deals: {
        create: [
          {
            title: "50% Off Lunch Buffet",
            slug: "50-off-lunch-buffet",
            description: "Enjoy our widespread thali buffet at flat 50% discount during weekdays.",
            originalPrice: 1000,
            discountedPrice: 500,
            discount: 50,
            highlights: ["Unlimited Servings", "Welcome Drink", "Live Chaat Counter"],
            finePrint: ["Valid Monday to Friday", "Cannot be combined with other offers"],
            categoryId: restaurantCat.id,
            featured: true,
          },
          {
            title: "Complimentary Dessert",
            slug: "free-dessert-dinner",
            description: "Get a free dessert of your choice with every dinner meal.",
            originalPrice: 200,
            discountedPrice: 0,
            discount: 100,
            highlights: ["Choice of Gulab Jamun or Rasmalai"],
            finePrint: ["Valid with minimum bill of ₹500", "One per table"],
            categoryId: restaurantCat.id,
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: "Absolutely loved the food! The service was very prompt.",
            userId: customer.id,
          },
        ],
      },
    },
  });

  console.log(`Created business: ${b1.name}`);
  console.log("✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
