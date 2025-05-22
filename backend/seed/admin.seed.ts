// seed/admin.seed.ts
import 'reflect-metadata';

import { AppDataSource } from '../src/config/data-source';
import { hashPassword } from '../src/utils/hash';
import { User } from '../src/entities/User';

async function seedAdmin() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const existingAdmin = await userRepo.findOneBy({ role: 'Admin' });

  if (existingAdmin) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const admin = userRepo.create({
    username: 'admin',
    password: await hashPassword('admin123'), // use strong password in real setup
    role: 'Admin',
  });

  await userRepo.save(admin);
  console.log('Admin user created successfully');
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('Failed to seed admin:', err);
  process.exit(1);
});
