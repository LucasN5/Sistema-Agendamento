import * as adminService from "../services/adminService.js";

export const getAdmin = async (req, res) => {
  try {
    const admins = await adminService.getAdmin();
    res.status(200).json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
