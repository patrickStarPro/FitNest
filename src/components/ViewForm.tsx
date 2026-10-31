
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewFormState } from "../model/ViewForm";
import axios from "axios";
import { Messages } from "../messages/Messages";

const ViewForm: FC = () => {
  const [state, setState] = useState<ViewFormState>({
    joiningId: "",
    infoMessage: "",
    isTableEnabled: false,
    allJoinedData: []
  });

  const [checkedidlist, setcheckedidlist] = useState<any>([]);
  const [filterValue, setFilterValue] = useState("");

  const filteredData = state.allJoinedData.filter((data) => {
    if (filterValue === "") return true;
    else if (data.fitnessGoal === filterValue) return true;
    else return false;
  })

  const fitnessGoalList: string[] = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Cardiovascular Health",
  ];

  const navigate = useNavigate();

  const isUpdate = (joiningId: string) => {
    //When Update button is clicked, navigate to '/update-form'+state.joiningId
    navigate("/update-form/" + joiningId);
  }

  const onDelete = (joiningId: string) => {
    /* when Delete button is clicked,  make axios call to URL in messages/Messages.ts file 
          "http://localhost:2500/fitness-form/"+<joining Id>   
          and handle the response accordingly.
    */

    axios.delete(Messages.URL + joiningId)
      .then((response) => {

        const updatedData = state.allJoinedData.filter((data) => {
          if (data.id === joiningId) return false;
          else return true;
        })

        setState({
          ...state,
          allJoinedData: updatedData
        });

      })
      .catch((error) => {

        setState({
          ...state,
          infoMessage: Messages.VIEW_INFO_MESSAGE
        });

      })
  };

  const fetchAll = (event: React.FormEvent): void => {
    /*
          1.You should prevent page reload on submit
          2. Make an axios call to fetch all the data from URL specified in Messages.ts file:  "http://localhost:2500/ fitness-form/"
          3. In case of successful response:
              -Set the allJoinedData state with the success response data received from the axios call and clear the infoMessage state
              Set isTableEnabled state to true
          4. If the axios call is not successful, assign the infoMessage state to "Failed to fetch all joined entries!" 
              and clear allJoinedData state. Also set isTableEnabled state to false.
          5. Use Messages object imported from messages/Messages.ts file to set the infoMessage

    */
    event.preventDefault();

    axios.get(Messages.URL)
      .then((response) => {

        setState({
          ...state,
          allJoinedData: response.data,
          infoMessage: "",
          isTableEnabled: true
        })

      })
      .catch((error) => {

        setState({
          ...state,
          infoMessage: Messages.VIEW_INFO_MESSAGE,
          allJoinedData: [],
          isTableEnabled: false
        })

      })
  };


  const handleCheckboxChange = (checkedid: string) => {

    if (checkedidlist.includes(checkedid)) {
      let updatedList = checkedidlist.filter((data: any) => {
        if (data === checkedid) return false;
        else return true;
      });

      setcheckedidlist(updatedList);
    }

    else {
      setcheckedidlist([...checkedidlist, checkedid]);
    }

  }

  const handleBulkDelete = async () => {

    let errorOccured: boolean = false;

    for (let i = 0; i < checkedidlist.length; i++) {

      if (errorOccured) break;

      axios.delete(Messages.URL + checkedidlist[i])
        .then((response) => {

        })
        .catch((error) => {

        })
    }

    if (!errorOccured) {

      let updatedData = state.allJoinedData.filter((data) => {
        if (checkedidlist.includes(data.id)) return false;
        else return true;
      })

      setState({
        ...state,
        allJoinedData: updatedData
      })

      setcheckedidlist([]);

    }

  }



  return (
    <div>
      <div className="container">
        <div className="row">
          <br />
          <div className="offset-md-4 col-md-5">
            <br />
            <div>
              <div className="head">
                <h3><b>Fitness Insights</b></h3>
              </div>

              <div className="text-center mt-4 ">
                <button className="btn btn-primary"
                  onClick={fetchAll}
                >
                  Get All Joined Entries
                </button>
              </div>

              {state.isTableEnabled && state.allJoinedData.length > 0 && (

                <div className="mt-2">

                  <div>


                    <select name="fitnessGoalList" id="fitnessGoalList" onChange={(event) => setFilterValue(event.target.value)}>

                      <option value="">All</option>

                      {
                        fitnessGoalList.map((data, index) => {
                          return <option value={data} key={index}>{data}</option>
                        })
                      }


                    </select>


                    <button className="btn btn-danger" onClick={handleBulkDelete}>

                      Delete ({checkedidlist.length})

                    </button>


                  </div>
                  {
                    filteredData.length > 0 ?
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Joining Id</th>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>Fitness Goal</th>
                            <th>Preferred Time</th>
                            <th>Duration</th>
                            <th>Action</th>
                            <th>Select</th>
                          </tr>
                        </thead>
                        <tbody>

                          {

                            filteredData.map((data, index) => {

                              return <tr>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.contactNo}</td>
                                <td>{data.fitnessGoal}</td>
                                <td>{data.preferredTime}</td>
                                <td>{data.duration}</td>
                                <td>

                                  <button className="btn btn-success text-center" onClick={() => isUpdate(data.id)}>
                                    Update
                                  </button>

                                  <button className="btn btn-danger text-center" onClick={() => onDelete(data.id)}>
                                    Delete
                                  </button>

                                </td>

                                <td>
                                  <input
                                    type="checkbox"
                                    checked={checkedidlist.includes(data.id)}
                                    onChange={() => handleCheckboxChange(data.id)}
                                  />

                                </td>

                              </tr>
                            })

                          }
                        </tbody>
                      </table>
                      : 
                      <div className="text-center text-danger"> <h5><b>No data available for this filter</b></h5></div>

                  }
                </div>

              )
              }


              <div data-testid="message" className="text-danger  text-center mt-3">{state.infoMessage}</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewForm;