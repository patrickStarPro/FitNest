import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fitnessFormState } from "../model/FitnessForm";
import { FormErrorState } from "../model/FormErrorState";
import { Messages } from "../messages/Messages";
import axios from "axios";
import { Validator } from "../validators/Validation"; 

const FitnessForm: FC = () => { 
  const [state, setState] = useState<fitnessFormState>({
    name: "",
    contactNo: "",
    duration: "",
    fitnessGoal: "",
    preferredTime: "",
    id: "",
  });

  const fitnessGoalList: string[] = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Cardiovascular Health",
  ];

    const newArray: string[] = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Cardiovascular Health",
  ];

  const [formErrors, setFormErrors] = useState<FormErrorState>({
    nameError: "",
    contactNoError: "",
    durationError: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSuccessMessage("");
    setErrorMessage("");
    // Your code here
    /* 
        1. You should prevent page reload on submit
        2. Make an axios call to the URL specified in messages/Messages.ts file :
            "http://localhost:2500/fitness-form/" passing the appropriate state as 
            data to the axios call.
        3. If the axios call is successful, assign the successMessage state to the 
              SUCCESS message from Messages.ts file with the ID received from the response: 
              "Successfully submitted with Id: + <id>. 
        4. If the axios call is not successful, assign the errorMessage state to the 
              ERROR message from Messages.ts file : "Please run the backend".
        5. Use Messages object imported from messages/Messages.ts file to set the URL, success and error messages
    */

    e.preventDefault();

    axios
      .post(Messages.URL, state)
      .then((response) => {
        setSuccessMessage(Messages.SUCCESS + response.data.id);
        setErrorMessage("");
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(Messages.ERROR);
        setSuccessMessage("");
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    /*
         1. This method will be invoked whenever the user changes the value of any form field. 
             This method should also validate the form fields.
         2. 'event' input parameter will contain both name and value of the form field.
         3. Set state using the name and value recieved from event parameter. 
         4. Call the validateField method for validating form fields.
         */

    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name: string, value: any): void => {
    let errors = { ...formErrors };

    const updatedState = {
      ...state,
      [name]: value,
    };

    /*
        1. Write validation for all input fields as given in QP document.
            Use appropriate methods imported from validators/Validation.ts 
        2. Set the error messages in formErrors state appropriately. 
            Use the Messages object imported from messages/Messages.ts
        3. Set the valid state to true if the below conditions are true
            - All the form fields are entered (Check by calling the validateForm 
                method in Validation.ts by passing the state as parameter)
            - The formErrors state must not contain any error messages
        4. If any of the above conditions are not true, set the valid state to false
    */

    switch (name) {
      case "name":
        if (Validator.validateName(value) === false) errors.nameError = Messages.NAME_ERROR;
        else errors.nameError = "";
        break;

      case "contactNo":
        if (Validator.validateContactNo(value) === false) errors.contactNoError = Messages.CONTACTNO_ERROR;
        else errors.contactNoError = "";
        break;

      case "duration":
        if (Validator.validateDuration(value) === false) errors.durationError = Messages.DURATION_ERROR;
        else errors.durationError = "";
        break;

      default:
        break;
    }

    setFormErrors(errors);

    const isErrorFree: boolean = Object.values(errors).every((err) => err === "");

    if (Validator.validateForm(updatedState) && isErrorFree) setValid(true);
    else setValid(false);
  };

  return (
    <React.Fragment>
      <div className="container ">
        <div className="row">
          <br />
          <div className="offset-md-5 col-md-5  ">
            <br />
            <div>
              <div className="head">
                <h3>
                  <b>Elite Fitness Plan</b>
                </h3>
              </div>
              <div>
                <form className="form form-background" onSubmit={handleSubmit}>
                  {/* create form as per the view given in screenshots */}
                  {/* Display field level formError state messages as given in QP */}
                  {/* Display success or error messages for axios calls as given in QP */}

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <b>Name</b>
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={state.name}
                      placeholder="Enter your name"
                      className="form-control"
                      onChange={handleChange}
                      data-testid="name"
                    />

                    <span className="text-danger" data-testid="nameError">
                      {formErrors.nameError}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNo" className="form-label">
                      <b>Contact Number</b>
                    </label>

                    <input
                      type="number"
                      id="contactNo"
                      name="contactNo"
                      value={state.contactNo}
                      placeholder="Enter your contact number"
                      className="form-control"
                      onChange={handleChange}
                      data-testid="contactNo"
                    />

                    <span className="text-danger" data-testid="contactNoError">
                      {formErrors.contactNoError}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fitnessGoal" className="form-label">
                      <b>Fitness Goal</b>
                    </label>

                    <select
                      id="fitnessGoal"
                      name="fitnessGoal"
                      value={state.fitnessGoal}
                      className="form-control"
                      onChange={handleChange}
                      data-testid="fitnessGoal"
                    >
                      <option value="" disabled>
                        --Select your Fitness Goal--
                      </option>

                      {fitnessGoalList.map((goal, index) => {
                        return (
                          <option key={index} value={goal}>
                            {goal}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="form-label">
                      <b>Preferred Time</b>
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        id="preferredTime"
                        name="preferredTime"
                        value="Morning"
                        className="form-check-input"
                        checked={state.preferredTime === "Morning"}
                        onChange={handleChange}
                        data-testid="preferredTime"
                      />
                      Morning
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        id="preferredTime"
                        name="preferredTime"
                        value="Afternoon"
                        className="form-check-input"
                        checked={state.preferredTime === "Afternoon"}
                        onChange={handleChange}
                        data-testid="preferredTime"
                      />
                      Afternoon
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        id="preferredTime"
                        name="preferredTime"
                        value="Evening"
                        className="form-check-input"
                        checked={state.preferredTime === "Evening"}
                        onChange={handleChange}
                        data-testid="preferredTime"
                      />
                      Evening
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration" className="form-label">
                      <b>Duration</b>
                    </label>

                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={state.duration}
                      placeholder="Enter your duration in hours"
                      className="form-control"
                      onChange={handleChange}
                      data-testid="duration"
                    />

                    <span className="text-danger" data-testid="durationError">
                      {formErrors.durationError}
                    </span>
                  </div>

                  <div className="form-group text-center">
                    <button
                      type="submit"
                      name="join"
                      data-testid="join"
                      className="btn btn-primary mt-2 text-center"
                      disabled={!valid}
                    >
                      Join
                    </button>
                  </div>

                  <div className="text-success text-center" data-testid="successMessage">
                    <h5>
                      <b>{successMessage}</b>
                    </h5>
                  </div>

                  <div className="text-danger text-center" data-testid="errorMessage">
                    <h5>
                      <b>{errorMessage}</b>
                    </h5>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FitnessForm;
