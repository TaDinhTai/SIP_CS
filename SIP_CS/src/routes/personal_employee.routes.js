import { Router } from "express";
import {  createPersonalEmployee, deletePersonalEmployee, editPersonalEmployee, getApiPersonalEmployee, getPersonalEmployee } from "../controllers/personal_employee.controller.js";


const router = Router();

router.get('/', getApiPersonalEmployee);
router.get("/:employeeId", getPersonalEmployee);
router.post("/", createPersonalEmployee);
router.delete("/:employeeId", deletePersonalEmployee);
router.patch('/:employeeId', editPersonalEmployee);




// router.get('/', async (req, res) => {
//     try {
//         const page = parseInt(req.query._start); 
//         const limit = parseInt(req.query._limit);

//         const searchQuery = req.query._search;


//         // Gọi hàm getEmployeesList với trang và giới hạn đã xác định
//         const employees = await getPersonalEmployeeList(page, limit, searchQuery);

//         // Trả về danh sách nhân viên
//         res.status(200).json(employees);
//     } catch (error) {
//         console.error("Error fetching employees:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


export default router;
