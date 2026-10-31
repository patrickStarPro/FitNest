# FitNest Test Cases - Quick Reference Guide

## Complete List of 120 Test Cases

### DOMAIN 1: ROUTING & NAVIGATION (Tests 1-13)

#### App.tsx - Route Configuration (Tests 1-7)
1. Should render Home component when navigating to "/" path
2. Should render Home component when navigating to "/home" path
3. Should render FitnessForm component when navigating to "/fitness-form" path
4. Should render ViewForm component when navigating to "/view-form" path
5. Should render UpdateForm component when navigating to "/update-form/:joiningId" path
6. Should render navbar with "Fit Nest" brand text
7. Should have navbar brand link pointing to "/home"

#### NavItems.tsx - Navigation Links (Tests 8-13)
8. Should render "Join Now" link with correct text
9. Should have "Join Now" link pointing to "/fitness-form"
10. Should render "Click here" link with correct text
11. Should have "Click here" link pointing to "/view-form"
12. Should render heading text "Ready to Get Fit?"
13. Should render heading text "Review and Update Fitness Insights"

---

### DOMAIN 2: FITNESSFORM COMPONENT (Tests 14-62)

#### Form Fields Rendering (Tests 14-35)
14. Should render name input field with correct name attribute
15. Should render name input field with correct data-testid attribute
16. Should render name input field with placeholder "Enter your name"
17. Should render contactNo input field with correct name attribute
18. Should render contactNo input field with correct data-testid attribute
19. Should render contactNo input field with placeholder "Enter your contact number"
20. Should render contactNo field as type number
21. Should render duration input field with correct name attribute
22. Should render duration input field with correct data-testid attribute
23. Should render duration input field with placeholder "Enter duration in months"
24. Should render fitnessGoal dropdown with correct name attribute
25. Should render fitnessGoal dropdown with correct data-testid attribute
26. Should render fitnessGoal dropdown with default disabled option "--Select your Fitness Goal--"
27. Should have disabled default option in fitnessGoal dropdown
28. Should render fitnessGoal dropdown with "Weight Loss" option
29. Should render fitnessGoal dropdown with "Muscle Gain" option
30. Should render fitnessGoal dropdown with "Endurance" option
31. Should render fitnessGoal dropdown with "Cardiovascular Health" option
32. Should render preferredTime radio buttons with correct name attribute
33. Should render Morning radio button with value "Morning"
34. Should render Afternoon radio button with value "Afternoon"
35. Should render Evening radio button with value "Evening"

#### Submit Button (Tests 36-39)
36. Should render submit button with name="join"
37. Should render submit button with data-testid="join"
38. Should have submit button disabled when form is invalid (empty fields)
39. Should enable submit button when all form fields are valid

#### Validation - Name Field (Tests 40-47)
40. Should display nameError when name has only one word
41. Should display nameError when first name does not start with uppercase
42. Should display nameError when first name has less than 3 characters
43. Should display nameError when last name has less than 2 characters
44. Should display nameError when last name does not start with uppercase
45. Should display nameError when name contains numbers
46. Should NOT display nameError when name is valid (e.g., "John David")
47. Should accept valid name "Alice Ds" (2-letter last name)

#### Validation - ContactNo Field (Tests 48-54)
48. Should display contactNoError when contact number has less than 10 digits
49. Should display contactNoError when contact number starts with invalid digit (e.g., 3)
50. Should display contactNoError when contact number starts with 5
51. Should NOT display contactNoError when contact number is valid starting with 6
52. Should NOT display contactNoError when contact number is valid starting with 7
53. Should NOT display contactNoError when contact number is valid starting with 8
54. Should NOT display contactNoError when contact number is valid starting with 9

#### Validation - Duration Field (Tests 55-57)
55. Should display durationError when duration is 0
56. Should display durationError when duration is negative
57. Should NOT display durationError when duration is valid positive number

#### Axios POST Tests (Tests 58-63)
58. Should make axios POST call to correct URL on form submit
59. Should display successMessage with ID when axios POST is successful
60. Should display errorMessage when axios POST fails
61. Should clear errorMessage when successMessage is displayed
62. Should clear successMessage when errorMessage is displayed
63. Should prevent page reload on form submit

---

### DOMAIN 3: FORM VALIDATION LOGIC (Tests 64-84)

#### Validation.ts - validateForm() (Tests 64-70)
64. Should return false when name is empty string
65. Should return false when contactNo is 0
66. Should return false when duration is 0
67. Should return false when fitnessGoal is empty string
68. Should return false when preferredTime is empty string
69. Should return true when all fields are properly filled
70. Should return false when multiple fields are empty

#### Validation.ts - validateName() (Tests 71-75)
71. Should return true for valid name "John David"
72. Should return true for valid name "Alice Ds"
73. Should return false for single word name "John"
74. Should return false for name starting with lowercase "john David"
75. Should return false for name with numbers "John David123"

#### Validation.ts - validateContactNo() (Tests 76-81)
76. Should return true for valid contact number starting with 6
77. Should return true for valid contact number starting with 7
78. Should return true for valid contact number starting with 8
79. Should return true for valid contact number starting with 9
80. Should return false for contact number starting with 5
81. Should return false for contact number with less than 10 digits

#### Validation.ts - validateDuration() (Tests 82-84)
82. Should return true for valid duration "5"
83. Should return false for duration "0"
84. Should return false for negative duration

---

### DOMAIN 4: VIEWFORM COMPONENT (Tests 85-101)

#### Initial Rendering (Tests 85-86)
85. Should render "Get All Joined Entries" button
86. Should not display table initially before clicking button

#### Axios GET - fetchAll() (Tests 87-94)
87. Should make axios GET call to correct URL when button is clicked
88. Should display table with fetched data on successful GET request
89. Should display correct column headers in table
90. Should display joining data in table rows
91. Should display multiple entries when multiple data items are fetched
92. Should display infoMessage when GET request fails
93. Should not display table when GET request fails
94. Should clear infoMessage when GET request is successful

#### Update Button (Tests 95-96)
95. Should render Update button for each entry
96. Should navigate to UpdateForm when Update button is clicked

#### Delete Button (Tests 97-99)
97. Should render Delete button for each entry
98. Should remove entry from table when Delete button is clicked
99. Should keep other entries when one entry is deleted

#### Table Toggle (Tests 100-101)
100. Should set isTableEnabled to true when data is successfully fetched
101. Should set isTableEnabled to false when data fetch fails

---

### DOMAIN 5: UPDATEFORM COMPONENT (Tests 102-120)

#### useEffect & Pre-fill (Tests 102-108)
102. Should make axios GET call to fetch joining details on component mount
103. Should pre-populate name field with fetched data
104. Should pre-populate contactNo field with fetched data
105. Should pre-populate duration field with fetched data
106. Should pre-populate fitnessGoal field with fetched data
107. Should pre-populate preferredTime field with fetched data
108. Should display error message when GET request fails

#### Form Field Updates (Tests 109-113)
109. Should update name field when user types
110. Should update contactNo field when user types
111. Should update duration field when user types
112. Should update fitnessGoal when user selects different option
113. Should update preferredTime when user selects different radio button

#### Button State (Tests 114-115)
114. Should have Update button disabled when any field is empty
115. Should have Update button enabled when all fields are filled

#### Axios PUT (Tests 116-120)
116. Should make axios PUT call with updated data on form submit
117. Should display success message when PUT request is successful
118. Should display error message when PUT request fails
119. Should validate all fields before making PUT request
120. Should prevent page reload on form submit

---

## Test Coverage Summary

| Domain | Component/File | Test Count | Key Functionality Tested |
|--------|---------------|------------|-------------------------|
| 1 | App.tsx | 7 | Route configuration |
| 1 | NavItems.tsx | 6 | Navigation links |
| 2 | FitnessForm.tsx | 49 | Form rendering, validation, axios POST |
| 3 | Validation.ts | 21 | Form validation logic |
| 4 | ViewForm.tsx | 17 | Data fetching, table display, delete |
| 5 | UpdateForm.tsx | 20 | Data pre-fill, update, axios PUT |
| **TOTAL** | **6 files** | **120 tests** | **Complete coverage** |

---

## Critical Test IDs to Remember

### Form Field Test IDs
- `name` - Name input field
- `contactNo` - Contact number input field
- `duration` - Duration input field
- `fitnessGoal` - Fitness goal dropdown
- `preferredTime` - Preferred time radio buttons

### Error Message Test IDs
- `nameError` - Name validation error
- `contactNoError` - Contact number validation error
- `durationError` - Duration validation error

### Form Message Test IDs
- `successMessage` - Success message after form submission
- `errorMessage` - Error message when submission fails
- `join` - Submit button in FitnessForm

### ViewForm Test IDs
- `message` - Info message display area

### UpdateForm Test IDs
- `success` - Success message after update
- `error` - Error message when update fails

---

## Implementation Checklist

Use this checklist to track your implementation progress:

### ✅ Step 1: Routing (App.tsx)
- [ ] Import Route, Routes from react-router-dom
- [ ] Configure route for / → Home
- [ ] Configure route for /home → Home
- [ ] Configure route for /fitness-form → FitnessForm
- [ ] Configure route for /view-form → ViewForm
- [ ] Configure route for /update-form/:joiningId → UpdateForm
- [ ] **Run Tests 1-7**

### ✅ Step 2: Navigation (NavItems.tsx)
- [ ] Add Link to="/fitness-form" for "Join Now"
- [ ] Add Link to="/view-form" for "Click here"
- [ ] **Run Tests 8-13**

### ✅ Step 3: Validation Logic (Validation.ts)
- [ ] Implement validateForm() method
- [ ] Check if name is empty string
- [ ] Check if contactNo is 0
- [ ] Check if duration is 0
- [ ] Check if fitnessGoal is empty string
- [ ] Check if preferredTime is empty string
- [ ] Return true only if all fields are filled
- [ ] **Run Tests 64-84**

### ✅ Step 4: FitnessForm Component
- [ ] Create form with all required fields
- [ ] Add name, data-testid, placeholder attributes
- [ ] Add onChange handlers calling handleChange()
- [ ] Implement handleChange() method
- [ ] Implement validateField() method
- [ ] Use Validator methods for validation
- [ ] Set formErrors state appropriately
- [ ] Set valid state based on validation
- [ ] Implement handleSubmit() method
- [ ] Make axios POST call to Messages.URL
- [ ] Handle success with Messages.SUCCESS + id
- [ ] Handle error with Messages.ERROR
- [ ] Add Bootstrap classes (text-danger, text-success)
- [ ] Make button disabled when !valid
- [ ] **Run Tests 14-63**

### ✅ Step 5: ViewForm Component
- [ ] Implement fetchAll() method
- [ ] Prevent page reload
- [ ] Make axios GET call to Messages.URL
- [ ] Set allJoinedData state on success
- [ ] Set isTableEnabled to true on success
- [ ] Clear infoMessage on success
- [ ] Set infoMessage to Messages.VIEW_INFO_MESSAGE on error
- [ ] Set isTableEnabled to false on error
- [ ] Implement isUpdate() - navigate to /update-form/:joiningId
- [ ] Implement onDelete() - make axios DELETE call
- [ ] Add onClick handlers to buttons
- [ ] Display infoMessage in element with data-testid="message"
- [ ] **Run Tests 85-101**

### ✅ Step 6: UpdateForm Component
- [ ] Implement useEffect() with joiningId dependency
- [ ] Make axios GET call to Messages.URL + joiningId
- [ ] Set join state with response data
- [ ] Set individual field states (name, contactNo, etc.)
- [ ] Handle error with Messages.UPDATE_FETCH_ERROR
- [ ] Implement update() method
- [ ] Prevent page reload
- [ ] Create newJoin object with current values
- [ ] Validate all fields using Validator methods
- [ ] Make axios PUT call if validation passes
- [ ] Set success state to Messages.UPDATE_SUCCESS
- [ ] Set error state to Messages.UPDATE_ERROR on failure
- [ ] Add onChange handlers to all fields
- [ ] Add onSubmit handler to form
- [ ] **Run Tests 102-120**

---

## Quick Test Commands

```bash
# Run all tests
npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage --watchAll=false

# Run specific domain
npm test -- --testNamePattern="Domain 1"
npm test -- --testNamePattern="Domain 2"
npm test -- --testNamePattern="Domain 3"
npm test -- --testNamePattern="Domain 4"
npm test -- --testNamePattern="Domain 5"

# Run specific component tests
npm test -- --testNamePattern="App.tsx"
npm test -- --testNamePattern="NavItems"
npm test -- --testNamePattern="FitnessForm"
npm test -- --testNamePattern="Validation.ts"
npm test -- --testNamePattern="ViewForm"
npm test -- --testNamePattern="UpdateForm"
```

---

## Success Criteria

**You have successfully completed the implementation when:**
- ✅ All 120 tests pass
- ✅ No test failures or errors
- ✅ Coverage report shows all implemented functions are covered
- ✅ All form validations work as expected
- ✅ All axios calls are made correctly
- ✅ All Bootstrap classes are applied
- ✅ Navigation works correctly

**Good luck with your implementation! 🚀**
