import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    tnpId: '',
    name: '',
    email: '',
    mob: '',
    p_mob: '',
    dateOfBirth: '',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: '',
    bloodGroup: '',
    height: '',
    weight: '',
    pre_address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    per_address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    ssc: {
      passingYear: '',
      schoolName: '',
      marksObtained: '',
      totalMarks: '',
      percentage: '',
      boardName: '',
    },
    hscOrDiploma: 'HSC',
    hscOrDiplomaDetails: {
      passingYear: '',
      schoolOrCollegeName: '',
      marksObtained: '',
      totalMarks: '',
      percentage: '',
      scienceMarksObtained: '',
      scienceTotalMarks: '',
      sciencePercentage: '',
      streamOrDiplomaSpecialization: '',
      diplomaCgpa: '',
      diplomaPercentage: '',
    },
    higherEducation: 'BE',
    branch: '',
    isPlaced: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [type]: {
        ...formData[type],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container>
      <h2 className="mt-4 mb-3">Student Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="studentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="tnpId">
              <Form.Label>TNP ID</Form.Label>
              <Form.Control
                type="text"
                name="tnpId"
                value={formData.tnpId}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="mob">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mob"
                value={formData.mob}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="p_mob">
              <Form.Label>Parent Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="p_mob"
                value={formData.p_mob}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="maritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                as="select"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
              >
                <option>Single</option>
                <option>Married</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="height">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="weight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h4>Permanent Address</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="pre_address.street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.pre_address.street}
                onChange={(e) => handleAddressChange(e, 'pre_address')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="pre_address.city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.pre_address.city}
                onChange={(e) => handleAddressChange(e, 'pre_address')}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="pre_address.state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.pre_address.state}
                onChange={(e) => handleAddressChange(e, 'pre_address')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="pre_address.postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={formData.pre_address.postalCode}
                onChange={(e) => handleAddressChange(e, 'pre_address')}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h4>Current Address</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="per_address.street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.per_address.street}
                onChange={(e) => handleAddressChange(e, 'per_address')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="per_address.city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.per_address.city}
                onChange={(e) => handleAddressChange(e, 'per_address')}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="per_address.state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.per_address.state}
                onChange={(e) => handleAddressChange(e, 'per_address')}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="per_address.postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={formData.per_address.postalCode}
                onChange={(e) => handleAddressChange(e, 'per_address')}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h4>SSC Details</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="ssc.passingYear">
              <Form.Label>Passing Year</Form.Label>
              <Form.Control
                type="number"
                name="passingYear"
                value={formData.ssc.passingYear}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ssc.schoolName">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                name="schoolName"
                value={formData.ssc.schoolName}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="ssc.marksObtained">
              <Form.Label>Marks Obtained</Form.Label>
              <Form.Control
                type="number"
                name="marksObtained"
                value={formData.ssc.marksObtained}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ssc.totalMarks">
              <Form.Label>Total Marks</Form.Label>
              <Form.Control
                type="number"
                name="totalMarks"
                value={formData.ssc.totalMarks}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="ssc.percentage">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                type="number"
                name="percentage"
                value={formData.ssc.percentage}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="ssc.boardName">
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                name="boardName"
                value={formData.ssc.boardName}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="hscOrDiploma">
              <Form.Label>HSC or Diploma</Form.Label>
              <Form.Control
                as="select"
                name="hscOrDiploma"
                value={formData.hscOrDiploma}
                onChange={handleChange}
                required
              >
                <option value="HSC">HSC</option>
                <option value="Diploma">Diploma</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="higherEducation">
              <Form.Label>Higher Education</Form.Label>
              <Form.Control
                as="select"
                name="higherEducation"
                value={formData.higherEducation}
                onChange={handleChange}
                required
              >
                <option value="BE">BE</option>
                <option value="BARCH">BARCH</option>
                <option value="MSC">MSC</option>
                <option value="MCA">MCA</option>
                <option value="ME">ME</option>
                <option value="MURP">MURP</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="branch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="isPlaced">
              <Form.Label>Placement Status</Form.Label>
              <Form.Control
                type="text"
                name="isPlaced"
                value={formData.isPlaced}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default StudentForm;