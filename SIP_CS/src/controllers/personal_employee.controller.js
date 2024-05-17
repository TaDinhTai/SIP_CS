import PersonalEmployee from "../models/Personal_Employee.js";
import Employee from "../models/Employee.js";
import Personal from "../models/Personal.js";
import sql from "mssql";
// import mongoose from "mongoose";

const config = {
  user: "sa",
  password: "sa",
  server: "MSI\\SQLEXPRESS",
  database: "HR",
  options: {
    encrypt: true, // Nếu bạn đang sử dụng kết nối qua SSL/TLS
    trustServerCertificate: true, // Chỉ sử dụng nếu bạn sử dụng SSL/TLS và không có chứng chỉ xác thực
  },
};

export const getPersonalEmployee = async (req, res) => {
  try {
    const personal_employee = await PersonalEmployee.find(
      // JSON.parse(req.params.employeeId)
      // mongoose.Types.ObjectId(req.params.employeeId)
      // req.params.employeeId
      { employeeId: req.params.employeeId }
    );
    // console.log(req.params.employeeId);
    return res.json(personal_employee);
  } catch (error) {
    console.error({ success: false, data: error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getApiPersonalEmployee = async (req, res) => {
  try {
    // Kiểm tra xem collection PersonalEmployee đã có dữ liệu hay chưa
    const existingData = await PersonalEmployee.find();

    if (existingData.length > 0) {
      // Nếu đã có dữ liệu trong collection Personal_Employee, trả về dữ liệu từ collection đó
      res.json(existingData);
    } else {
      // Nếu chưa có dữ liệu, thực hiện cuộc gọi API để lấy dữ liệu
      const [employeeResponse, personalResponse] = await Promise.all([
        fetch("http://localhost:4000/api/employee"),
        fetch("http://localhost:4000/api/personal"),
      ]);

      // Chuyển đổi dữ liệu sang JSON
      const employeeData = await employeeResponse.json();
      const personalData = await personalResponse.json();

      // Kết hợp dữ liệu dựa trên ID chung
      const combinedData = employeeData.data.map((employee) => {
        const matchingPersonalData = personalData.find(
          (personal) => personal.Employee_ID === employee.employeeId
        );
        return { ...employee, ...matchingPersonalData };
      });

      // Lưu dữ liệu vào MongoDB
      await PersonalEmployee.insertMany(combinedData);

      // Gửi lại kết quả kết hợp cho client
      res.json(combinedData);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    res.status(500).send("Lỗi máy chủ!");
  }
};

export const createPersonalEmployee = async (req, res) => {
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
      Employee_ID,
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
    } = req.body;

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
      Employee_ID,
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
    });

    // Tạo đối tượng cho MongoDB
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

    // Tạo đối tượng cho MongoDB
    const personal = new Personal({
      Employee_ID,
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
    });

    // Kết nối với cơ sở dữ liệu SQL Server
    await sql.connect(config);

    // Thêm bản ghi mới vào bảng Personal của SQL Server
    const result = await sql.query`
   INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
   VALUES (${Employee_ID}, ${First_Name}, ${Last_Name}, ${Middle_Initial}, ${Address1}, ${Address2}, ${City}, ${State}, ${Zip}, ${Email}, ${Phone_Number}, ${Social_Security_Number}, ${Drivers_License}, ${Marital_Status}, ${Gender}, ${Shareholder_Status}, ${Benefit_Plans}, ${Ethnicity})
    `;

    // Đóng kết nối với cơ sở dữ liệu SQL Server
    await sql.close();

    // Lưu bản ghi mới
    const savedPersonalEmployee = await personalEmployee.save();
    const savedEmployee = await employee.save();
    const savedPersonal = await personal.save();

    _io.emit("CreatePersonalEmployee");

    // Trả về kết quả thành công
    return res.status(200).json(savedPersonalEmployee);
  } catch (error) {
    console.error({ success: false, data: error });
    // Trả về lỗi nếu có lỗi xảy ra
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deletePersonalEmployee = async (req, res) => {
  try {
    const deletedEmployee = await PersonalEmployee.findOneAndDelete({
      employeeId: req.params.employeeId,
    });

    const employee = await Employee.findOneAndDelete({
      employeeId: req.params.employeeId,
    });

    console.log(req.params);

    // Kết nối với cơ sở dữ liệu SQL Server
    await sql.connect(config);

    const deleteResult = await sql.query`
      DELETE FROM Personal WHERE Employee_ID = ${req.params.employeeId}`;

    // Đóng kết nối với cơ sở dữ liệu SQL Server
    await sql.close();

    _io.emit("DeletePersonalEmployee");
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Personal employee not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Personal employee deleted successfully",
    });
  } catch (error) {
    console.error({ success: false, data: error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const editPersonalEmployee = async (req, res) => {
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
      Employee_ID,
      First_Name,
      Last_Name,
      Middle_Initial,
      Address1,
      Address2,
      City,
      State,
      Zip,
      Email,
      Phone_Number,
      Social_Security_Number,
      Drivers_License,
      Marital_Status,
      Gender,
      Shareholder_Status,
      Benefit_Plans,
      Ethnicity,
    } = req.body;

    await sql.connect(config);

    // const result = await sql.query`
    //   UPDATE Personal SET First_Name = ${First_Name}, Last_Name = ${Last_Name}, Middle_Initial = ${Middle_Initial}, Address1 = ${Address1},
    //   Address2 = ${Address2}, City = ${City}, State = ${State}, Zip = ${Zip}, Email = ${Email}, Phone_Number = ${Phone_Number},
    //   Social_Security_Number = ${Social_Security_Number}, Drivers_License = ${Drivers_License}, Marital_Status = ${Marital_Status},
    //   Gender = ${Gender}, Shareholder_Status = ${Shareholder_Status}, Benefit_Plans = ${Benefit_Plans}, Ethnicity = ${Ethnicity}
    //   WHERE Employee_ID = ${Employee_ID}
    // `;

    const result = await sql.query`
      UPDATE Personal SET First_Name = ${firstName}
      WHERE Employee_ID = ${Employee_ID}
    `;

    await sql.close();

    const updatedPersonalEmployee = await PersonalEmployee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      {
        employeeId,
        firstName,
        lastName,
        Middle_Initial,
        Address1,
        Address2,
        City,
        State,
        Zip,
        Email,
        Phone_Number,
        Social_Security_Number,
        Drivers_License,
        Marital_Status,
        Gender,
        Shareholder_Status,
        Benefit_Plans,
        Ethnicity,
        vacationDays,
        paidToDate,
        paidLastYear,
        payRate,
        payRateId,
        Employee_ID,
        First_Name,
        Last_Name,
      },
      { new: true }
    );

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

    _io.emit("EditPersonalEmployee");

    if (!updatedPersonalEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Personal employee not found" });
    }
    return res.status(200).json(updatedPersonalEmployee);
  } catch (error) {
    console.error({ success: false, data: error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// export const getPersonalEmployees = async (req, res) => {
//     try {
//         const employees = await PersonalEmployee.find();
//         return res.json({ data: employees });
//     } catch (error) {
//         console.error({ success: false, data: error });
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// export const getPersonalEmployeeList = async (page, limit, searchQuery) => {
//   try {
//       let query = {};
//       // console.log(searchQuery);
//       if (searchQuery) {
//           // Nếu có tham số tìm kiếm, tạo một truy vấn để tìm kiếm theo tên hoặc bất kỳ trường nào khác bạn muốn
//           query = { $or: [{ firstName: { $regex: searchQuery, $options: 'i' } }, { lastName: { $regex: searchQuery, $options: 'i' } }] };
//       }

//       const personal_employee = await PersonalEmployee.find(query).skip(page).limit(limit).exec();
//       return { data: personal_employee };
//   } catch (error) {
//       console.error("Error fetching employees:", error);
//       throw error;
//   }
// };
