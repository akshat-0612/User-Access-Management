// src/services/auth.service.ts
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async signup(username: string, password: string) {
    const existingUser = await this.userRepo.findOneBy({ username });
    if (existingUser) throw new Error("Username already taken");

    const hashed = await hashPassword(password);
    const user = this.userRepo.create({
      username,
      password: hashed,
      role: "Employee",
    });
    await this.userRepo.save(user);
    return { message: "Employee created" };
  }

  async createUser(
    username: string,
    password: string,
    role: "Admin" | "Manager" | "Employee"
  ) {
    if (role === "Admin") {
      const adminExist = await this.userRepo.findOneBy({ role: "Admin" });
      if (adminExist) throw new Error("Admin already exists");
    }
    if (role === "Manager") {
      const managerExist = await this.userRepo.findOneBy({ role: "Manager" });
      if (managerExist) throw new Error("Manager already exists");
    }

    const existingUser = await this.userRepo.findOneBy({ username });
    if (existingUser) throw new Error("Username already taken");

    const hashed = await hashPassword(password);
    const user = this.userRepo.create({ username, password: hashed, role });
    await this.userRepo.save(user);
    return { message: `${role} created` };
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({ id: user.id, role: user.role });
    return { token, role: user.role };
  }
}
