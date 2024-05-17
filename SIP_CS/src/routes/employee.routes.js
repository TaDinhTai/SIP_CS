import { Router } from "express";
import { createEmployee, getEmployees, getEmployee, deleteEmployee, editEmployee, getEmployeesList } from "../controllers/employee.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();


router.post("/", createEmployee);
// router.get("/", getEmployees);
// router.post("/", [verifyToken, isAdmin, checkExistingUser], createEmployee);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getEmployees);
//router.get("/:employeeId", [verifyToken, isAdmin, checkExistingUser], getEmployee);
router.get("/:employeeId", getEmployee);
router.delete("/:employeeId", deleteEmployee);
router.patch('/:employeeId', editEmployee);


router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query._start); 
        const limit = parseInt(req.query._limit);

        const searchQuery = req.query._search;

        // console.log(page, limit, searchQuery);

        // Gọi hàm getEmployeesList với trang và giới hạn đã xác định
        const employees = await getEmployeesList(page, limit, searchQuery);

        // Trả về danh sách nhân viên
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
