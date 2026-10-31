# FitNest Test Suite Instructions

## Overview
This test suite contains **120 comprehensive test cases** covering all partially implemented functionality in the FitNest React + TypeScript application.

## Test Coverage by Domain

### Domain 1: Routing & Navigation (13 tests)
- **App.tsx**: Route configuration tests for /, /home, /fitness-form, /view-form, /update-form/:joiningId
- **NavItems.tsx**: Navigation link tests for "Join Now" and "Click here" links

### Domain 2: FitnessForm Component (49 tests)
- **Form Fields Rendering**: Tests for all form fields (name, contactNo, duration, fitnessGoal, preferredTime) with correct attributes
- **Submit Button**: Tests for button state (enabled/disabled based on validation)
- **Validation - Name**: Tests for name validation rules (2 words, capital starts, min characters)
- **Validation - ContactNo**: Tests for contact number validation (10 digits, starting with 6-9)
- **Validation - Duration**: Tests for duration validation (greater than 0)
- **Axios POST**: Tests for successful submission, error handling, message display

### Domain 3: Form Validation Logic (21 tests)
- **Validation.ts**: Unit tests for validateForm(), validateName(), validateContactNo(), validateDuration()
- Tests for empty fields, invalid inputs, and valid inputs

### Domain 4: ViewForm Component (17 tests)
- **Initial Rendering**: Tests for button and table visibility
- **Axios GET**: Tests for fetching all joined entries
- **Table Display**: Tests for table headers, data display, multiple entries
- **Update Button**: Tests for navigation to UpdateForm
- **Delete Button**: Tests for entry deletion
- **Error Handling**: Tests for failed API calls and error messages

### Domain 5: UpdateForm Component (20 tests)
- **useEffect & Pre-fill**: Tests for fetching data on mount and pre-populating fields
- **Form Field Updates**: Tests for updating each field
- **Button State**: Tests for disabled/enabled state based on field values
- **Axios PUT**: Tests for update submission, validation, success/error messages

## Running the Tests

### Run All Tests at Once
```bash
npm test
```

This will launch Jest in interactive watch mode and run all 120 test cases.

**Note:** Tests are configured for cleaner output matching exam format (less verbose, no HTML dumps).

### Run Tests in Non-Interactive Mode (Single Run)
```bash
npm test -- --watchAll=false
```

### Run Tests with Coverage Report
```bash
npm test -- --coverage --watchAll=false
```

### Run Specific Test File
```bash
npm test FitNest.test.tsx
```

### Run Tests Matching a Pattern
```bash
# Run only Domain 1 tests
npm test -- --testNamePattern="Domain 1"

# Run only FitnessForm tests
npm test -- --testNamePattern="FitnessForm"

# Run only validation tests
npm test -- --testNamePattern="Validation"
```

### Run Tests in Verbose Mode
```bash
npm test -- --verbose
```

## Understanding Test Results

### All Tests Passing ✅
- You'll see: `Tests: 120 passed, 120 total`
- This means your implementation is complete and correct

### Some Tests Failing ❌
- Failed tests will show:
  - Test name
  - Expected vs Received values
  - Line numbers where assertions failed
- Use this information to debug your implementation

## Test Structure

Each test follows this pattern:
```typescript
test('Test number. Description of what is being tested', async () => {
  // Arrange: Setup
  // Act: Perform action
  // Assert: Verify result
});
```

## Key Test Patterns Used

### 1. Routing Tests
- Use `MemoryRouter` to test navigation
- Check component rendering based on routes

### 2. Form Field Tests
- Verify attributes (name, data-testid, type, placeholder)
- Test controlled components with `fireEvent.change()`
- Check validation error display

### 3. Axios Mock Tests
```typescript
mockedAxios.post.mockResolvedValue({ data: { id: 1001 } });  // Success
mockedAxios.post.mockRejectedValue(new Error('Error'));      // Failure
```

### 4. Async Tests
- Use `waitFor()` for async operations
- Test axios calls and state updates

## Common Issues & Solutions

### Issue 1: Tests fail because implementation is incomplete
**Solution**: Implement the functionality as per the question paper instructions

### Issue 2: "Unable to find element with testid" errors
**Solution**: Ensure all form fields have the correct `data-testid` attributes:
- name, contactNo, duration, fitnessGoal, preferredTime
- nameError, contactNoError, durationError
- successMessage, errorMessage, join button

### Issue 3: Validation tests failing
**Solution**: Implement validation logic using:
- `Validator.validateName()` for name field
- `Validator.validateContactNo()` for contact number
- `Validator.validateDuration()` for duration
- `Validator.validateForm()` to check if all fields are filled

### Issue 4: Axios tests failing
**Solution**: Ensure you're using the correct URLs from `Messages.ts`:
- `Messages.URL` for all axios calls
- `Messages.SUCCESS`, `Messages.ERROR` for messages

## Test Execution Flow

1. **Before Each Test**: `jest.clearAllMocks()` clears all axios mocks
2. **Test Runs**: Component renders, actions performed, assertions checked
3. **After Test**: Cleanup happens automatically

## Debugging Failed Tests

### Step 1: Read the Error Message
```
Expected: "Successfully submitted with Id:1001"
Received: ""
```
This tells you what was expected vs what actually happened

### Step 2: Check the Test Number
Each test has a number (1-120) - find it in the test file to see exactly what's being tested

### Step 3: Verify Your Implementation
- Check if you've implemented the required method
- Verify you're using correct state variables
- Ensure axios calls use correct URLs from Messages.ts
- Confirm Bootstrap classes are applied (text-danger, text-success)

### Step 4: Use console.log for Debugging
Add console.log in your implementation to see state values:
```typescript
console.log('Current state:', state);
console.log('Form errors:', formErrors);
```

## Expected Test Results After Complete Implementation

```
PASS  src/FitNest.test.tsx
  Domain 1: Routing & Navigation | App.tsx
    Route Configuration Tests
      ✓ 1. Should render Home component when navigating to "/" path
      ✓ 2. Should render Home component when navigating to "/home" path
      ... (all 13 tests pass)
  
  Domain 1: Routing & Navigation | NavItems.tsx
    Navigation Link Tests
      ✓ 8. Should render "Join Now" link with correct text
      ... (all 6 tests pass)
  
  Domain 2: FitnessForm Component | FitnessForm.tsx
    Form Fields Rendering Tests
      ✓ 14. Should render name input field with correct name attribute
      ... (all 49 tests pass)
  
  Domain 3: Form Validation Logic | Validation.ts
    validateForm() Method Tests
      ✓ 64. Should return false when name is empty string
      ... (all 21 tests pass)
  
  Domain 4: ViewForm Component | ViewForm.tsx
    Initial Rendering Tests
      ✓ 85. Should render "Get All Joined Entries" button
      ... (all 17 tests pass)
  
  Domain 5: UpdateForm Component | UpdateForm.tsx
    useEffect and Pre-fill Tests
      ✓ 102. Should make axios GET call to fetch joining details on component mount
      ... (all 20 tests pass)

Test Suites: 1 passed, 1 total
Tests:       120 passed, 120 total
Snapshots:   0 total
Time:        X.XXs
```

## Important Notes

1. **Backend Not Required**: These tests mock axios, so json-server doesn't need to be running

2. **Test Independence**: Each test is independent and doesn't affect others

3. **Order Doesn't Matter**: Tests can run in any order

4. **Focus on Red → Green**: 
   - Red: Tests fail initially (before implementation)
   - Green: Tests pass after correct implementation

5. **Bootstrap Classes**: Tests verify CSS classes like:
   - `text-danger` for error messages
   - `text-success` for success messages

## Files Modified During Implementation

When you implement the solution, you should ONLY modify these files:
1. `src/App.tsx` - Add routing configuration
2. `src/components/NavItems.tsx` - Add navigation links
3. `src/components/FitnessForm.tsx` - Implement form logic and validation
4. `src/validators/Validation.ts` - Implement validateForm() method
5. `src/components/ViewForm.tsx` - Implement fetchAll() and delete functionality
6. `src/components/UpdateForm.tsx` - Implement useEffect() and update() methods

## Good Luck! 🎯

These 120 tests will thoroughly verify your implementation. Start implementing step by step following the question paper instructions, and run tests frequently to check your progress.

Remember: **Green tests = Correct implementation!** ✅
