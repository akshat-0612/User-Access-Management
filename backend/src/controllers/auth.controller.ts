import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const result = await authService.signup(username, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, role } = req.body;

    if (!["Admin", "Manager", "Employee"].includes(role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    if (
      (role === "Admin" || role === "Manager") &&
      req.user?.role !== "Admin"
    ) {
      res
        .status(403)
        .json({ message: "Forbidden: only Admin can create Admin/Manager" });
      return;
    }

    const result = await authService.createUser(
      username,
      password,
      role as "Admin" | "Manager" | "Employee"
    );

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
