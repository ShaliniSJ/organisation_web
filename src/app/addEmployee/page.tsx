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
import { styled } from "@mui/material/styles";

import axios from "axios";

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
const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    position: "relative",
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "linear-gradient(135deg, hsl(210, 36%, 96%) 0%, hsl(200, 50%, 85%) 50%, hsl(195, 60%, 80%) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "linear-gradient(135deg, hsl(210, 30%, 10%) 0%, hsl(220, 25%, 15%) 50%, hsl(225, 20%, 20%) 100%)",
        }),
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
        if (new Date(formData.dateOfJoining) > new Date())
            newErrors.dateOfJoining = "Date cannot be in the future";
        if (!formData.role) newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Submitted Data:", formData);
            alert("Form Submitted Successfully");
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
        <SignInContainer maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Card
                    sx={{
                        backgroundColor: "#ffffff",
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            Employee Management System
                        </Typography>
                        <form onSubmit={handleSubmit} noValidate>
                            <Stack spacing={2}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                                <TextField
                                    label="Employee ID"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    error={!!errors.employeeId}
                                    helperText={errors.employeeId}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                />
                                <TextField
                                    select
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    error={!!errors.department}
                                    helperText={errors.department}
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
                                />
                                <TextField
                                    select
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    error={!!errors.role}
                                    helperText={errors.role}
                                ></TextField>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleReset}
                                        fullWidth
                                    >
                                        Reset
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </SignInContainer>
    );
};

export default EmployeeForm;
