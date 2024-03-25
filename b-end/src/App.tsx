import { useState } from "react";
import "./App.css";
import * as y from "yup";

type ErrorType = {
  [key: string]: string;
};

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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const [errors, setErrors] = useState<ErrorType | null>(null);

  const validationSchema = y.object({
    firstName: y.string().required("First Name is Required"),
    lastName: y.string().required("Last Name is Required"),
    email: y
      .string()
      .required("Email is Required")
      .email("Invalid email format"),
    phoneNumber: y
      .string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is Required"),
    password: y
      .string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at leaset one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: y
      .string()
      .oneOf([y.ref("password")], "Passwords must match")
      .required("Confirm password is Required"),
    age: y
      .number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: y.string().required("Gender is Required"),
    interests: y
      .array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    dateOfBirth: y.date().required("Date of Birth is Required "),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // option abortEarly set to false untuk jika cmn satu error gak langsung return
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form submitted:", formData);
    } catch (e: any) {
      console.log(e.inner);
      const newError: { [key: string]: string } = {};
      e.inner.forEach((e: any) => (newError[e.path] = e.message));
      setErrors(newError);
    }
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
          {errors?.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors?.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label>Email :</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number :</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors?.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors?.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password :</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors?.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <label>Age :</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors?.age && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <label>Gender :</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Other</option>
          </select>
          {errors?.gender && <p className="error">{errors.gender}</p>}
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
          {errors?.interests && <p className="error">{errors.interests}</p>}
        </div>
        <div>
          <label>Date of Birth :</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors?.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
