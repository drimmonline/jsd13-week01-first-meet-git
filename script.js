console.log("เชื่อมต่อ Java script สำเร็จแล้ว");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function performSearch() {
  // ดึงค่าข้อความที่ผู้ใช้พิมพ์ และใช้ .trim() เพื่อตัดช่องว่างหน้า-หลังทิ้ง
  const keyword = searchInput.value.trim();

  // ตรวจสอบเงื่อนไข (Validation) ถ้าไม่ได้พิมพ์อะไรเลย ไม่ต้องทำต่อ
  if (keyword === "") {
    alert("กรุณากรอกคำที่ต้องการค้นหาก่อนครับ!");
    return;
  }

  // นำคำค้นหาไปใช้งานต่อ (เช่น แสดงผลบนจอ, ส่งไปหา API หรือส่งไปฟิลเตอร์ข้อมูลการ์ดสินค้า)
  console.log("กำลังค้นหาคำว่า: " + keyword);

  // ตัวอย่างเช่น: สั่งเปลี่ยนหน้าเว็บไปยังระบบค้นหา
  // window.location.href = `https://myshop.com/search?q=${keyword}`;
}

// 2. ดักจับเหตุการณ์แบบที่ 1: เมื่อผู้ใช้ "คลิก" ที่ปุ่มแว่นขยาย
searchBtn.addEventListener("click", () => {
  performSearch();
});

// 3. ดักจับเหตุการณ์แบบที่ 2: เมื่อผู้ใช้พิมพ์ในกล่องแล้วกดปุ่ม "Enter" บนคีย์บอร์ด
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});
