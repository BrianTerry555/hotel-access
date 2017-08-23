let defaultState = {
  events: [],
  guests: [],
  userQue: [],
  token: "",
  priv: ""
}

const mainReducer = (state = defaultState, action) => {
  if(action.type === "SET_EVENTS") {
    return {
      ...state,
      events: action.data
    }
  } else if(action.type === "SET_GUESTS") {
    return {
      ...state,
      guests: action.data
    }
  } else if(action.type === "SET_TOKEN") {
    return {
      ...state,
      token: action.token
    }
  } else if(action.type === "SET_PRIV") {
    return {
      ...state,
      priv: action.priv
    }
  } else if(action.type === "SET_USER_QUE") {
    return {
      ...state,
      userQue: action.data
    }
  } else {
    return {
      ...state
    }
  }
}

export default mainReducer;
