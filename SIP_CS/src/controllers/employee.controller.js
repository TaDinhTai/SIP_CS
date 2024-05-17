import Employee from "../models/Employee.js";
import PersonalEmployee from "../models/Personal_Employee.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    } = req.body;

    const employee = new Employee({
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    });

    // Tạo một đối tượng PersonalEmployee mới
    const personalEmployee = new PersonalEmployee({
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    });

    const savedUser = await employee.save();
    const savedPersonalEmployee = await personalEmployee.save();

    _io.emit("CreateEmployee");

    return res.status(200).json({
      success: true,
      data: {
        _id: savedUser._id,
        employeeId: savedUser.employeeId,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        vacationDays: savedUser.vacationDays,
        paidToDate: savedUser.paidToDate,
        paidLastYear: savedUser.paidLastYear,
        payRate: savedUser.payRate,
        payRateId: savedUser.payRateId,
      },
    });
  } catch (error) {
    console.error({ success: true, data: error });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({
      employeeId: req.params.employeeId,
    });

    const deletedEmployee = await PersonalEmployee.findOneAndDelete({
      employeeId: req.params.employeeId,
    });

    _io.emit("DeleteEmployee");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error({ success: false, data: error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId,
    } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      {
        employeeId,
        firstName,
        lastName,
        vacationDays,
        paidToDate,
        paidLastYear,
        payRate,
        payRateId,
      },
      { new: true }
    );

    const updatedPersonalEmployee = await PersonalEmployee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      {
        employeeId,
        firstName,
        lastName,
        vacationDays,
        paidToDate,
        paidLastYear,
        payRate,
        payRateId,
      },
      { new: true }
    );

    _io.emit("EditEmployee");

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    console.error({ success: false, data: error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// export const getEmployeesList = async (page, limit) => {
//     try {
//         const employees = await Employee.find().skip(page).limit(limit).exec();
//         return {data: employees};
//     } catch (error) {
//         console.error("Error fetching employees:", error);
//         throw error;
//     }
// };

export const getEmployeesList = async (page, limit, searchQuery) => {
  try {
    let query = {};
    console.log(searchQuery);
    if (searchQuery) {
      // Nếu có tham số tìm kiếm, tạo một truy vấn để tìm kiếm theo tên hoặc bất kỳ trường nào khác bạn muốn
      query = {
        $or: [
          { firstName: { $regex: searchQuery, $options: "i" } },
          { lastName: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const employees = await Employee.find(query).skip(page).limit(limit).exec();
    return { data: employees };
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// export const getEmployee = async (req, res, next) => {
//     const employee = await Employee.findById(req.params.employeeId);
//     return res.json({ success: true, data: employee });
// };

// export const getEmployees = async (req, res, next) => {
//     const employees = await Employee.find();
//     return res.json({ success: true, data: employees });
// }

export const getEmployee = async (req, res, next) => {
  const employee = await Employee.findById(req.params.employeeId);
  return res.json(employee);
};

export const getEmployees = async (req, res, next) => {
  const employees = await Employee.find();
  return res.json({ data: employees });
};
