import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

function RegisterPage() {
  const router = useRouter();
  const { authData, setAuthData } = useContext(AuthContext);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    checkbox: Yup.boolean().oneOf([true], "Checkbox must be checked"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      checkbox: false,
    },
    validationSchema,
    validateOnChange:false,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const response = await fetch(
        "https://082130f7-44ca-4ec1-9568-3b923c3b0e5c.mock.pstmn.io/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setAuthData(data);
        router.push("/dashboard");
      } else {
        // display error message here
        console.error("Wrong username or password");
      }
    },
  });
console.log(formik.errors)
  return (
    <div className="w-full font-sans p-4 bg-white sm:p-6 md:p-8">
      <div className="flex flex-col justify-center items-center">
        <img className="m-auto" src="/kurious.png" alt="logo"></img>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[425px] space-y-6 mt-4"
          action="#"
        >
          <h5 className="text-[28px] font-bold font-sans text-gray-900 text-center">
            Create your account
          </h5>
          <div>
            <label
              for="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-[#EDF2F7] border border-gray-300 text-[#7A828A] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type your name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.errors.firstName && <p className="text-red-500">{formik.errors.firstName}</p>}
          </div>
          <div>
            <label
              for="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-[#EDF2F7] border border-gray-300 text-[#7A828A] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type your last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.errors.lastName && <p className=" text-red-500">{formik.errors.lastName}</p>}
          </div>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-[#EDF2F7] border border-gray-300 text-[#7A828A] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type your e-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>
          <div className="relative">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Type your password"
              className="bg-[#EDF2F7] border border-gray-300 text-[#7A828A] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className={`font-semibold text-sm mt-2 ${formik.errors.password ? "text-red-500" : "text-[#718096]"} `}>
              Must be 8 characters at least
            </p>
          </div>
          <div className="relative flex flex-row space-x-2 items-start">
            <input
              type="checkbox"
              className="w-[20px] h-[20px]"
              onChange={() => formik.setFieldValue("checkbox", !formik.values.checkbox)}
            />
            <p className=" text-sm  text-[#425466]">
              By creating an account means you agree to the
              <span className="text-[#16192C] font-semibold">
                Terms and Conditions
              </span>
              , and our
              <span className="text-[#16192C] font-semibold">
                Privacy Policy
              </span>
            </p>
            {formik.errors.checkbox && <p className="text-red-500">{formik.errors.checkbox}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#00ADFF] m-auto w-full text-white h-[46px]"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
