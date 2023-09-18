import { useState } from "react";
import "./App.css";
import iconArrow from "./assets/iconArrow";

function App() {
  const [inputDate, setInputDate] = useState({ day: "", month: "", year: "" });
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [errors, setError] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const age = calculateAge(inputDate);
    setAge(age);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputDate((prevInputDate) => ({
      ...prevInputDate,
      [name]: value,
    }));
  };
  function calculateAge(inputDate) {
    const currentDate = new Date();
    const inputYear = parseInt(inputDate.year, 10);
    const inputMonth = parseInt(inputDate.month, 10) - 1; // เริ่มนับเดือนที่ 0
    const inputDay = parseInt(inputDate.day, 10);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    let ageYears = currentYear - inputYear;
    let ageMonths = currentMonth - inputMonth;
    let ageDays = currentDay - inputDay;

    if (ageDays < 0) {
      ageMonths -= 1;

      const lastDayOfMonth = new Date(inputYear, inputMonth + 1, 0).getDate(); // เพิ่ม 1 ใน inputMonth เพื่อนับวันสุดท้ายของเดือน
      ageDays += lastDayOfMonth;
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    return {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    };
  }
  return (
    <main className="">
      <body className="grid-container">
        <div className="container">
          <div className="container-col">
            <label>Day</label>
            <input
              type="number"
              name="day"
              id="day"
              value={inputDate.day}
              onChange={handleInputChange}
              min="1"
              max="31"
              className={inputDate.day < 1 || inputDate.day > 31 ? "error" : ""}
            />
            {inputDate.day < 1 ||
              (inputDate.day > 31 && (
                <span className="error-message">Invalid day</span>
              ))}
          </div>
          <div className="container-col">
            <label>Month</label>
            <input
              type="number"
              name="month"
              id="month"
              value={inputDate.month}
              onChange={handleInputChange}
              min="1"
              max="12"
            />
            {inputDate.month < 1 ||
              (inputDate.month > 12 && (
                <span className="error-message">Invalid month</span>
              ))}
          </div>
          <div className="container-col">
            <label>Year</label>
            <input
              type="number"
              name="year"
              id="year"
              value={inputDate.year}
              onChange={handleInputChange}
              min="1900"
              max={new Date().getFullYear()}
            />
            {inputDate.year < 1900 ||
              (inputDate.year > new Date().getFullYear() && (
                <span className="error-message">Invalid year</span>
              ))}
          </div>
        </div>
        <div>
          <hr className="line"></hr>
          <div>
            <button className="submit" onClick={handleSubmit}></button>
          </div>
        </div>
        <div className="display">
          <h1>
            {age.years} <span>{age.years === 1 ? "year" : "years"}</span>
          </h1>
          <h1>
            {age.months} <span>months</span>
          </h1>
          <h1>
            {age.days} <span>days</span>
          </h1>
        </div>
        <div class="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor <br />
          </a>
          Coded by <a href="#">Mr.Boworn Treesinsub</a>.
        </div>
      </body>
      <iconArrow width="24" />
    </main>
  );
}

export default App;
