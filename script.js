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

function twoSum(nums, target) {
  const map = new Map(); // เก็บค่าเป็น { ตัวเลข => index }

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;
    console.log("number: ", complement);

    // ตรวจสอบว่ามีคู่แท้อยู่ใน Map หรือยัง
    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    // ถ้ายังไม่มี ให้บันทึกตัวเลขปัจจุบันลง Map
    map.set(currentNum, i);
  }

  return []; // ในโจทย์การันตีว่ามีคำตอบเสมอ จุดนี้จึงไม่ได้ถูกรัน
}
// 2. สร้างตัวแปรข้อมูลจำลอง (ตาม Example 1 ในโจทย์)
const myNums = [2, 7, 11, 15];
const myTarget = 18;

// 3. เรียกใช้งานฟังก์ชันและเก็บผลลัพธ์ไว้ในตัวแปร
const result = twoSum(myNums, myTarget);

let objectName = [
  { name: "Neeti", address: { state: "bangkok", pascode: 10310 } },
  { name: "สมชาย", address: { state: "thailand", pascode: 99999 } },
];

objectName.map((value, key) => {
  console.log(value.name);
});
