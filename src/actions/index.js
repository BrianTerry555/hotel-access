import axios from "axios";

export function loadEvents() {
  return (dispatch) => {
    return axios.get("http://localhost:8080/hotel/events").then((response) => {
      dispatch(setEvents(response.data.data));
    }).catch((err) => {
      throw err;
    });
  }
}

export function setEvents(data) {
  return {
    type: "SET_EVENTS",
    data
  }
}


export function loadGuests(token) {
  return (dispatch) => {
    return axios.get("http://localhost:8080/hotel/guests", {headers: {Authorization: `Bearer ${token}`} }).then((response) => {
      dispatch(setGuests(response.data.data));
    }).catch((err) => {
      throw err;
    });
  }
}


export function setGuests(data) {
  return {
    type: "SET_GUESTS",
    data
  }
}

export function login(username, password) {
  return (dispatch) => {
    return axios.post("http://localhost:8080/auth/login", {username, password}).then((response) => {
      dispatch(setToken(response.data.token));
      dispatch(setPriv(response.data.priv));
    }).catch((err) => {
      alert("Username or password was incorrect");
      throw err;
    });
  }
}

export function setToken(token) {
  return {
    type: "SET_TOKEN",
    token
  }
}

export function setPriv(priv) {
  return {
    type: "SET_PRIV",
    priv
  }
}

export function signup(username, password) {
  return (dispatch) => {
    return axios.post("http://localhost:8080/auth/signup", {username, password}).then((response) => {
      alert("Your account has been made");
    }).catch((err) => {
      alert("Username was taken");
      throw err;
    });
  }
}

export function loadUserQue(token) {
  return (dispatch) => {
    return axios.get("http://localhost:8080/auth/userque", {headers: {Authorization: `Bearer ${token}`} }).then((response) => {
      dispatch(setUserQue(response.data.data));
    }).catch((err) => {
      throw err;
    });
  }
}

export function setUserQue(data) {
  return {
    type: "SET_USER_QUE",
    data
  }
}

export function addUser(username, priv, token) {
  return (dispatch) => {
    return axios.post("http://localhost:8080/auth/userque", {username, priv}, {headers: {Authorization: `Bearer ${token}`} }).then((response) => {
      dispatch(loadUserQue(token));
    }).catch((err) => {
      throw err;
    });
  }
}
