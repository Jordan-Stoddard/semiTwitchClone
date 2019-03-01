import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_SINGLE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";


// We initialize our state as an object
export default (state = {}, action) => {
  switch (action.type) {
      case FETCH_STREAMS:
      // If an action is called with the type FETCH_STREAMS then we return a new object
       // We then pass in the old state object information with ...state,
       // We then use a lodash method called mapKeys, what this does is it takes in our payload from the FETCH_STREAMS action creator,
       // The payload in this case is a whole bunch of stream objects, and what mapKeys does is it makes a new object and says ok, I'm going to add a property which is the value of the id of the
       // stream object, and then make the value of that property the corresponding stream object so:
      // {
      //  1: {streamId: 1, title: stream1, description: stream1desc},
    //    2: {streamId: 2, title: stream2, description: stream2desc},
    //    3: {streamId: 3, title: stream3, description: stream3desc},
          // etc etc for each object that is passed in in our action.payload.
  //   }
      return {...state, ..._.mapKeys(action.payload, 'id')}
    case FETCH_SINGLE_STREAM:
    // Then we used this new mapKey object to do things to specific objects in this mapKey object.
    // So in this case, to fetch a single string we pass in the previous state, then return the key interpolation of the property which gives us the specific object.
    // So if the id of the object being passed in is 132 then the below code is read:
    //[action.payload.id]: action.payload === 132: {132: {streamId: 132, title: stream132, description: stream132desc}
      return { ...state, [action.payload.id]: action.payload };
      // This works the same way as FETCH_SINGLE_STREAM
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
      // This works the same way
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
      // Delete stream is a little bit different: Here we're returning the _.omit method from lodash.
      // The _.omit method takes in an object as the first parameter, and then takes in a string and if the string matches a property inside the object passed in, then it's omitted from the object.
    // So on this we're taking in the state object, and the action.payload is going to be a string representation of the id of a specific stream 
    case DELETE_STREAM:
    // So if the specific stream had an id of 2 this would be read:
// _.omit( {1: {streamId: 1, title: stream1, description: stream1desc}, 2: {streamId: 2, title: stream2, description: stream2desc}, '2')
// would return { 1: {streamId: 1, title: stream1, description: stream1desc} } without the 2nd stream omitted.
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
