"use client";

import React, { useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Container,
    Typography,
    Box,
    Stack,
    Card,
    CardContent,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const departments = ["HR", "Development", "Security", "Sales"];

interface FormData {
    name: string;
    employeeId: string;
    email: string;
    phoneNumber: string;
    department: string;
    dateOfJoining: string;
    role: string;
}

const StyledContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.common.black, 
}));

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    maxWidth: 500,
    width: "100%",
    backgroundColor: theme.palette.common.white, 
}));


const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    fontWeight: 600,
    "&:hover": {
        boxShadow: theme.shadows[3],
    },
}));

const EmployeeForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!/^[a-zA-Z0-9]{1,10}$/.test(formData.employeeId))
            newErrors.employeeId =
                "Employee ID must be alphanumeric (max 10 chars)";
        if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
        if (!/^\d{10}$/.test(formData.phoneNumber))
            newErrors.phoneNumber = "Phone number must be 10 digits";
        if (!formData.department)
            newErrors.department = "Department is required";
        if (!formData.dateOfJoining)
            newErrors.dateOfJoining = "Date of Joining is required";
        if (!formData.role) newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        const data = new FormData(event.currentTarget);

        const payload = {
            name: data.get("name"),
            empId: data.get("employeeId"),
            email: data.get("email"),
            phone: data.get("phoneNumber"),
            dep: data.get("department"),
            doj: data.get("dateOfJoining"),
            role: data.get("role"),
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/employee/create",
                payload
            );
            console.log("Response:", response.data);
            if (response.data.includes("Duplicate")) {
                alert("Employee ID or the email is already exists.");
                return;
            }
            alert("Employee added successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Login failed! Please check your credentials.");
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
            employeeId: "",
            email: "",
            phoneNumber: "",
            department: "",
            dateOfJoining: "",
            role: "",
        });
        setErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <StyledContainer>
            <StyledCard>
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                        Employee Management System
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Stack spacing={3}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Employee ID"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                error={!!errors.employeeId}
                                helperText={errors.employeeId}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                select
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                error={!!errors.department}
                                helperText={errors.department}
                                fullWidth
                                variant="outlined"
                            >
                                {departments.map((dept) => (
                                    <MenuItem key={dept} value={dept}>
                                        {dept}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="date"
                                label="Date of Joining"
                                name="dateOfJoining"
                                InputLabelProps={{ shrink: true }}
                                value={formData.dateOfJoining}
                                onChange={handleChange}
                                error={!!errors.dateOfJoining}
                                helperText={errors.dateOfJoining}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                error={!!errors.role}
                                helperText={errors.role}
                                fullWidth
                                variant="outlined"
                            />

                            <Stack direction="row" spacing={2} mt={1}>
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Submit
                                </StyledButton>
                                <StyledButton
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleReset}
                                    fullWidth
                                >
                                    Reset
                                </StyledButton>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </StyledCard>
        </StyledContainer>
    );
};

export default EmployeeForm;
