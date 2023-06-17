import axios from 'axios';                                          // importing axios to make API requests

export const loginUser = (email, password) => async (dispatch) => {         // dispatch is a function that dispatches an action to the reducer (REDUX)
    //Try catch block to handle errors
    try {
        dispatch({                                                      // dispatching an action (REDUX)
            type: "LoginRequest"                                    // action type                                  
        })                       

    //API REQUEST To SERVER
    const { data } = await axios.post('api/v1/login', { email, password },{
    headers: {
        'Content-Type': 'application/json'
    }

})
    dispatch({                                                          // dispatching an action to Reducer (REDUX)
        type: "LoginSuccess",
        payload: data.user
    })



    } catch (error) {                                                 // dispatching error)      
        dispatch({
            type: "LoginFailure",
            payload: {
              message: error.message,  // Store the error message
              status: error.response?.status  // Store the HTTP status code if available
            }
          });
    }   
};
