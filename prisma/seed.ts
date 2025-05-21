import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
type password = string;
type email = string;
export async function main() {
  const pass = <password>process.env.EMAIL_PASSWORD;
  const email = <password>process.env.EMAIL_ID;
  const hashedPassword = await bcrypt.hash(pass, 10);
  await prisma.user.create({
    data: {
      email: email,
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
