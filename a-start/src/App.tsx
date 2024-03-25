import { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [] as string[],
    dateOfBirth: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    let updatedInterest = [...formData.interests];
    checked
      ? updatedInterest.push(name)
      : (updatedInterest = updatedInterest.filter(
          (interest) => interest !== name
        ));
    setFormData({
      ...formData,
      interests: updatedInterest,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <h1>Form Validation with YUP</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number :</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password :</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age :</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender :</label>
          <select name="gender" value={formData.gender}>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Other</option>
          </select>
        </div>
        <div>
          <label>Interest :</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              onChange={handleCheckBoxChange}
              checked={formData.interests.includes("coding")}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              onChange={handleCheckBoxChange}
              checked={formData.interests.includes("sports")}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking"
              onChange={handleCheckBoxChange}
              checked={formData.interests.includes("cooking")}
            />
            Cooking
          </label>
        </div>
        <div>
          <label>Date of Birth :</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
