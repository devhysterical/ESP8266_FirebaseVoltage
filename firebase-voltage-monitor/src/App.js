import React, { useState, useEffect } from "react";
import {
  database,
  ref,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "./firebase";

function App() {
  const [voltage, setVoltage] = useState(null); // Khởi tạo null thay vì 0 để phân biệt trạng thái chưa có dữ liệu

  useEffect(() => {
    const voltageRef = ref(database, "/Voltage");

    // Lấy dữ liệu mới nhất từ Firebase (ID gần nhất)
    const latestVoltageQuery = query(voltageRef, orderByKey(), limitToLast(1));

    // Cập nhật giá trị mỗi 5 giây
    const intervalId = setInterval(() => {
      onValue(latestVoltageQuery, (snapshot) => {
        const data = snapshot.val();
        // snapshot.val() sẽ trả về một đối tượng có khóa ID và giá trị điện áp
        const lastKey = Object.keys(data)[0]; // Lấy ID của bản ghi gần nhất
        const voltageValue = data[lastKey];
        setVoltage(voltageValue); // Đặt giá trị từ Firebase vào state
      });
    }, 5000); // Lấy dữ liệu sau mỗi 5 giây

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-gray-800">Current Voltage</h1>
        <p className="mt-4 text-4xl text-blue-500">
          {voltage !== null && !isNaN(voltage) // Kiểm tra null và số hợp lệ
            ? `${parseFloat(voltage).toFixed(2)} V`
            : "Đang tải..."}
        </p>
      </div>
    </div>
  );
}

export default App;
