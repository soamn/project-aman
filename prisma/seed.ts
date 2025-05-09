import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function main() {
  const hashedPassword = await bcrypt.hash("@#Login@aman.negi", 10);
  await prisma.user.create({
    data: {
      email: "aman.negi@negi.com",
      password: hashedPassword,
      name: "Aman Negi",
    },
  });
  console.log("✅ User seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
