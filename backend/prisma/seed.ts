import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create Appointment Slots for Next 3 Days 
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= 3; d++) {  
    const date = new Date(today);
    date.setDate(today.getDate() + d);

    for (let hour = 8; hour <= 16; hour += 2) {  
      const slot = new Date(date);
      slot.setHours(hour);
      slot.setMinutes(0, 0, 0);

      await prisma.appointmentSlot.upsert({
        where: { dateTime: slot },
        update: {},
        create: { dateTime: slot },
      });
    }
  }

  console.log('✅ Seed data created: Admin user and slots for next 3 days');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
