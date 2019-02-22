import streams from "../apis/streams";
import history from '../history'
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_SINGLE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

// calls an action of SIGN_IN that is passed to our reducer so we can change state, we also take in a userId as a parameter and pass it to our authReducer as the payload.
export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

// calls an action of SIGN_OUT that is passed to our reducer so we can change state.
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// calls an action of CREATE_STREAM
                  // formValues is the value of the form from StreamCreate
                                                        // getState allows us to get state that's already been initialized into our store.
export const createStream = formValues => async (dispatch, getState) => {
  // We get the userId from the auth object that's already in our redux store's state. (it was passed into our redux store's state when we used signIn)
  const { userId } = getState().auth;
  // We add a strean object to the streams array on our database and spread in the form values, plus userId: userId with ES6 syntax
  const response = await streams.post("/streams", {...formValues, userId});
  // dispatch of type CREATE_STREAM, payload is the new stream object with an userId property inside.
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // Here we're adding a line to our action creator so that when it's called it will automatically re-route our user to a different page.
  history.push('/')
};

// get call for all streams in database.
export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// get call for single stream in database selected by the corresponding id property.
export const fetchSingleStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_SINGLE_STREAM, payload: response.data });
};

// put call where we select a specific stream object to edit by id, and edit it based on the values that come in from the form.
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/')
};

// delete call that deletes a specific stream by id.
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/')
};
