import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// import sql from 'mssql';
// import fetch from "node-fetch";

// Routes
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import personal_employeeRoutes from "./routes/personal_employee.routes.js";
import personalRoutes from "./routes/personal.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);

// const config = {
//   user: 'sa',
//   password: 'sa',
//   server: 'MSI\\SQLEXPRESS',
//   database: 'HR',
//   options: {
//       encrypt: true, // Nếu bạn đang sử dụng kết nối qua SSL/TLS
//       trustServerCertificate: true // Chỉ sử dụng nếu bạn sử dụng SSL/TLS và không có chứng chỉ xác thực
//     }
// };

// app.get('/api/personal', async (req, res) => {
//   try {
//       // Kết nối với cơ sở dữ liệu
//       await sql.connect(config);

//       // Thực hiện truy vấn SQL để lấy dữ liệu
//       const result = await sql.query('SELECT * FROM Personal');

//       // Gửi kết quả về cho client
//       res.send(result.recordset);
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Lỗi máy chủ');
//   } finally {
//       // Đóng kết nối sau khi hoàn thành
//       sql.close();
//   }
// });

// app.get('/api/personal_employee', async (req, res) => {
//   try {
//       // Gửi yêu cầu đến hai API để lấy dữ liệu
//       const [employeeResponse, personalResponse] = await Promise.all([
//           fetch('http://localhost:4000/api/employee'),
//           fetch('http://localhost:4000/api/personal')
//       ]);

//       // Chuyển đổi dữ liệu sang JSON
//       const employeeData = await employeeResponse.json();
//       const personalData = await personalResponse.json();

      
//       // Kết hợp dữ liệu dựa trên ID chung
//       const combinedData = employeeData.data.map(employee => {
//           const matchingPersonalData = personalData.find(personal => personal.Employee_ID === employee.employeeId);
//           return { ...employee, ...matchingPersonalData };
//       });

//       // Lưu dữ liệu vào MongoDB
//       // await Personal_Employee.insertMany(combinedData);

//       // Gửi lại kết quả kết hợp cho client
//       res.json(combinedData);
//   } catch (error) {
//       console.error('Lỗi khi gọi API:', error);
//       res.status(500).send('Lỗi máy chủ!');
//   }
// });

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/employee", employeeRoutes);
app.use("/api/personal_employee", personal_employeeRoutes);
app.use("/api/personal", personalRoutes)
export default app;
