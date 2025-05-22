import { Request, Response } from 'express';
import { SoftwareService } from '../services/software.service';

const softwareService = new SoftwareService();

export const createSoftware = async (req: Request, res: Response) => {
  try {
    const { name, description, accessLevels } = req.body;
    const result = await softwareService.create(name, description, accessLevels);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getSoftwareList = async (req: Request, res: Response) => {
  try {
    const result = await softwareService.list();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};