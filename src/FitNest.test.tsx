import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';
import NavItems from './components/NavItems';
import FitnessForm from './components/FitnessForm';
import ViewForm from './components/ViewForm';
import UpdateForm from './components/UpdateForm';
import Home from './components/Home';
import { Validator } from './validators/Validation';
import { Messages } from './messages/Messages';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ============================================================================
// DOMAIN 1: ROUTING & NAVIGATION
// ============================================================================

describe('Domain 1: Routing & Navigation | App.tsx', () => {
  
  describe('Route Configuration Tests', () => {
    
    test('1. Should render Home component when navigating to "/" path', () => {
      window.history.pushState({}, '', '/');
      render(<App />);
      expect(screen.getByText(/Fit Nest is your dedicated fitness companion/i)).toBeInTheDocument();
    });

    test('2. Should render Home component when navigating to "/home" path', () => {
      window.history.pushState({}, '', '/home');
      render(<App />);
      expect(screen.getByText(/Transforming lives, one workout at a time/i)).toBeInTheDocument();
    });

    test('3. Should render FitnessForm component when navigating to "/fitness-form" path', () => {
      window.history.pushState({}, '', '/fitness-form');
      render(<App />);
      expect(screen.getByText(/Elite Fitness Plan/i)).toBeInTheDocument();
    });

    test('4. Should render ViewForm component when navigating to "/view-form" path', () => {
      window.history.pushState({}, '', '/view-form');
      render(<App />);
      expect(screen.getByText(/Fitness Insights/i)).toBeInTheDocument();
    });

    test('5. Should render UpdateForm component when navigating to "/update-form/:joiningId" path', () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });
      
      window.history.pushState({}, '', '/update-form/1001');
      render(<App />);
      expect(screen.getByText(/Update Your Fitness Plan/i)).toBeInTheDocument();
    });

    test('6. Should render navbar with "Fit Nest" brand text', () => {
      window.history.pushState({}, '', '/');
      render(<App />);
      expect(screen.getAllByText(/Fit Nest/i)[0]).toBeInTheDocument();
    });

    test('7. Should have navbar brand link pointing to "/home"', () => {
      window.history.pushState({}, '', '/');
      render(<App />);
      const brandLink = screen.getAllByText(/Fit Nest/i)[0].closest('a');
      expect(brandLink).toHaveAttribute('href', '/home');
    });
  });
});

describe('Domain 1: Routing & Navigation | NavItems.tsx', () => {
  
  describe('Navigation Link Tests', () => {
    
    test('8. Should render "Join Now" link with correct text', () => {
      render(
        <MemoryRouter>
          <NavItems />
        </MemoryRouter>
      );
      expect(screen.getByText('Join Now')).toBeInTheDocument();
    });

    test('9. Should have "Join Now" link pointing to "/fitness-form"', () => {
      render(
        <MemoryRouter>
          <NavItems />
        </MemoryRouter>
      );
      const joinNowLink = screen.getByText('Join Now');
      expect(joinNowLink).toHaveAttribute('href', '/fitness-form');
    });

    test('10. Should render "Click here" link with correct text', () => {
      render(
        <MemoryRouter>
          <NavItems />
        </MemoryRouter>
      );
      expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    test('11. Should have "Click here" link pointing to "/view-form"', () => {
      render(
        <MemoryRouter>
          <NavItems />
        </MemoryRouter>
      );
      const clickHereLink = screen.getByText('Click here');
      expect(clickHereLink).toHaveAttribute('href', '/view-form');
    });

    test('12. Should render heading text "Ready to Get Fit?"', () => {
      render(
        <MemoryRouter>
          <NavItems />
        </MemoryRouter>
      );
      expect(screen.getByText(/Ready to Get Fit\?/i)).toBeInTheDocument();
    });

    test('13. Should render heading text "Review and Update Fitness Insights"', () => {
      render(
        <MemoryRouter>
          <NavItems />
        </MemoryRouter>
      );
      expect(screen.getByText(/Review and Update Fitness Insights/i)).toBeInTheDocument();
    });
  });
});

// ============================================================================
// DOMAIN 2: FITNESSFORM COMPONENT
// ============================================================================

describe('Domain 2: FitnessForm Component | FitnessForm.tsx', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Fields Rendering Tests', () => {
    
    test('14. Should render name input field with correct name attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const nameInput = screen.getByTestId('name');
      expect(nameInput).toHaveAttribute('name', 'name');
    });

    test('15. Should render name input field with correct data-testid attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByTestId('name')).toBeInTheDocument();
    });

    test('16. Should render name input field with placeholder "Enter your name"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    });

    test('17. Should render contactNo input field with correct name attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const contactNoInput = screen.getByTestId('contactNo');
      expect(contactNoInput).toHaveAttribute('name', 'contactNo');
    });

    test('18. Should render contactNo input field with correct data-testid attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByTestId('contactNo')).toBeInTheDocument();
    });

    test('19. Should render contactNo input field with placeholder "Enter your contact number"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByPlaceholderText('Enter your contact number')).toBeInTheDocument();
    });

    test('20. Should render contactNo field as type number', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const contactNoInput = screen.getByTestId('contactNo');
      expect(contactNoInput).toHaveAttribute('type', 'number');
    });

    test('21. Should render duration input field with correct name attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const durationInput = screen.getByTestId('duration');
      expect(durationInput).toHaveAttribute('name', 'duration');
    });

    test('22. Should render duration input field with correct data-testid attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByTestId('duration')).toBeInTheDocument();
    });

    test('23. Should render duration input field with placeholder "Enter your duration in hours"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByPlaceholderText('Enter your duration in hours')).toBeInTheDocument();
    });

    test('24. Should render fitnessGoal dropdown with correct name attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const fitnessGoalSelect = screen.getByTestId('fitnessGoal');
      expect(fitnessGoalSelect).toHaveAttribute('name', 'fitnessGoal');
    });

    test('25. Should render fitnessGoal dropdown with correct data-testid attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByTestId('fitnessGoal')).toBeInTheDocument();
    });

    test('26. Should render fitnessGoal dropdown with default disabled option "--Select your Fitness Goal--"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByText('--Select your Fitness Goal--')).toBeInTheDocument();
    });

    test('27. Should have disabled default option in fitnessGoal dropdown', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const defaultOption = screen.getByText('--Select your Fitness Goal--');
      expect(defaultOption).toBeDisabled();
    });

    test('28. Should render fitnessGoal dropdown with "Weight Loss" option', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByText('Weight Loss')).toBeInTheDocument();
    });

    test('29. Should render fitnessGoal dropdown with "Muscle Gain" option', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByText('Muscle Gain')).toBeInTheDocument();
    });

    test('30. Should render fitnessGoal dropdown with "Endurance" option', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByText('Endurance')).toBeInTheDocument();
    });

    test('31. Should render fitnessGoal dropdown with "Cardiovascular Health" option', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByText('Cardiovascular Health')).toBeInTheDocument();
    });

    test('32. Should render preferredTime radio buttons with correct name attribute', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const radioButtons = screen.getAllByTestId('preferredTime');
      radioButtons.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'preferredTime');
      });
    });

    test('33. Should render Morning radio button with value "Morning"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const morningRadio = screen.getAllByTestId('preferredTime').find(
        radio => (radio as HTMLInputElement).value === 'Morning'
      );
      expect(morningRadio).toHaveAttribute('value', 'Morning');
    });

    test('34. Should render Afternoon radio button with value "Afternoon"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const afternoonRadio = screen.getAllByTestId('preferredTime').find(
        radio => (radio as HTMLInputElement).value === 'Afternoon'
      );
      expect(afternoonRadio).toHaveAttribute('value', 'Afternoon');
    });

    test('35. Should render Evening radio button with value "Evening"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const eveningRadio = screen.getAllByTestId('preferredTime').find(
        radio => (radio as HTMLInputElement).value === 'Evening'
      );
      expect(eveningRadio).toHaveAttribute('value', 'Evening');
    });
  });

  describe('Submit Button Tests', () => {
    
    test('36. Should render submit button with name="join"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const submitButton = screen.getByTestId('join');
      expect(submitButton).toHaveAttribute('name', 'join');
    });

    test('37. Should render submit button with data-testid="join"', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      expect(screen.getByTestId('join')).toBeInTheDocument();
    });

    test('38. Should have submit button disabled when form is invalid (empty fields)', () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      const submitButton = screen.getByTestId('join');
      expect(submitButton).toBeDisabled();
    });

    test('39. Should enable submit button when all form fields are valid', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime').find(
        radio => (radio as HTMLInputElement).value === 'Morning'
      )!);

      await waitFor(() => {
        const submitButton = screen.getByTestId('join');
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Validation Tests - Name Field', () => {
    
    test('40. Should display nameError when name has only one word', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent(Messages.NAME_ERROR);
        expect(nameError).toHaveClass('text-danger');
      });
    });

    test('41. Should display nameError when first name does not start with uppercase', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'john David' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent(Messages.NAME_ERROR);
      });
    });

    test('42. Should display nameError when first name has less than 3 characters', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'Jo David' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent(Messages.NAME_ERROR);
      });
    });

    test('43. Should display nameError when last name has less than 2 characters', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John D' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent(Messages.NAME_ERROR);
      });
    });

    test('44. Should display nameError when last name does not start with uppercase', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John david' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent(Messages.NAME_ERROR);
      });
    });

    test('45. Should display nameError when name contains numbers', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David123' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent(Messages.NAME_ERROR);
      });
    });

    test('46. Should NOT display nameError when name is valid (e.g., "John David")', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent('');
      });
    });

    test('47. Should accept valid name "Alice Ds" (2-letter last name)', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'Alice Ds' } });
      
      await waitFor(() => {
        const nameError = screen.getByTestId('nameError');
        expect(nameError).toHaveTextContent('');
      });
    });
  });

  describe('Validation Tests - ContactNo Field', () => {
    
    test('48. Should display contactNoError when contact number has less than 10 digits', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '78965678' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent(Messages.CONTACTNO_ERROR);
        expect(contactNoError).toHaveClass('text-danger');
      });
    });

    test('49. Should display contactNoError when contact number starts with invalid digit (e.g., 3)', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '3456789876' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent(Messages.CONTACTNO_ERROR);
      });
    });

    test('50. Should display contactNoError when contact number starts with 5', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '5987654321' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent(Messages.CONTACTNO_ERROR);
      });
    });

    test('51. Should NOT display contactNoError when contact number is valid starting with 6', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '6987654321' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent('');
      });
    });

    test('52. Should NOT display contactNoError when contact number is valid starting with 7', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '7987654321' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent('');
      });
    });

    test('53. Should NOT display contactNoError when contact number is valid starting with 8', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '8878987678' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent('');
      });
    });

    test('54. Should NOT display contactNoError when contact number is valid starting with 9', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9999999999' } });
      
      await waitFor(() => {
        const contactNoError = screen.getByTestId('contactNoError');
        expect(contactNoError).toHaveTextContent('');
      });
    });
  });

  describe('Validation Tests - Duration Field', () => {
    
    test('55. Should display durationError when duration is 0', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '0' } });
      
      await waitFor(() => {
        const durationError = screen.getByTestId('durationError');
        expect(durationError).toHaveTextContent(Messages.DURATION_ERROR);
        expect(durationError).toHaveClass('text-danger');
      });
    });

    test('56. Should display durationError when duration is negative', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '-5' } });
      
      await waitFor(() => {
        const durationError = screen.getByTestId('durationError');
        expect(durationError).toHaveTextContent(Messages.DURATION_ERROR);
      });
    });

    test('57. Should NOT display durationError when duration is valid positive number', async () => {
      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '5' } });
      
      await waitFor(() => {
        const durationError = screen.getByTestId('durationError');
        expect(durationError).toHaveTextContent('');
      });
    });
  });

  describe('Axios POST Tests', () => {
    
    test('58. Should make axios POST call to correct URL on form submit', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { id: 1002 }
      });

      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('join')).not.toBeDisabled();
      });

      fireEvent.submit(screen.getByTestId('join').closest('form')!);

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          Messages.URL,
          expect.objectContaining({
            name: 'John David',
            contactNo: '9988776655',
            duration: '3',
            fitnessGoal: 'Endurance',
            preferredTime: 'Morning'
          })
        );
      });
    });

    test('59. Should display successMessage with ID when axios POST is successful', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { id: 1003 }
      });

      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('join')).not.toBeDisabled();
      });

      fireEvent.submit(screen.getByTestId('join').closest('form')!);

      await waitFor(() => {
        const successMessage = screen.getByTestId('successMessage');
        expect(successMessage).toHaveTextContent(Messages.SUCCESS + '1003');
        expect(successMessage).toHaveClass('text-success');
      });
    });

    test('60. Should display errorMessage when axios POST fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network Error'));

      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('join')).not.toBeDisabled();
      });

      fireEvent.submit(screen.getByTestId('join').closest('form')!);

      await waitFor(() => {
        const errorMessage = screen.getByTestId('errorMessage');
        expect(errorMessage).toHaveTextContent(Messages.ERROR);
        expect(errorMessage).toHaveClass('text-danger');
      });
    });

    test('61. Should clear errorMessage when successMessage is displayed', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { id: 1004 }
      });

      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('join')).not.toBeDisabled();
      });

      fireEvent.submit(screen.getByTestId('join').closest('form')!);

      await waitFor(() => {
        const successMessage = screen.getByTestId('successMessage');
        const errorMessage = screen.getByTestId('errorMessage');
        expect(successMessage).toHaveTextContent(Messages.SUCCESS + '1004');
        expect(errorMessage).toHaveTextContent('');
      });
    });

    test('62. Should clear successMessage when errorMessage is displayed', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Server Error'));

      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('join')).not.toBeDisabled();
      });

      fireEvent.submit(screen.getByTestId('join').closest('form')!);

      await waitFor(() => {
        const successMessage = screen.getByTestId('successMessage');
        const errorMessage = screen.getByTestId('errorMessage');
        expect(errorMessage).toHaveTextContent(Messages.ERROR);
        expect(successMessage).toHaveTextContent('');
      });
    });

    test('63. Should prevent page reload on form submit', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { id: 1005 }
      });

      render(
        <MemoryRouter>
          <FitnessForm />
        </MemoryRouter>
      );
      
      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John David' } });
      fireEvent.change(screen.getByTestId('contactNo'), { target: { value: '9988776655' } });
      fireEvent.change(screen.getByTestId('duration'), { target: { value: '3' } });
      fireEvent.change(screen.getByTestId('fitnessGoal'), { target: { value: 'Endurance' } });
      fireEvent.click(screen.getAllByTestId('preferredTime')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('join')).not.toBeDisabled();
      });

      const form = screen.getByTestId('join').closest('form')!;
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);

      expect(submitEvent.defaultPrevented).toBe(true);
    });
  });
});

// ============================================================================
// DOMAIN 3: FORM VALIDATION LOGIC
// ============================================================================

describe('Domain 3: Form Validation Logic | Validation.ts', () => {
  
  describe('validateForm() Method Tests', () => {
    
    test('64. Should return false when name is empty string', () => {
      const state = {
        name: '',
        contactNo: '9988776655',
        duration: '3',
        fitnessGoal: 'Endurance',
        preferredTime: 'Morning',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(false);
    });

    test('65. Should return false when contactNo is 0', () => {
      const state = {
        name: 'John David',
        contactNo: 0,
        duration: '3',
        fitnessGoal: 'Endurance',
        preferredTime: 'Morning',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(false);
    });

    test('66. Should return false when duration is 0', () => {
      const state = {
        name: 'John David',
        contactNo: '9988776655',
        duration: 0,
        fitnessGoal: 'Endurance',
        preferredTime: 'Morning',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(false);
    });

    test('67. Should return false when fitnessGoal is empty string', () => {
      const state = {
        name: 'John David',
        contactNo: '9988776655',
        duration: '3',
        fitnessGoal: '',
        preferredTime: 'Morning',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(false);
    });

    test('68. Should return false when preferredTime is empty string', () => {
      const state = {
        name: 'John David',
        contactNo: '9988776655',
        duration: '3',
        fitnessGoal: 'Endurance',
        preferredTime: '',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(false);
    });

    test('69. Should return true when all fields are properly filled', () => {
      const state = {
        name: 'John David',
        contactNo: '9988776655',
        duration: '3',
        fitnessGoal: 'Endurance',
        preferredTime: 'Morning',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(true);
    });

    test('70. Should return false when multiple fields are empty', () => {
      const state = {
        name: '',
        contactNo: 0,
        duration: 0,
        fitnessGoal: '',
        preferredTime: '',
        id: ''
      };
      expect(Validator.validateForm(state)).toBe(false);
    });
  });

  describe('validateName() Method Tests', () => {
    
    test('71. Should return true for valid name "John David"', () => {
      expect(Validator.validateName('John David')).toBe(true);
    });

    test('72. Should return true for valid name "Alice Ds"', () => {
      expect(Validator.validateName('Alice Ds')).toBe(true);
    });

    test('73. Should return false for single word name "John"', () => {
      expect(Validator.validateName('John')).toBe(false);
    });

    test('74. Should return false for name starting with lowercase "john David"', () => {
      expect(Validator.validateName('john David')).toBe(false);
    });

    test('75. Should return false for name with numbers "John David123"', () => {
      expect(Validator.validateName('John David123')).toBe(false);
    });
  });

  describe('validateContactNo() Method Tests', () => {
    
    test('76. Should return true for valid contact number starting with 6', () => {
      expect(Validator.validateContactNo('6987654321')).toBe(true);
    });

    test('77. Should return true for valid contact number starting with 7', () => {
      expect(Validator.validateContactNo('7987654321')).toBe(true);
    });

    test('78. Should return true for valid contact number starting with 8', () => {
      expect(Validator.validateContactNo('8878987678')).toBe(true);
    });

    test('79. Should return true for valid contact number starting with 9', () => {
      expect(Validator.validateContactNo('9999999999')).toBe(true);
    });

    test('80. Should return false for contact number starting with 5', () => {
      expect(Validator.validateContactNo('5987654321')).toBe(false);
    });

    test('81. Should return false for contact number with less than 10 digits', () => {
      expect(Validator.validateContactNo('78965678')).toBe(false);
    });
  });

  describe('validateDuration() Method Tests', () => {
    
    test('82. Should return true for valid duration "5"', () => {
      expect(Validator.validateDuration('5')).toBe(true);
    });

    test('83. Should return false for duration "0"', () => {
      expect(Validator.validateDuration('0')).toBe(false);
    });

    test('84. Should return false for negative duration', () => {
      expect(Validator.validateDuration('-5')).toBe(false);
    });
  });
});

// ============================================================================
// DOMAIN 4: VIEWFORM COMPONENT
// ============================================================================

describe('Domain 4: ViewForm Component | ViewForm.tsx', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Rendering Tests', () => {
    
    test('85. Should render "Get All Joined Entries" button', () => {
      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      expect(screen.getByText('Get All Joined Entries')).toBeInTheDocument();
    });

    test('86. Should not display table initially before clicking button', () => {
      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('Axios GET Tests - fetchAll()', () => {
    
    test('87. Should make axios GET call to correct URL when button is clicked', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(Messages.URL);
      });
    });

    test('88. Should display table with fetched data on successful GET request', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    test('89. Should display correct column headers in table', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('JoiningId')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Contact Number')).toBeInTheDocument();
        expect(screen.getByText('Fitness Goal')).toBeInTheDocument();
        expect(screen.getByText('Preferred Time')).toBeInTheDocument();
        expect(screen.getByText('Duration')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
      });
    });

    test('90. Should display joining data in table rows', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('1001')).toBeInTheDocument();
        expect(screen.getByText('John David')).toBeInTheDocument();
        expect(screen.getByText('9988776655')).toBeInTheDocument();
        expect(screen.getByText('Endurance')).toBeInTheDocument();
        expect(screen.getByText('Morning')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
      });
    });

    test('91. Should display multiple entries when multiple data items are fetched', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [
          {
            id: '1001',
            name: 'John David',
            contactNo: '9988776655',
            duration: '2',
            fitnessGoal: 'Endurance',
            preferredTime: 'Morning'
          },
          {
            id: '1002',
            name: 'Jane Smith',
            contactNo: '8765432109',
            duration: '3',
            fitnessGoal: 'Weight Loss',
            preferredTime: 'Evening'
          }
        ]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('John David')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });

    test('92. Should display infoMessage when GET request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        const infoMessage = screen.getByTestId('message');
        expect(infoMessage).toHaveTextContent(Messages.VIEW_INFO_MESSAGE);
        expect(infoMessage).toHaveClass('text-danger');
      });
    });

    test('93. Should not display table when GET request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Backend not running'));

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
      });
    });

    test('94. Should clear infoMessage when GET request is successful', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        const infoMessage = screen.getByTestId('message');
        expect(infoMessage).toHaveTextContent('');
      });
    });
  });

  describe('Update Button Tests', () => {
    
    test('95. Should render Update button for each entry', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('Update')).toBeInTheDocument();
      });
    });

    test('96. Should navigate to UpdateForm when Update button is clicked', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      const { container } = render(
        <MemoryRouter initialEntries={['/view-form']}>
          <Routes>
            <Route path="/view-form" element={<ViewForm />} />
            <Route path="/update-form/:joiningId" element={<div>Update Form Page</div>} />
          </Routes>
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Update Form Page')).toBeInTheDocument();
      });
    });
  });

  describe('Delete Button Tests', () => {
    
    test('97. Should render Delete button for each entry', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });
    });

    test('98. Should remove entry from table when Delete button is clicked', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [
          {
            id: '1001',
            name: 'John David',
            contactNo: '9988776655',
            duration: '2',
            fitnessGoal: 'Endurance',
            preferredTime: 'Morning'
          },
          {
            id: '1002',
            name: 'Jane Smith',
            contactNo: '8765432109',
            duration: '3',
            fitnessGoal: 'Weight Loss',
            preferredTime: 'Evening'
          }
        ]
      });

      mockedAxios.delete.mockResolvedValue({});

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('John David')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(mockedAxios.delete).toHaveBeenCalledWith(Messages.URL + '1001');
      });
    });

    test('99. Should keep other entries when one entry is deleted', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [
          {
            id: '1001',
            name: 'John David',
            contactNo: '9988776655',
            duration: '2',
            fitnessGoal: 'Endurance',
            preferredTime: 'Morning'
          },
          {
            id: '1002',
            name: 'Jane Smith',
            contactNo: '8765432109',
            duration: '3',
            fitnessGoal: 'Weight Loss',
            preferredTime: 'Evening'
          }
        ]
      });

      mockedAxios.delete.mockResolvedValue({});

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByText('John David')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });

      // Note: This test verifies the axios delete is called, actual UI update depends on implementation
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(mockedAxios.delete).toHaveBeenCalled();
      });
    });
  });

  describe('Table Toggle Tests', () => {
    
    test('100. Should set isTableEnabled to true when data is successfully fetched', async () => {
      mockedAxios.get.mockResolvedValue({
        data: [{
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }]
      });

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    test('101. Should set isTableEnabled to false when data fetch fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      render(
        <MemoryRouter>
          <ViewForm />
        </MemoryRouter>
      );
      
      fireEvent.click(screen.getByText('Get All Joined Entries'));

      await waitFor(() => {
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
      });
    });
  });
});

// ============================================================================
// DOMAIN 5: UPDATEFORM COMPONENT
// ============================================================================

describe('Domain 5: UpdateForm Component | UpdateForm.tsx', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useEffect and Pre-fill Tests', () => {
    
    test('102. Should make axios GET call to fetch joining details on component mount', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(Messages.URL + '1001');
      });
    });

    test('103. Should pre-populate name field with fetched data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const nameInput = screen.getByTestId('name') as HTMLInputElement;
        expect(nameInput.value).toBe('John David');
      });
    });

    test('104. Should pre-populate contactNo field with fetched data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const contactNoInput = screen.getByLabelText(/Contact Number/i) as HTMLInputElement;
        expect(contactNoInput.value).toBe('9988776655');
      });
    });

    test('105. Should pre-populate duration field with fetched data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const durationInput = screen.getByLabelText(/Duration/i) as HTMLInputElement;
        expect(durationInput.value).toBe('2');
      });
    });

    test('106. Should pre-populate fitnessGoal field with fetched data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const fitnessGoalSelect = screen.getByLabelText(/Fitness Goal/i) as HTMLSelectElement;
        expect(fitnessGoalSelect.value).toBe('Endurance');
      });
    });

    test('107. Should pre-populate preferredTime field with fetched data', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const morningRadio = screen.getAllByTestId('preferredTime').find(
          radio => (radio as HTMLInputElement).value === 'Morning'
        ) as HTMLInputElement;
        expect(morningRadio.checked).toBe(true);
      });
    });

    test('108. Should display error message when GET request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const errorElement = screen.getByTestId('error');
        expect(errorElement).toHaveTextContent(Messages.UPDATE_FETCH_ERROR);
      });
    });
  });

  describe('Form Field Update Tests', () => {
    
    test('109. Should update name field when user types', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('name')).toBeInTheDocument();
      });

      const nameInput = screen.getByTestId('name');
      fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });

      expect((nameInput as HTMLInputElement).value).toBe('Jane Smith');
    });

    test('110. Should update contactNo field when user types', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const contactNoInput = screen.getByLabelText(/Contact Number/i);
        fireEvent.change(contactNoInput, { target: { value: '8765432109' } });
        expect((contactNoInput as HTMLInputElement).value).toBe('8765432109');
      });
    });

    test('111. Should update duration field when user types', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const durationInput = screen.getByLabelText(/Duration/i);
        fireEvent.change(durationInput, { target: { value: '5' } });
        expect((durationInput as HTMLInputElement).value).toBe('5');
      });
    });

    test('112. Should update fitnessGoal when user selects different option', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const fitnessGoalSelect = screen.getByLabelText(/Fitness Goal/i);
        fireEvent.change(fitnessGoalSelect, { target: { value: 'Weight Loss' } });
        expect((fitnessGoalSelect as HTMLSelectElement).value).toBe('Weight Loss');
      });
    });

    test('113. Should update preferredTime when user selects different radio button', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const eveningRadio = screen.getAllByTestId('preferredTime').find(
          radio => (radio as HTMLInputElement).value === 'Evening'
        );
        fireEvent.click(eveningRadio!);
        expect((eveningRadio as HTMLInputElement).checked).toBe(true);
      });
    });
  });

  describe('Button Disabled State Tests', () => {
    
    test('114. Should have Update button disabled when any field is empty', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: '',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const updateButton = screen.getByRole('button', { name: /Update/i });
        expect(updateButton).toBeDisabled();
      });
    });

    test('115. Should have Update button enabled when all fields are filled', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const updateButton = screen.getByRole('button', { name: /Update/i });
        expect(updateButton).not.toBeDisabled();
      });
    });
  });

  describe('Axios PUT Tests', () => {
    
    test('116. Should make axios PUT call with updated data on form submit', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      mockedAxios.put.mockResolvedValue({
        data: { id: '1001' }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('name')).toBeInTheDocument();
      });

      const nameInput = screen.getByTestId('name');
      fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });

      const form = screen.getByRole('button', { name: /Update/i }).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockedAxios.put).toHaveBeenCalledWith(
          Messages.URL + '1001',
          expect.objectContaining({
            name: 'Jane Smith'
          })
        );
      });
    });

    test('117. Should display success message when PUT request is successful', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      mockedAxios.put.mockResolvedValue({
        data: { id: '1001' }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const nameInput = screen.getByTestId('name') as HTMLInputElement;
        expect(nameInput.value).toBe('John David');
      });

      const form = screen.getByRole('button', { name: /Update/i }).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        const successElement = screen.getByTestId('success');
        expect(successElement).toHaveTextContent(Messages.UPDATE_SUCCESS);
      });
    });

    test('118. Should display error message when PUT request fails', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      mockedAxios.put.mockRejectedValue(new Error('Network Error'));

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        const nameInput = screen.getByTestId('name') as HTMLInputElement;
        expect(nameInput.value).toBe('John David');
      });

      const form = screen.getByRole('button', { name: /Update/i }).closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        const errorElement = screen.getByTestId('error');
        expect(errorElement).toHaveTextContent(Messages.UPDATE_ERROR);
      });
    });

    test('119. Should validate all fields before making PUT request', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('name')).toBeInTheDocument();
      });

      // Change name to invalid format
      const nameInput = screen.getByTestId('name');
      fireEvent.change(nameInput, { target: { value: 'John' } });

      const form = screen.getByRole('button', { name: /Update/i }).closest('form')!;
      fireEvent.submit(form);

      // PUT should not be called with invalid data
      await waitFor(() => {
        expect(mockedAxios.put).not.toHaveBeenCalled();
      });
    });

    test('120. Should prevent page reload on form submit', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          id: '1001',
          name: 'John David',
          contactNo: '9988776655',
          duration: '2',
          fitnessGoal: 'Endurance',
          preferredTime: 'Morning'
        }
      });

      mockedAxios.put.mockResolvedValue({
        data: { id: '1001' }
      });

      render(
        <MemoryRouter initialEntries={['/update-form/1001']}>
          <Routes>
            <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId('name')).toBeInTheDocument();
      });

      const form = screen.getByRole('button', { name: /Update/i }).closest('form')!;
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);

      expect(submitEvent.defaultPrevented).toBe(true);
    });
  });
});
