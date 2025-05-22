import { AppDataSource } from '../config/data-source';
import { Software } from '../entities/Software';

export class SoftwareService {
  private softwareRepo = AppDataSource.getRepository(Software);

  async create(name: string, description: string, accessLevels: string[]) {
    const software = this.softwareRepo.create({ name, description, accessLevels });
    await this.softwareRepo.save(software);
    return software;
  }

  async list() {
    return this.softwareRepo.find();
  }
}