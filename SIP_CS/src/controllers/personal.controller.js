import sql from "mssql";
import Personal from "../models/Personal.js";

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

export const getPersonalList = async (req, res) => {
  try {
    const existingData = await Personal.find();
    if (existingData.length > 0) {
      res.json(existingData);
    } else {
      // Kết nối với cơ sở dữ liệu
      await sql.connect(config);

      // Thực hiện truy vấn SQL để lấy dữ liệu
      const result = await sql.query("SELECT * FROM Personal");

      // Lưu kết quả vào collection personal trong MongoDB
      await Personal.insertMany(result.recordset);

      // Gửi kết quả về cho client
      res.send(result.recordset);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi máy chủ");
  } finally {
    // Đóng kết nối sau khi hoàn thành
    sql.close();
  }
};

export const createPersonal = async (req, res) => {
  try {
    const {
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

    // Lưu bản ghi mới
    const savedPersonal = await personal.save();

    // Kết nối với cơ sở dữ liệu SQL Server
    await sql.connect(config);

    // Thêm bản ghi mới vào bảng Personal của SQL Server
    const result = await sql.query(`
      INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
      VALUES (${Employee_ID}, ${First_Name}, ${Last_Name}, ${Middle_Initial}, ${Address1}, ${Address2}, ${City}, ${State}, ${Zip}, ${Email}, ${Phone_Number}, ${Social_Security_Number}, ${Drivers_License}, ${Marital_Status}, ${Gender}, ${Shareholder_Status}, ${Benefit_Plans}, ${Ethnicity})
    `);

    // Đóng kết nối với cơ sở dữ liệu SQL Server
    await sql.close();

    // Trả về kết quả thành công
    return res.status(200).json(savedPersonal);
  } catch (error) {
    console.error({ success: false, data: error });
    // Trả về lỗi nếu có lỗi xảy ra
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
