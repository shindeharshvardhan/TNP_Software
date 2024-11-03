import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import termsPdf from "../../assets/TNP Terms.pdf";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import axios from "axios";
import { VscArrowDown } from "react-icons/vsc";
import ScrollButton from "../../ScrollButton";

function StudentForm() {
  const [prn, setPrn] = useState("");
  const [prnerror, setPrnError] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [nameerror, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [mob, setMob] = useState("");
  const [moberror, setMobError] = useState("");
  const [pmob, setPmob] = useState("");
  const [pmoberror, setPmobError] = useState("");
  const [nationality, setNationality] = useState("");
  const [height, setHeight] = useState("");
  const [heighterror, setHeightError] = useState("");
  const [weight, setWeight] = useState("");
  const [weighterror, setWeightError] = useState("");
  const [pstreet, setPstreet] = useState("");
  const [pcity, setPcity] = useState("");
  const [pstate, setPstate] = useState("");
  const [ppostalcode, setPpostalcode] = useState("");
  const [ppostalcodeerror, setPpostalCodeError] = useState("");
  const [cstreet, setCstreet] = useState("");
  const [ccity, setCcity] = useState("");
  const [cstate, setCstate] = useState("");
  const [cpostalcode, setCpostalcode] = useState("");
  const [cpostalcodeerror, setCpostalCodeError] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [sscpassingyear, setSSCpassingyear] = useState("");
  const [sscPYError, setSSCPYError] = useState("");
  const [sscschoolname, setSSCschoolname] = useState("");
  const [sscmarksobt, setSSCmarksobt] = useState("");
  const [sscmarksobterror, setSSCmarksobterror] = useState("");
  const [ssctotmarks, setSSCtotmarks] = useState("");
  const [ssctotmarkserror, setSSCtotmarkserror] = useState("");
  const [sscper, setSSCper] = useState("");
  const [sscboardname, setSSCboardname] = useState("");
  const [hscpassingyear, setHSCpassingyear] = useState("");
  const [hscpyerror, setHSCPYError] = useState("");
  const [hscmarksobt, setHSCmarksobt] = useState("");
  const [hscmarksobterror, setHSCmarksobterror] = useState("");
  const [hscschoolname, setHSCschoolname] = useState("");
  const [hsctotmarks, setHSCtotmarks] = useState("");
  const [hsctotmarkserror, setHSCtotmarkserror] = useState("");
  const [hscper, setHSCper] = useState("");
  const [hscboardname, setHSCboardname] = useState("");
  const [hscscimarksobt, setHSCscimarksobt] = useState("");
  const [hscscimarksobterror, setHSCscimarksobterror] = useState("");
  const [hscscitotmarks, setHSCscitotmarks] = useState("");
  const [hscscitotmarkserror, setHSCscitotmarkserror] = useState("");
  const [hscsciper, setHSCscimarksper] = useState("");
  const [diplomapassingyear, setDiplomapassingyear] = useState("");
  const [diplomapyerror, setdiplomapyerror] = useState("");
  const [diplomaclgname, setDiplomaclgname] = useState("");
  const [diplomaspec, setDiplomaspec] = useState("");
  const [diplomacgpa, setDiplomacgpa] = useState("");
  const [diplomacgpaerror, setdiplomacgpaerror] = useState("");
  const [diplomaper, setDiplomaper] = useState("");
  const [diplomapererror, setdiplomapererror] = useState("");
  const [hscOrDiploma, setHscOrDiploma] = useState("");
  const [isDiplomaVisible, setDiplomaVisible] = useState(false);
  const [dob, setdob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  const [sscmarksheet, setSSCmarksheet] = useState(null);
  const [hscstream, setHSCstream] = useState("");
  const [hscmarksheet, setHSCmarksheet] = useState(null);
  const [diplomamarksheet, setDiplomamarksheet] = useState(null);
  const [educationLevel, setEducationLevel] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [cpassworderror, setConfirmError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photobase64, setPhotoBase64] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [ugData, setUgData] = useState({
    department: "",
    collegeName: "",
    numberOfATKT: 0,
    semesters: Array(8).fill({
      year: "",
      percentage: "",
      attempts: "",
      marksheet: null,
    }),
  });
  const [ugerrors, setUGErrors] = useState({
    atkt: "",
    attempts: Array(8).fill(""),
    percentages: Array(8).fill(""),
  });
  const [pgData, setPgData] = useState({
    department: "",
    collegeName: "",
    atkt: "",
    semesters: [
      { year: "", percentage: "", attempts: "", marksheet: null },
      { year: "", percentage: "", attempts: "", marksheet: null },
      { year: "", percentage: "", attempts: "", marksheet: null },
      { year: "", percentage: "", attempts: "", marksheet: null },
    ],
  });
  const [pgErrors, setPgErrors] = useState({
    atkt: "",
    percentages: ["", "", "", ""],
    attempts: ["", "", "", ""],
  });
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  const handlePrnChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPrn(value);

    if (value.length == 10) {
      setPrnError("");
    } else {
      setPrnError("PRN must be exactly of 10 digits");
      isValid = false;
    }
  };

  const handleName = (e, field) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z]/g, "");
    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    if (field === "Firstname") {
      setFname(value);
    } else if (field === "Middlename") {
      setMname(value);
    } else if (field === "Lastname") {
      setLname(value);
    }
    if (value.length >= 2) {
      setNameError("");
    } else {
      setNameError(`${field} should be at least 2 characters long`);
      isValid = false;
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email");
      isValid = false;
    }
  };

  const handleMobile = (e, field) => {
    const value = e.target.value.replace(/\D/g, "");
    const mobpattern = /^[6-9]{1}[0-9]{9}$/;

    if (field === "smob") {
      setMob(value);
      if (mobpattern.test(value) && value.length === 10) {
        setMobError("");
      } else {
        setMobError("Please enter a valid mobile number");
        isValid = false;
      }

      if (value === pmob) {
        setMobError(
          "Student mobile number and Parent mobile number should be different"
        );
        isValid = false;
      }
    }

    if (field === "pmob") {
      setPmob(value);
      if (mobpattern.test(value) && value.length === 10) {
        setPmobError("");
      } else {
        setPmobError("Please enter a valid parent mobile number");
        isValid = false;
      }

      if (value === mob) {
        setPmobError(
          "Student mobile number and Parent mobile number should be different"
        );
        isValid = false;
      }
    }
  };

  const handleHeight = (e) => {
    const value = e.target.value;
    if (value == "") {
      setHeight(value);
      setHeightError("");
      return;
    }
    const numericValue = parseInt(value, 10);
    if (numericValue > 0) {
      setHeight(value);
      setHeightError("");
    } else {
      setHeightError("Height must be a positive number");
      isValid = false;
    }
  };

  const handleWeight = (e) => {
    const value = e.target.value;
    if (value == "") {
      setWeight(value);
      setWeightError("");
      return;
    }
    const numericValue = parseInt(value, 10);
    if (numericValue > 0) {
      setWeight(value);
      setWeightError("");
    } else {
      setWeightError("Weight must be a positive number");
      isValid = false;
    }
  };

  const handleCheckBox = (e) => {
    const value = e.target.checked;
    setIsSameAddress(value);
    if (value) {
      setCstreet(pstreet);
      setCcity(pcity);
      setCstate(pstate);
      setCpostalcode(ppostalcode);
    } else {
      setCstreet("");
      setCcity("");
      setCstate("");
      setCpostalcode("");
    }
  };

  const handlePostalCode = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && value >= 0) {
      setPpostalcode(value);
    }
    if (value.length === 6 && value > 0) {
      setPpostalCodeError("");
    } else if (value.length > 6 || value.length < 6) {
      setPpostalCodeError("Postal Code must be exactly 6 digits");
      isValid = false;
    }
  };

  const handleCPostalCode = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && value >= 0) {
      setCpostalcode(value);
    }
    if (value.length === 6 && value > 0) {
      setCpostalCodeError("");
    } else if (value.length > 6 || value.length < 6) {
      setCpostalCodeError("Postal Code must be exactly 6 digits");
      isValid = false;
    }
  };

  const handleSSCPassingYear = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setSSCpassingyear(value);

      if (value.length === 4) {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - parseInt(value, 10);

        if (yearDiff >= 0 && yearDiff <= 15) {
          setSSCPYError("");
        } else {
          setSSCPYError("Year must be within the last 15 years.");
          isValid = false;
        }
      } else {
        setSSCPYError("Passing year must be a 4-digit number.");
        isValid = false;
      }
    }
  };

  const handlediplomapy = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setDiplomapassingyear(value);

      if (value.length === 4) {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - parseInt(value, 10);

        if (yearDiff >= 0 && yearDiff <= 15) {
          setdiplomapyerror("");
        } else {
          setdiplomapyerror("Year must be within the last 15 years.");
          isValid = false;
        }
      } else {
        setdiplomapyerror("Passing year must be a 4-digit number.");
        isValid = false;
      }
    }
  };

  const handleHSCpy = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setHSCpassingyear(value);

      if (value.length === 4) {
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - parseInt(value, 10);

        if (yearDiff >= 0 && yearDiff <= 15) {
          setHSCPYError("");
        } else {
          setHSCPYError("Year must be within the last 15 years.");
          isValid = false;
        }
      } else {
        setHSCPYError("Passing year must be a 4-digit number.");
        isValid = false;
      }
    }
  };

  const handleSSCmarksobt = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= ssctotmarks) {
      setSSCmarksobt(value);
      setSSCmarksobterror("");
    } else {
      setSSCmarksobterror("Marks obtained must be between 0 and Total marks.");
      isValid = false;
    }
  };

  const handleHSCmarksobt = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= hsctotmarks) {
      setHSCmarksobt(value);
      setHSCmarksobterror("");
    } else {
      setHSCmarksobterror("Marks obtained must be between 0 and Total marks.");
      isValid = false;
    }
  };

  const handleSSCtotmarks = (e) => {
    const value = e.target.value;
    if (value === "" || (value > 0 && value.length <= 3)) {
      setSSCtotmarks(value);
      setSSCtotmarkserror("");
    } else {
      setSSCtotmarkserror("Total marks should be of 3 digits and positive.");
      isValid = false;
    }
  };

  const handleHSCtotmarks = (e) => {
    const value = e.target.value;
    if (value === "" || (value > 0 && value.length <= 3)) {
      setHSCtotmarks(value);
      setHSCtotmarkserror("");
    } else {
      setHSCtotmarkserror("Total marks should be of 3 digits and positive.");
      isValid = false;
    }
  };

  const calSSCPer = () => {
    const marksobt = parseFloat(sscmarksobt);
    const totmarks = parseFloat(ssctotmarks);
    if (totmarks > 0) {
      const per = (marksobt * 100) / totmarks;
      setSSCper(per.toFixed(2));
    } else {
      setSSCper("");
    }
  };

  const calHSCPer = () => {
    const marksobt = parseFloat(hscmarksobt);
    const totmarks = parseFloat(hsctotmarks);
    if (totmarks > 0) {
      const per = (marksobt * 100) / totmarks;
      setHSCper(per.toFixed(2));
    } else {
      setHSCper("");
    }
  };

  const calHSCsciPer = () => {
    const marksobt = parseFloat(hscscimarksobt);
    const totmarks = parseFloat(hscscitotmarks);
    if (totmarks > 0) {
      const per = (marksobt * 100) / totmarks;
      setHSCscimarksper(per.toFixed(2));
    } else {
      setHSCscimarksper("");
    }
  };

  const handlehscscimarksobt = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= hscscitotmarks) {
      setHSCscimarksobt(value);
      setHSCscimarksobterror("");
    } else {
      setHSCscimarksobterror(
        "Marks obtained must be between 0 and Total marks."
      );
      isValid = false;
    }
  };

  const handlehscscitotmarks = (e) => {
    const value = e.target.value;
    if (value === "" || (value > 0 && value.length <= 3)) {
      setHSCscitotmarks(value);
      setHSCscitotmarkserror("");
    } else {
      setHSCscitotmarkserror("Total marks should be of 3 digits and positive.");
      isValid = false;
    }
  };

  const handlediplomacgpa = (e) => {
    const value = e.target.value;
    setDiplomacgpa(value);
    const cgpa = parseFloat(value);

    if (isNaN(cgpa)) {
      setdiplomacgpaerror("CGPA must be a valid number");
      isValid = false;
    } else if (cgpa <= 0) {
      setdiplomacgpaerror("CGPA must be a positive number");
      isValid = false;
    } else if (cgpa >= 10.0) {
      setdiplomacgpaerror("CGPA must be less than 10.0");
      isValid = false;
    } else {
      setdiplomacgpaerror("");
    }
  };

  const handlediplomaper = (e) => {
    const value = e.target.value;
    setDiplomaper(value);
    const percentage = parseFloat(value);
    if (isNaN(percentage)) {
      setdiplomapererror("Percentage must be a valid number");
      isValid = false;
    } else if (percentage <= 0) {
      setdiplomapererror("Percentage must be positive");
      isValid = false;
    } else if (percentage > 100) {
      setdiplomapererror("Percentage must be less than or equal to 100");
      isValid = false;
    } else {
      setdiplomapererror("");
    }
  };

  useEffect(() => {
    calSSCPer();
  }, [sscmarksobt, ssctotmarks]);

  useEffect(() => {
    calHSCPer();
  }, [hscmarksobt, hsctotmarks]);

  useEffect(() => {
    calHSCsciPer();
  }, [hscscimarksobt, hscscitotmarks]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Calculate rotation degree
      const rotation = (scrollPosition / (documentHeight - windowHeight)) * 180;
      setRotationDegree(rotation);

      // Check if we're near the bottom of the page
      setIsAtBottom(scrollPosition + windowHeight >= documentHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = () => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.body.scrollHeight;
    const halfwayPoint = documentHeight / 2;

    if (scrollPosition < halfwayPoint) {
      // Scroll to last div if closer to top
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      // Scroll to top if closer to bottom
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHscOrDiplomaChange = (e) => {
    setHscOrDiploma(e.target.value);
    if (e.target.value === "HSC") {
      setDiplomaVisible(false);
    } else if (e.target.value === "Diploma") {
      setDiplomaVisible(true);
    }
  };

  const handleEducationChange = (e) => {
    setEducationLevel(e.target.value);
  };

  const handleUgChange = (e, index, field) => {
    const value = e.target.value;
    const newErrors = { ...ugerrors }; // Copy of errors object
    const newSemesters = [...ugData.semesters]; // Copy semesters data

    if (field === "attempts") {
      if (value < 1) {
        newErrors.attempts = [...newErrors.attempts]; // Clone errors array
        newErrors.attempts[index] = "Attempts must be at least 1";
      } else {
        newErrors.attempts = [...newErrors.attempts];
        newErrors.attempts[index] = ""; // Clear error if valid
      }
      newSemesters[index] = {
        ...newSemesters[index], // Copy the current semester's data
        attempts: value, // Update only attempts for this semester
      };
    } else if (field === "percentage") {
      if (value < 0 || value > 100) {
        newErrors.percentages = [...newErrors.percentages]; // Clone errors array
        newErrors.percentages[index] = "Percentage must be between 0 and 100";
      } else {
        newErrors.percentages = [...newErrors.percentages];
        newErrors.percentages[index] = ""; // Clear error if valid
      }
      newSemesters[index] = {
        ...newSemesters[index], // Copy the current semester's data
        percentage: value, // Update only percentage for this semester
      };
    }

    setUgData({ ...ugData, semesters: newSemesters }); // Update only relevant semester
    setUGErrors(newErrors); // Update errors
  };

  const handleUGDataChange = (e, index, field) => {
    const newSemesters = [...ugData.semesters];
    newSemesters[index] = { ...newSemesters[index], [field]: e.target.value };
    setUgData({ ...ugData, semesters: newSemesters });
  };

  const handleDepartmentChange = (e) => {
    setUgData({ ...ugData, department: e.target.value });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const newSemesters = [...ugData.semesters];
    newSemesters[index] = { ...newSemesters[index], marksheet: file };
    setUgData({ ...ugData, semesters: newSemesters });
  };

  const handlePgChange = (e, index, field) => {
    const { value } = e.target;
    const updatedSemesters = [...pgData.semesters];

    updatedSemesters[index][field] = value;

    setPgData((prevData) => ({
      ...prevData,
      semesters: updatedSemesters,
    }));

    if (field === "percentage") {
      if (value < 0 || value > 100) {
        const updatedErrors = [...pgErrors.percentages];
        updatedErrors[index] = "Percentage must be between 0 and 100";
        setPgErrors((prevErrors) => ({
          ...prevErrors,
          percentages: updatedErrors,
        }));
      } else {
        const updatedErrors = [...pgErrors.percentages];
        updatedErrors[index] = ""; // Clear error if valid
        setPgErrors((prevErrors) => ({
          ...prevErrors,
          percentages: updatedErrors,
        }));
      }
    }

    if (field === "attempts") {
      if (value < 1) {
        const updatedErrors = [...pgErrors.attempts];
        updatedErrors[index] = "Attempts must be at least 1";
        setPgErrors((prevErrors) => ({
          ...prevErrors,
          attempts: updatedErrors,
        }));
      } else {
        const updatedErrors = [...pgErrors.attempts];
        updatedErrors[index] = ""; // Clear error if valid
        setPgErrors((prevErrors) => ({
          ...prevErrors,
          attempts: updatedErrors,
        }));
      }
    }
  };

  const handlePgAtktChange = (e) => {
    const value = e.target.value;
    setPgData((prevData) => ({ ...prevData, atkt: value }));

    if (value < 0 || value > 2) {
      setPgErrors((prevErrors) => ({
        ...prevErrors,
        atkt: "ATKT must be between 0 and 2",
      }));
    } else {
      setPgErrors((prevErrors) => ({
        ...prevErrors,
        atkt: "", // Clear error if valid
      }));
    }
  };

  const handleUgAtktChange = (e) => {
    const value = e.target.value;
    setUgData((prevData) => ({ ...prevData, numberOfATKT: value }));

    if (value < 0 || value > 2) {
      setUGErrors((prevErrors) => ({
        ...prevErrors,
        atkt: "ATKT must be between 0 and 2",
      }));
    } else {
      setUGErrors((prevErrors) => ({
        ...prevErrors,
        atkt: "", // Clear error if valid
      }));
    }
  };

  const handlePgFileChange = (e, index) => {
    const file = e.target.files[0];
    const newSemesters = [...pgData.semesters];
    newSemesters[index] = { ...newSemesters[index], marksheet: file };
    setPgData({ ...pgData, semesters: newSemesters });
  };

  const handleAgreement = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handlePgDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handlePassword = (e) => {
    const input = e.target.value;
    setPassword(input);

    if (input.length < 8 || input.length > 15) {
      setPasswordError("Password must be between 8 and 15 characters.");
    } else if (!/[a-z]/.test(input)) {
      setPasswordError("Password must contain at least one lowercase letter.");
    } else if (!/[A-Z]/.test(input)) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else if (!/\d/.test(input)) {
      setPasswordError("Password must contain at least one digit.");
    } else if (!/[@#$%^&+=!]/.test(input)) {
      setPasswordError("Password must contain at least one special character.");
    } else if (/\s/.test(input)) {
      setPasswordError("Password must not contain spaces.");
    } else {
      setPasswordError("");
    }
  };

  const handleCPassword = (e) => {
    const input = e.target.value;
    setCPassword(input);

    if (input !== password) {
      setConfirmError("Passwords do not match.");
    } else {
      setConfirmError("");
    }
  };

  const validateForm = () => {
    let isValid = true;
    console.log("KK");
    if (prn.length !== 10) {
      setPrnError("PRN must be exactly 10 digits");
      isValid = false;
    } else {
      setPrnError("");
    }

    if (fname.length < 2) {
      setNameError("First name should be at least 2 characters long");
      isValid = false;
    } else {
      setNameError("");
    }

    if (mname && mname.length < 2) {
      setNameError("Middle name should be at least 2 characters long");
      isValid = false;
    } else {
      setNameError("");
    }

    if (lname.length < 2) {
      setNameError("Last name should be at least 2 characters long");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    const mobpattern = /^[6-9]{1}[0-9]{9}$/;
    if (!mobpattern.test(mob) || mob === pmob) {
      setMobError(
        "Please enter a valid mobile number and ensure it is different from parent number"
      );
      isValid = false;
    } else {
      setMobError("");
    }

    if (!mobpattern.test(pmob) || mob === pmob) {
      setPmobError(
        "Please enter a valid parent mobile number and ensure it is different from student number"
      );
      isValid = false;
    } else {
      setPmobError("");
    }

    if (height && parseInt(height, 10) <= 0) {
      setHeightError("Height must be a positive number");
      isValid = false;
    } else {
      setHeightError("");
    }

    if (weight && parseInt(weight, 10) <= 0) {
      setWeightError("Weight must be a positive number");
      isValid = false;
    } else {
      setWeightError("");
    }

    if (ppostalcode.length !== 6) {
      setPpostalCodeError("Postal Code must be exactly 6 digits");
      isValid = false;
    } else {
      setPpostalCodeError("");
    }

    if (cpostalcode.length !== 6) {
      setCpostalCodeError("Postal Code must be exactly 6 digits");
      isValid = false;
    } else {
      setCpostalCodeError("");
    }

    const currentYear = new Date().getFullYear();
    const sscYearDiff = currentYear - parseInt(sscpassingyear, 10);
    if (sscpassingyear.length !== 4 || sscYearDiff < 0 || sscYearDiff > 15) {
      setSSCPYError("Year must be within the last 15 years");
      isValid = false;
    } else {
      setSSCPYError("");
    }

    if (sscmarksobt < 0 || sscmarksobt > ssctotmarks) {
      setSSCmarksobterror("Marks obtained must be between 0 and total marks");
      isValid = false;
    } else {
      setSSCmarksobterror("");
    }

    if (ssctotmarks <= 0 || ssctotmarks.length !== 3) {
      setSSCtotmarkserror("Total marks should be positive and of 3 digits");
      isValid = false;
    } else {
      setSSCtotmarkserror("");
    }

    if (password.length < 8 || password.length > 15) {
      setPasswordError("Password must be between 8 and 15 characters.");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      isValid = false;
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one digit.");
      isValid = false;
    } else if (!/[@#$%^&+=!]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      isValid = false;
    } else if (/\s/.test(password)) {
      setPasswordError("Password must not contain spaces.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (cpassword !== password) {
      setConfirmError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    return isValid;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(file);
      setPhotoBase64(reader.result); // Set the Base64 image data in state
    };

    if (file) {
      reader.readAsDataURL(file); // Convert the image file to Base64
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginLeft = 10;
    const marginRight = 10;
    const usableWidth = pageWidth - marginLeft - marginRight; // Calculate usable width
    let yOffset = 20; // Initial y position for content
    const photoWidth = 40;
    const photoHeight = 40;

    const addWrappedText = (text, x, y) => {
      const splitText = doc.splitTextToSize(text, usableWidth); // Wrap text
      doc.text(splitText, x, y);
      yOffset += splitText.length * 10; // Adjust yOffset based on wrapped lines
    };

    const addText = (text) => {
      if (yOffset + 10 > pageHeight) {
        doc.addPage();
        yOffset = 20; // Reset yOffset after new page
      }
      addWrappedText(text, marginLeft, yOffset);
    };

    const addSectionTitle = (title) => {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      addText(title);
    };

    const addNormalText = (text) => {
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      addText(text);
    };

    const title = "Training and Placement Cell Registration Form";
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    const textWidth = doc.getTextWidth(title);
    const xPosition = (pageWidth - textWidth) / 2; // Center the title
    doc.text(title, xPosition, yOffset);
    yOffset += 20; // Increase yOffset after title

    if (photobase64) {
      doc.addImage(
        photobase64,
        "JPEG",
        pageWidth - marginRight - photoWidth,
        yOffset,
        photoWidth,
        photoHeight
      );
    }

    addNormalText(`PRN: ${prn}`);
    addNormalText(`Name: ${fname} ${mname} ${lname}`);
    addNormalText(`Email: ${email}`);
    addNormalText(`Mobile: ${mob}`);
    addNormalText(`Parent's Mobile: ${pmob}`);
    addNormalText(`Date of Birth: ${dob}`);
    addNormalText(`Gender: ${gender}`);
    addNormalText(`Marital Status: ${maritalstatus}`);
    addNormalText(`Nationality: ${nationality}`);
    addNormalText(`Blood Group: ${bloodgroup}`);
    addNormalText(`Height: ${height} cm`);
    addNormalText(`Weight: ${weight} kg`);
    addNormalText(
      `Permanent Address: ${pstreet}, ${pcity}, ${pstate}, ${ppostalcode}`
    );
    addNormalText(
      `Current Address: ${cstreet}, ${ccity}, ${cstate}, ${cpostalcode}`
    );

    addSectionTitle("SSC Details");
    addNormalText(`Passing Year: ${sscpassingyear}`);
    addNormalText(`School Name: ${sscschoolname}`);
    addNormalText(`Total Marks: ${ssctotmarks}`);
    addNormalText(`Marks Obtained: ${sscmarksobt}`);
    addNormalText(`Percentage: ${sscper}`);
    addNormalText(`Board Name: ${sscboardname}`);

    if (hscOrDiploma === "HSC") {
      addSectionTitle("HSC Details");
      addNormalText(`Passing Year: ${hscpassingyear}`);
      addNormalText(`School Name: ${hscschoolname}`);
      addNormalText(`Total Marks: ${hsctotmarks}`);
      addNormalText(`Marks Obtained: ${hscmarksobt}`);
      addNormalText(`Percentage: ${hscper}`);
      addNormalText(`Stream: ${hscstream}`);
      addNormalText(`Science Total Marks: ${hscscitotmarks}`);
      addNormalText(`Science Marks Obtained: ${hscscimarksobt}`);
      addNormalText(`Science Percentage: ${hscsciper}`);
      addNormalText(`Board Name: ${hscboardname}`);
    } else if (hscOrDiploma === "Diploma") {
      addSectionTitle("Diploma Details");
      addNormalText(`Passing Year: ${diplomapassingyear}`);
      addNormalText(`College Name: ${diplomaclgname}`);
      addNormalText(`Specialization: ${diplomaspec}`);
      addNormalText(`CGPA: ${diplomacgpa}`);
      addNormalText(`Percentage: ${diplomaper}`);
    }

    const { department, collegeName, numberOfATKT, semesters } = ugData;
    addSectionTitle("UG Details");
    addNormalText(`Department: ${department}`);
    addNormalText(`College Name: ${collegeName}`);
    addNormalText(`Number of ATKT: ${numberOfATKT}`);

    const tableData = semesters.map((sem, index) => [
      `Sem-${index + 1}`,
      sem.year,
      sem.percentage,
      sem.attempts,
    ]);

    doc.autoTable({
      head: [["Semester", "Passing Year", "Percentage", "Number of Attempts"]],
      body: tableData,
      startY: yOffset + 10,
      margin: { left: marginLeft, right: marginRight }, // Ensure table fits within margins
      tableWidth: "wrap", // Ensure table width doesn't exceed page width
    });

    yOffset = doc.autoTable.previous.finalY + 10;

    const {
      department: pgDepartment,
      collegeName: pgCollegeName,
      numberOfATKT: pgNumberOfATKT,
      semesters: pgSemesters,
    } = pgData;
    addSectionTitle("PG Details");
    addNormalText(`Department: ${pgDepartment}`);
    addNormalText(`College Name: ${pgCollegeName}`);
    addNormalText(`Number of ATKT: ${pgNumberOfATKT}`);

    const pgTableData = pgSemesters.map((sem, index) => [
      `Sem-${index + 1}`,
      sem.year,
      sem.percentage,
      sem.attempts,
    ]);

    doc.autoTable({
      head: [["Semester", "Passing Year", "Percentage", "Number of Attempts"]],
      body: pgTableData,
      startY: yOffset + 10,
      margin: { left: marginLeft, right: marginRight }, // Ensure table fits within margins
      tableWidth: "wrap", // Ensure table width doesn't exceed page width
    });

    const jsPdfBytes = doc.output("arraybuffer");

    const mergedPdf = await PDFDocument.create();

    const jsPdfDoc = await PDFDocument.load(jsPdfBytes);
    const jsPdfPages = await mergedPdf.copyPages(
      jsPdfDoc,
      jsPdfDoc.getPageIndices()
    );
    jsPdfPages.forEach((page) => mergedPdf.addPage(page));

    const termsArrayBuffer = await fetch(termsPdf).then((res) =>
      res.arrayBuffer()
    );
    const termsPdfDoc = await PDFDocument.load(termsArrayBuffer);
    const termsPages = await mergedPdf.copyPages(
      termsPdfDoc,
      termsPdfDoc.getPageIndices()
    );
    termsPages.forEach((page) => mergedPdf.addPage(page));

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    saveAs(blob, "student_registration_with_terms.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // console.log("Holl")
    if (validateForm()) {
      const confirmation = window.confirm("Do you want to submit the form?");
      if (confirmation) {
        const formData = new FormData();

        formData.append("prn", prn);
        formData.append("fname", fname);
        formData.append("mname", mname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("mob", mob);
        formData.append("pmob", pmob);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("maritalstatus", maritalstatus);
        formData.append("nationality", nationality);
        formData.append("bloodgroup", bloodgroup);
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append("pstreet", pstreet);
        formData.append("pcity", pcity);
        formData.append("pstate", pstate);
        formData.append("ppostalcode", ppostalcode);
        formData.append("cstreet", cstreet);
        formData.append("ccity", ccity);
        formData.append("cstate", cstate);
        formData.append("cpostalcode", cpostalcode);
        formData.append("sscpassingyear", sscpassingyear);
        formData.append("sscschoolname", sscschoolname);
        formData.append("ssctotmarks", ssctotmarks);
        formData.append("sscmarksobt", sscmarksobt);
        formData.append("sscper", sscper);
        formData.append("sscboardname", sscboardname);
        formData.append("hscOrDiploma", hscOrDiploma);
        formData.append("hscpassingyear", hscpassingyear);
        formData.append("hscschoolname", hscschoolname);
        formData.append("hsctotmarks", hsctotmarks);
        formData.append("hscmarksobt", hscmarksobt);
        formData.append("hscper", hscper);
        formData.append("hscstream", hscstream);
        formData.append("hscscitotmarks", hscscitotmarks);
        formData.append("hscscimarksobt", hscscimarksobt);
        formData.append("hscsciper", hscsciper);
        formData.append("hscboardname", hscboardname);
        formData.append("diplomapassingyear", diplomapassingyear);
        formData.append("diplomaclgname", diplomaclgname);
        formData.append("diplomaspec", diplomaspec);
        formData.append("diplomacgpa", diplomacgpa);
        formData.append("diplomaper", diplomaper);
        formData.append("ugOrPg", educationLevel); // Add UG or PG identifier (e.g., UG/PG)
        formData.append("password", password);

        if (educationLevel === "UG" || educationLevel === "PG") {
          formData.append("ugDepartment", ugData.department);
          formData.append("ugCollegeName", ugData.collegeName);
          formData.append("ugATKT", ugData.numberOfATKT);

          ugData.semesters.forEach((semester, index) => {
            formData.append(`ug_sem${index + 1}_year`, semester.year);
            formData.append(
              `ug_sem${index + 1}_percentage`,
              semester.percentage
            );
            formData.append(`ug_sem${index + 1}_attempts`, semester.attempts);
            if (semester.marksheet) {
              formData.append(
                `ug_sem${index + 1}_marksheet`,
                semester.marksheet
              );
            }
          });
        }

        if (educationLevel === "PG") {
          formData.append("pgDepartment", pgData.department);
          formData.append("pgCollegeName", pgData.collegeName);
          formData.append("pgATKT", pgData.numberOfATKT);

          pgData.semesters.forEach((semester, index) => {
            formData.append(`pg_sem${index + 1}_year`, semester.year);
            formData.append(
              `pg_sem${index + 1}_percentage`,
              semester.percentage
            );
            formData.append(`pg_sem${index + 1}_attempts`, semester.attempts);
            if (semester.marksheet) {
              formData.append(
                `pg_sem${index + 1}_marksheet`,
                semester.marksheet
              );
            }
          });
        }

        if (photo) {
          formData.append("photo", photo);
        }
        if (sscmarksheet) {
          formData.append("ssc_marksheet", sscmarksheet);
        }
        if (hscmarksheet) {
          formData.append("hsc_marksheet", hscmarksheet);
        }
        if (diplomamarksheet) {
          formData.append("diploma_marksheet", diplomamarksheet);
        }

        try {
          const response = await axios.post(
            "http://localhost:5000/api/students/register",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
              },
            }
          );
          console.log("Response:", response.data); // Handle successful response

          await generatePDF(); // Ensure this is an async function
          alert("Form submitted and PDF generated!");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 409) {
              const errorMessage = error.response.data.message;
              if (errorMessage === "Email already registered") {
                alert(
                  "The email address is already registered. Please use a different email."
                );
              } else if (errorMessage === "PRN already registered") {
                alert(
                  "The PRN is already registered. Please use a different PRN"
                );
              } else {
                alert(
                  "There was an issue registering the student: " + errorMessage
                );
              }
            } else {
              alert("An unexpected error occurred. Please try again later");
            }
          } else {
            console.error("Error submitting form : ", error);
            alert(
              "There was an issue connecting to the server. Please try again. "
            );
          }
        }
      }
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <>
      {/* <NavbarStudent /> */}
      <div className="w-full h-full container bg-indigo-200 md:px-20 md:p-10 p-5">
        <ScrollButton handleButtonClick={handleButtonClick} rotationDegree={rotationDegree}/>
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-neutral-950 p-3 mt-20">
            Student Registration Form
          </h1>
          <p className="text-sm md:text-lg bg-neutral-950 text-white mt-1 py-1 rounded">
            Please fill out the form carefully to register.
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg rounded-lg md:p-8">
            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2 w-full">
                <div className="label">
                  <span className="label-text text-xl">
                    Permanent Registration Number (PRN):{" "}
                    <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter PRN"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    maxLength={10}
                    value={prn}
                    onChange={handlePrnChange}
                    name="prn"
                  />
                </div>
                {prnerror && <p className="text-red-500">{prnerror}</p>}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Upload Photo: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="file"
                    accept="image/jpeg" // Accept only jpg/jpeg files
                    className="glassmorphism input input-info student-form-input-style pt-2"
                    required
                    onChange={handleImageUpload}
                    name="photo" // Handle file upload
                  />
                </div>
              </label>
            </div>

            <label className="form-control bg-transparent border-0 m-2">
              <div className="label">
                <span className="label-text text-xl">
                  Name: <span className="text-red-700">*</span>
                </span>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="glassmorphism input input-info student-form-input-style"
                  required
                  value={fname}
                  onChange={(e) => handleName(e, "Firstname")}
                  name="fname"
                />
                <input
                  type="text"
                  placeholder="Enter Middle Name"
                  className="glassmorphism input input-info student-form-input-style"
                  required
                  value={mname}
                  onChange={(e) => handleName(e, "Middlename")}
                  name="mname"
                />
                <input
                  type="text"
                  placeholder="Enter Surame"
                  className="glassmorphism input input-info student-form-input-style"
                  required
                  value={lname}
                  onChange={(e) => handleName(e, "Lastname")}
                  name="lname"
                />
              </div>
              {nameerror && <p className="text-red-500">{nameerror}</p>}
            </label>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Email: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter Email Id"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={email}
                    onChange={handleEmail}
                    name="email"
                  />
                </div>
                {emailerror && <p className="text-red-500">{emailerror}</p>}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Mobile Number: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={mob}
                    onChange={(e) => handleMobile(e, "smob")}
                    maxLength={10}
                    name="mob"
                  />
                </div>
                {moberror && <p className="text-red-500">{moberror}</p>}
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Parent Mobile Number:{" "}
                    <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Parent Mobile Number"
                    className="glassmorphism input input-info student-form-input-style"
                    value={pmob}
                    required
                    onChange={(e) => handleMobile(e, "pmob")}
                    maxLength={10}
                    name="pmob"
                  />
                </div>
                {pmoberror && <p className="text-red-500">{pmoberror}</p>}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Date of Birth: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="date"
                    placeholder="Enter Mobile Number"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={dob}
                    onChange={(e) => setdob(e.target.value)}
                    name="dob"
                  />
                </div>
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Gender: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <select
                    className="glassmorphism select select-info student-form-input-style"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    name="gender"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Marital Status: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <select
                    className="glassmorphism select select-info student-form-input-style"
                    required
                    value={maritalstatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    name="maritalstatus"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Nationality: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Nationality"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    name="nationality"
                  />
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Blood Group: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <select
                    className="glassmorphism select select-info student-form-input-style"
                    required
                    value={bloodgroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    name="bloodgroup"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Height (cm): <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Height (cm)"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={height}
                    onChange={handleHeight}
                    name="height"
                  />
                </div>
                {heighterror && <p className="text-red-500">{heighterror}</p>}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Weight (kg): <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Weight (kg)"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={weight}
                    onChange={handleWeight}
                    name="weight"
                  />
                </div>
                {weighterror && <p className="text-red-500">{weighterror}</p>}
              </label>
            </div>

            <h4 className="text-2xl font-bold mx-3 mt-3">
              Permanent Address: <span className="text-red-700">*</span>
            </h4>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Street:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Street"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={pstreet}
                    onChange={(e) => setPstreet(e.target.value)}
                    name="pstreet"
                  />
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">City:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={pcity}
                    onChange={(e) => setPcity(e.target.value)}
                    name="pcity"
                  />
                </div>
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">State:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter State"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={pstate}
                    onChange={(e) => setPstate(e.target.value)}
                    name="pstate"
                  />
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Postal Code:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Postal Code"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={ppostalcode}
                    onChange={handlePostalCode}
                    maxLength={6}
                    name="ppostalcode"
                  />
                </div>
                {ppostalcodeerror && (
                  <p className="text-red-500">{ppostalcodeerror}</p>
                )}
              </label>
            </div>

            <input
              type="checkbox"
              name="Address_CheckBox"
              className="glassmorphism text-xl label-text m-2"
              onChange={handleCheckBox}
              checked={isSameAddress}
            />
            <label htmlFor="Address_Checkbox" className="label-text text-lg">
              Current Address same as Permanent Address
            </label>

            <h4 className="text-2xl font-bold mx-3 mt-3">
              Current Address: <span className="text-red-700">*</span>
            </h4>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Street:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Street"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={cstreet}
                    onChange={(e) => setCstreet(e.target.value)}
                    disabled={isSameAddress}
                    name="cstreet"
                  />
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">City:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={ccity}
                    onChange={(e) => setCcity(e.target.value)}
                    disabled={isSameAddress}
                    name="ccity"
                  />
                </div>
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">State:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter State"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={cstate}
                    onChange={(e) => setCstate(e.target.value)}
                    disabled={isSameAddress}
                    name="cstate"
                  />
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Postal Code:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Postal Code"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={cpostalcode}
                    onChange={handleCPostalCode}
                    disabled={isSameAddress}
                    name="cpostalcode"
                  />
                </div>
                {cpostalcodeerror && (
                  <p className="text-red-500">{cpostalcodeerror}</p>
                )}
              </label>
            </div>

            <h4 className="text-2xl font-bold mx-3 mt-3">
              SSC Details: <span className="text-red-700">*</span>
            </h4>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Passing Year:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Passing Year"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={sscpassingyear}
                    onChange={handleSSCPassingYear}
                    name="sscpassingyear"
                  />
                </div>
                {sscPYError && <p className="text-red-500">{sscPYError}</p>}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">School Name:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter School Name"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={sscschoolname}
                    onChange={(e) => setSSCschoolname(e.target.value)}
                    name="sscschoolname"
                  />
                </div>
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Total Marks:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Total Marks"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={ssctotmarks}
                    onChange={handleSSCtotmarks}
                    name="ssctotmarks"
                  />
                </div>
                {ssctotmarkserror && (
                  <p className="text-red-500">{ssctotmarkserror}</p>
                )}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Marks Obtained:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Marks Obtained"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={sscmarksobt}
                    onChange={handleSSCmarksobt}
                    name="sscmarksobt"
                  />
                </div>
                {sscmarksobterror && (
                  <p className="text-red-500">{sscmarksobterror}</p>
                )}
              </label>
            </div>

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Percentage:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter Percentage"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    disabled
                    value={sscper}
                    name="sscper"
                  />
                </div>
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">Board Name:</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Board Name"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={sscboardname}
                    onChange={(e) => setSSCboardname(e.target.value)}
                    name="sscboardname"
                  />
                </div>
              </label>
            </div>

            <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
              <div className="label">
                <span className="label-text text-xl">SSC Marksheet:</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="file"
                  className="glassmorphism input input-info student-form-input-style pt-2"
                  onChange={(e) => setSSCmarksheet(e.target.files[0])}
                  required
                  accept=".pdf"
                  name="ssc_marksheet"
                />
              </div>
            </label>

            <h4 className="text-2xl font-bold mx-3 mt-4">
              HSC or Diploma Details: <span className="text-red-700">*</span>
            </h4>

            <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
              <div className="flex gap-4">
                <select
                  className="glassmorphism select select-info student-form-input-style"
                  onChange={handleHscOrDiplomaChange}
                  value={hscOrDiploma}
                  required
                  name="hscOrDiploma"
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="HSC">HSC</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
            </label>

            {hscOrDiploma === "HSC" && (
              <div id="hsc">
                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Passing Year:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Passing Year"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hscpassingyear}
                        onChange={handleHSCpy}
                        name="hscpassingyear"
                      />
                    </div>
                    {hscpyerror && <p className="text-red-500">{hscpyerror}</p>}
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">School Name:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="School Name"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hscschoolname}
                        onChange={(e) => setHSCschoolname(e.target.value)}
                        name="hscschoolname"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Total Marks:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Total Marks"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hsctotmarks}
                        onChange={handleHSCtotmarks}
                        name="hsctotmarks"
                      />
                    </div>
                    {hsctotmarkserror && (
                      <p className="text-red-500">{hsctotmarkserror}</p>
                    )}
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Marks Obtained:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Marks Obtained"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hscmarksobt}
                        onChange={handleHSCmarksobt}
                        name="hscmarksobt"
                      />
                    </div>
                    {hscmarksobterror && (
                      <p className="text-red-500">{hscmarksobterror}</p>
                    )}
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Percentage:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Percentage"
                        className="glassmorphism input input-info student-form-input-style"
                        disabled
                        value={hscper}
                        name="hscper"
                      />
                    </div>
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Stream: </span>
                    </div>
                    <div className="flex gap-4">
                      <select
                        className="select select-info student-form-input-style"
                        required
                        value={hscstream}
                        onChange={(e) => setHSCstream(e.target.value)}
                        name="hscstream"
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option value="PCM">PCM</option>
                        <option value="PCB">PCB</option>
                      </select>
                    </div>
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Science Total Marks:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Science Total Marks"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hscscitotmarks}
                        onChange={handlehscscitotmarks}
                        name="hscscitotmarks"
                      />
                    </div>
                    {hscscitotmarkserror && (
                      <p className="text-red-500">{hscscitotmarkserror}</p>
                    )}
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Science Marks Obtained:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Marks Obtained"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hscscimarksobt}
                        onChange={handlehscscimarksobt}
                        name="hscscimarksobt"
                      />
                    </div>
                    {hscscimarksobterror && (
                      <p className="text-red-500">{hscscimarksobterror}</p>
                    )}
                  </label>
                </div>

                <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                  <div className="label">
                    <span className="label-text text-xl">
                      Science Percentage:
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Science Percentage"
                      className="glassmorphism input input-info student-form-input-style"
                      disabled
                      value={hscsciper}
                      name="hscsciper"
                    />
                  </div>
                </label>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Board Name:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Board Name"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={hscboardname}
                        onChange={(e) => setHSCboardname(e.target.value)}
                        name="hscboardname"
                      />
                    </div>
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">HSC Marksheet:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="file"
                        className="glassmorphism input input-info student-form-input-style pt-2"
                        required
                        onChange={(e) => setHSCmarksheet(e.target.files[0])}
                        accept=".pdf"
                        name="hsc_marksheet"
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {hscOrDiploma === "Diploma" && (
              <div id="diploma">
                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Passing Year:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Passing Year"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={diplomapassingyear}
                        onChange={handlediplomapy}
                        name="diplomapassingyear"
                      />
                    </div>
                    {diplomapyerror && (
                      <p className="text-red-500">{diplomapyerror}</p>
                    )}
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">College Name:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="College Name"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={diplomaclgname}
                        onChange={(e) => setDiplomaclgname(e.target.value)}
                        name="diplomaclgname"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Diploma Specialization:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Stream/Diploma Specialization"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={diplomaspec}
                        onChange={(e) => setDiplomaspec(e.target.value)}
                        name="diplomaspec"
                      />
                    </div>
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Diploma CGPA:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Diploma CGPA"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={diplomacgpa}
                        onChange={handlediplomacgpa}
                        name="diplomacgpa"
                      />
                    </div>
                    {diplomacgpaerror && (
                      <p className="text-red-500">{diplomacgpaerror}</p>
                    )}
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Diploma Percentage:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Diploma Percentage"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        value={diplomaper}
                        onChange={handlediplomaper}
                        name="diplomaper"
                      />
                    </div>
                    {diplomapererror && (
                      <p className="text-red-500">{diplomapererror}</p>
                    )}
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Diploma Marksheet:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="file"
                        placeholder="Board Name"
                        className="glassmorphism input input-info student-form-input-style pt-2"
                        required
                        onChange={(e) => setDiplomamarksheet(e.target.files[0])}
                        accept=".pdf"
                        name="diploma_marksheet"
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            <h4 className="text-2xl font-bold mx-3 mt-4">
              UG or PG: <span className="text-red-700">*</span>
            </h4>

            <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
              <div className="flex gap-4">
                <select
                  className="glassmorphism select select-info student-form-input-style"
                  required
                  value={educationLevel} // Bound to state
                  onChange={handleEducationChange} // Handler for change event
                  name="ugOrPg"
                >
                  <option value="" disabled>
                    Select
                  </option>{" "}
                  {/* Default option */}
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                </select>
              </div>
            </label>

            {(educationLevel === "UG" || educationLevel === "PG") && (
              <div id="ug">
                <h4 className="text-2xl font-bold mx-3 mt-4">UG Details:</h4>
                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Department:</span>
                    </div>
                    <div className="flex">
                      <select
                        className="glassmorphism select select-info student-form-input-style"
                        onChange={handleDepartmentChange}
                        required
                        name="ugDepartment"
                        value={ugData.department}
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        {/* <option value="Department of Applied Chemistry">Department of Applied Chemistry</option>
                        <option value="Department of Applied Mathematics">Department of Applied Mathematics</option>
                        <option value="Department of Applied Mechanics and Structural Engineering">Department of Applied Mechanics and Structural Engineering</option> */}
                        <option value="BSC Applied Physics">
                          BSC Applied Physics
                        </option>
                        <option value="B.Arch">B.Arch</option>
                        <option value="BE Chemical Engineering">
                          BE Chemical Engineering
                        </option>
                        <option value="BE Civil Engineering">
                          BE Civil Engineering
                        </option>
                        <option value="BE Computer Science and Engineering">
                          BE Computer Science and Engineering
                        </option>
                        <option value="BE Electrical Engineering">
                          BE Electrical Engineering
                        </option>
                        <option value="BE Electronics Engineering">
                          BE Electronics Engineering
                        </option>
                        <option value="BE Mechanical Engineering">
                          BE Mechanical Engineering
                        </option>
                        <option value="BE Metallurgical and Materials Engineering">
                          BE Metallurgical and Materials Engineering
                        </option>
                        <option value="BE Textile Engineering">
                          BE Textile Engineering
                        </option>
                        <option value="Water Resources Engineering and Management(WREM)">
                          Water Resources Engineering and Management (WREM)
                        </option>
                      </select>
                    </div>
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">College Name:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="College Name"
                        className="glassmorphism input input-info student-form-input-style"
                        required
                        onChange={(e) =>
                          setUgData({ ...ugData, collegeName: e.target.value })
                        }
                        name="ugCollegeName"
                        value={ugData.collegeName}
                      />
                    </div>
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Number of ATKT:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Number of ATKT (0-2)"
                        max={2}
                        value={ugData.numberOfATKT}
                        className="glassmorphism input input-info student-form-input-style"
                        onChange={handleUgAtktChange}
                        required
                        min={0}
                        name="ugATKT"
                      />
                    </div>
                    {ugerrors.atkt && (
                      <p className="text-red-500">{ugerrors.atkt}</p> // Display error
                    )}
                  </label>
                </div>
                <br />

                {ugData.semesters.map((sem, index) => (
                  <div key={index} className="glassmorphism m-4 p-4">
                    <div className="flex">
                      <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                        <span className="label-text text-xl">
                          Sem-{index + 1} Year:
                        </span>
                        <input
                          type="month"
                          className="glassmorphism input input-info student-form-input-style"
                          onChange={(e) => handleUGDataChange(e, index, "year")}
                          value={sem.year}
                          name={`ug_sem${index + 1}_year`}
                        />
                      </label>

                      <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                        <span className="label-text text-xl">
                          Sem-{index + 1} Percentage:
                        </span>
                        <input
                          type="text"
                          placeholder="Percentage"
                          className="glassmorphism input input-info student-form-input-style"
                          onChange={(e) =>
                            handleUgChange(e, index, "percentage")
                          }
                          value={sem.percentage}
                          name={`ug_sem${index + 1}_percentage`}
                        />
                        {ugerrors.percentages[index] && (
                          <p className="text-red-500">
                            {ugerrors.percentages[index]}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className="flex">
                      <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                        <span className="label-text text-xl">
                          Sem-{index + 1} Attempts:
                        </span>
                        <input
                          type="number"
                          placeholder="Attempts"
                          className="glassmorphism input input-info student-form-input-style"
                          onChange={(e) => handleUgChange(e, index, "attempts")}
                          value={sem.attempts}
                          name={`ug_sem${index + 1}_attempts`}
                        />
                        {ugerrors.attempts[index] && (
                          <p className="text-red-500">
                            {ugerrors.attempts[index]}
                          </p>
                        )}
                      </label>

                      <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                        <span className="label-text text-xl">
                          Sem-{index + 1} Marksheet:
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          className="glassmorphism input input-info student-form-input-style pt-2"
                          onChange={(e) => handleFileChange(e, index)}
                          name={`ug_sem${index + 1}_marksheet`}
                        />
                      </label>
                    </div>
                  </div>
                ))}
                <br />
              </div>
            )}

            {educationLevel === "PG" && (
              <div id="pg">
                <h4 className="text-2xl font-bold mx-3 mt-4">PG Details:</h4>
                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">Department:</span>
                    </div>
                    <label className="form-control bg-transparent border-0 p-0">
                      <div className="flex">
                        <select
                          className="glassmorphism select select-info student-form-input-style"
                          value={selectedDepartment}
                          onChange={handlePgDepartmentChange}
                          required
                          name="pgDepartment"
                        >
                          <option value="">Select</option>
                          <option value="MSC applied Maths">
                            MSC applied Maths
                          </option>
                          <option value="MSC applied Chemistry">
                            MSC applied Chemistry
                          </option>
                          <option value="MSC applied Physics">
                            MSC applied Physics
                          </option>
                          <option value="MSC Industrial Mathematics">
                            MSC Industrial Mathematics
                          </option>
                          <option value="MSC Financial Mathematics">
                            MSC Financial Mathematics
                          </option>
                          <option value="Master of Computer Applications">
                            Master of Computer Applications
                          </option>
                          <option value="ME Civil Environmental Engineering">
                            ME Civil Environmental Engineering
                          </option>
                          <option value="ME Civil Fracture Mechanics">
                            ME Civil Fracture Mechanics
                          </option>
                          <option value="ME Civil Geotechnical Engineering">
                            ME Civil Geotechnical Engineering
                          </option>
                          <option value="ME Civil Highway and Transportation Engineering">
                            ME Civil Highway and Transportation Engineering
                          </option>
                          <option value="ME Civil Integrated Water Management">
                            ME Civil Integrated Water Management
                          </option>
                          <option value="ME Civil Structural Engineering">
                            ME Civil Structural Engineering
                          </option>
                          <option value="ME Civil Water Resources Engineering">
                            ME Civil Water Resources Engineering
                          </option>
                          <option value="ME Electrical Automatic Control and Robotics">
                            ME Electrical Automatic Control and Robotics
                          </option>
                          <option value="ME Electrical Power Engineering">
                            ME Electrical Power Engineering
                          </option>
                          <option value="ME Electrical Industrial Engineering">
                            ME Electrical Industrial Engineering
                          </option>
                          <option value="ME Electrical Microprocessor System Application">
                            ME Electrical Microprocessor System Application
                          </option>
                          <option value="ME Mechanical Jet Propulsion and Gas Turbine Plant">
                            ME Mechanical Jet Propulsion and Gas Turbine Plant
                          </option>
                          <option value="ME Mechanical Production Engineering">
                            ME Mechanical Production Engineering
                          </option>
                          <option value="ME Mechanical Thermal Science">
                            ME Mechanical Thermal Science
                          </option>
                          <option value="ME Metallurgy Industrial Metallurgy">
                            ME Metallurgy Industrial Metallurgy
                          </option>
                          <option value="ME Metallurgy Material Science and Engineering">
                            ME Metallurgy Material Science and Engineering
                          </option>
                          <option value="ME Metallurgy Welding Technology">
                            ME Metallurgy Welding Technology
                          </option>
                          <option value="ME Textile Engineering">
                            ME Textile Engineering
                          </option>
                          <option value="ME Textile Man Made Textile">
                            ME Textile Man Made Textile
                          </option>
                          <option value="ME Textile Processing">
                            ME Textile Processing
                          </option>
                          <option value="Master of Urban and Regional Planning">
                            Master of Urban and Regional Planning
                          </option>
                        </select>
                      </div>
                    </label>
                  </label>

                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">College Name:</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="College Name"
                        className="glassmorphism input input-info student-form-input-style"
                        value={pgData.collegeName}
                        onChange={(e) =>
                          setPgData({ ...pgData, collegeName: e.target.value })
                        }
                        required
                        name="pgCollegeName"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                    <div className="label">
                      <span className="label-text text-xl">
                        Number of ATKT:
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Number of ATKT"
                        className="glassmorphism input input-info student-form-input-style"
                        min={0}
                        max={2}
                        value={pgData.atkt}
                        onChange={handlePgAtktChange}
                        required
                        name="pgATKT"
                      />
                    </div>
                    {pgErrors.atkt && (
                      <p className="text-red-500">{pgErrors.atkt}</p>
                    )}
                  </label>
                </div>
                <br />

                {pgData.semesters.map((sem, index) => (
                  <div className="glassmorphism m-4 p-4">
                    <div key={index}>
                      <div className="flex">
                        <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Sem-{index + 1} Passing Year:
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <input
                              type="month"
                              placeholder="Passing Year"
                              className="glassmorphism input input-info student-form-input-style"
                              value={sem.year}
                              onChange={(e) => handlePgChange(e, index, "year")}
                              name={`pg_sem${index + 1}_year`}
                            />
                          </div>
                        </label>

                        <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Sem-{index + 1} Percentage:
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <input
                              type="number"
                              placeholder="Percentage"
                              className="glassmorphism input input-info student-form-input-style"
                              value={sem.percentage}
                              onChange={(e) =>
                                handlePgChange(e, index, "percentage")
                              }
                              name={`pg_sem${index + 1}_percentage`}
                            />
                          </div>
                          {pgErrors.percentages[index] && (
                            <p className="text-red-500">
                              {pgErrors.percentages[index]}
                            </p>
                          )}
                        </label>
                      </div>

                      <div className="flex">
                        <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Number of attempts:
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <input
                              type="number"
                              placeholder="Number of attempts"
                              className="glassmorphism input input-info student-form-input-style"
                              value={sem.attempts}
                              onChange={(e) =>
                                handlePgChange(e, index, "attempts")
                              }
                              name={`pg_sem${index + 1}_attempts`}
                            />
                          </div>
                          {pgErrors.attempts[index] && (
                            <p className="text-red-500">
                              {pgErrors.attempts[index]}
                            </p>
                          )}
                        </label>

                        <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Sem-{index + 1} Marksheet:
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <input
                              type="file"
                              className="glassmorphism input input-info student-form-input-style pt-2"
                              onChange={(e) => handlePgFileChange(e, index)}
                              name={`pg_sem${index + 1}_marksheet`}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex">
              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Password: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={password}
                    onChange={handlePassword}
                    name="password"
                  />
                </div>
                {passworderror && (
                  <p className="text-red-500">{passworderror}</p>
                )}
              </label>

              <label className="form-control bg-transparent border-0 m-2 md:w-1/2">
                <div className="label">
                  <span className="label-text text-xl">
                    Confirm Password: <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="glassmorphism input input-info student-form-input-style"
                    required
                    value={cpassword}
                    onChange={handleCPassword}
                    name="confirm-password"
                  />
                </div>
                {cpassworderror && (
                  <p className="text-red-500">{cpassworderror}</p>
                )}
              </label>
            </div>

            <div className="form-control my-4">
              <label className="cursor-pointer flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="glassmorphism checkbox my-3"
                  checked={isAgreed}
                  onChange={handleAgreement}
                />
                <span className="label-text">
                  I agree to the{" "}
                  <a
                    href="/TNP Terms.pdf"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    terms and conditions
                  </a>
                  .
                </span>
              </label>
            </div>

            <div className="text-center py-3">
              <a href="/student_login">
                <button
                  type="submit"
                  className={`btn bg-indigo-500 text-white btn-info px-2 py-1 rounded 
              ${
                !isAgreed
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-600"
              }
             `}
                  disabled={!isAgreed}
                >
                  Submit
                </button>
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default StudentForm;
