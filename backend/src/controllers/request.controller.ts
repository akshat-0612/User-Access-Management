import { Request, Response } from 'express';
import { RequestService } from '../services/request.service';


const requestService = new RequestService();

export const submitRequest = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const { softwareId, accessType, reason } = req.body;
    const result = await requestService.create(userId, softwareId, accessType, reason);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const result = await requestService.approveOrReject(id, status);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    let requests;
    if (status && typeof status === 'string') {
      requests = await requestService.listByStatus(status);
    } else {
      requests = await requestService.listAll();
    }
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyRequests = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const requests = await requestService.listByUser(userId);
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
