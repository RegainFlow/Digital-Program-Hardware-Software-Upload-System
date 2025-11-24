import { StandardField } from './types';

export const TARGET_SCHEMA: StandardField[] = [
  { key: 'employee_id', label: 'Employee ID', type: 'string', required: true, description: 'Unique identifier for the employee' },
  { key: 'first_name', label: 'First Name', type: 'string', required: true, description: 'Employee first name' },
  { key: 'last_name', label: 'Last Name', type: 'string', required: true, description: 'Employee last name' },
  { key: 'email_address', label: 'Email Address', type: 'string', required: true, description: 'Corporate email address' },
  { key: 'department', label: 'Department', type: 'string', required: false, description: 'Functional business unit' },
  { key: 'start_date', label: 'Start Date', type: 'date', required: false, description: 'Date of joining' },
  { key: 'salary', label: 'Annual Salary', type: 'number', required: false, description: 'Gross annual compensation' },
  { key: 'is_active', label: 'Active Status', type: 'boolean', required: true, description: 'Whether the employee is currently active' },
];

export const MOCK_CSV_DATA = `Emp Ref,Given Name,Surname,Work Email,Dept,Joined,Comp,Status
101,John,Doe,j.doe@company.com,Engineering,2022-01-15,85000,Active
102,Jane,Smith,jane.smith@company.com,Marketing,2021-06-20,72000,Active
103,Bob,Johnson,b.johnson@company.com,Engineering,2023-03-01,90000,On Leave
104,Alice,Williams,alice.w@company.com,HR,2020-11-10,65000,Terminated`;
