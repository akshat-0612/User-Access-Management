import { AppDataSource } from "../config/data-source";
import { Request as AccessRequest } from "../entities/Request";
import { User } from "../entities/User";
import { Software } from "../entities/Software";

export class RequestService {
  private requestRepo = AppDataSource.getRepository(AccessRequest);
  private userRepo = AppDataSource.getRepository(User);
  private softwareRepo = AppDataSource.getRepository(Software);

  async create(
    userId: number,
    Software: number,
    accessType: "Read" | "Write" | "Admin",
    reason: string
  ) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const software = await this.softwareRepo.findOneBy({ id: Software });

    if (!user || !software) {
      throw new Error("Invalid user or software");
    }

    const request = this.requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });

    return this.requestRepo.save(request);
  }

  async approveOrReject(id: number, status: "Approved" | "Rejected") {
    const request = await this.requestRepo.findOneBy({ id });
    if (!request) throw new Error("Request not found");
    request.status = status;
    return this.requestRepo.save(request);
  }

  async listPending() {
    return this.requestRepo.find({
      where: { status: "Pending" },
      relations: ["user", "software"],
    });
  }

  async listAll() {
    return this.requestRepo.find({
      relations: ['user', 'software'],
    });
  }

  async listByUser(userId: number) {
    return this.requestRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'software'],
    });
  }

  async listByStatus(status: string) {
    return this.requestRepo.find({
      where: { status: status as 'Pending' | 'Approved' | 'Rejected' },
      relations: ['user', 'software'],
    });
  }
}
