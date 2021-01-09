import axios from "axios";
import setUserToken from "../../utils/setUserToken";
import jwt_decode from "jwt-decode";
import { storage } from "../../firebase";
import * as types from "./action_types";

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    let { data } = await axios.post("/api/users/register", userData);
    console.log(data);
    const token = data.token;
    //sets the expirey date
    // const expire = new Date(new Date().getTime() + 10000 * 1000)
    //stores the the token and the expireation date in the browser
    //as a cookie
    localStorage.setItem("token", token);
    setUserToken(token);
    console.log(jwt_decode(token));
    dispatch(setLoggedUser(data.savedUser));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data,
    });
  }
};

export const startAuth = () => {
  return {
    type: types.START_AUTH,
  };
};
export const successAuth = (token) => {
  return {
    type: types.SUCCESS_AUTH,
    token: token,
  };
};
// Set logged in user
export const setLoggedUser = (decoded) => {
  return {
    type: types.SET_LOGGED_USER,
    payload: decoded,
  };
};
export const setLoggedUserRequest = () => {
  return {
    type: types.SET_LOGGED_USER_REQUEST,
  };
};

export const getCurrentUser = () => async (dispatch) => {
  dispatch(setLoggedUserRequest());
  try {
    let { data } = await axios.get("/api/users/current");
    dispatch(setLoggedUser(data));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const getSearchedUser = (id) => async (dispatch) => {
  axios
    .get(`/api/users/${id}`)
    // .get(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((result) => {
      dispatch(setSearchedUser(result.data));
      // console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setSearchedUser = (user) => {
  return {
    type: types.SET_SEARCHED_USER,
    payload: user,
  };
};

export const loginAuth = (email, password) => async (dispatch) => {
  // dispatch(startAuth());
  try {
    let { data } = await axios.post("api/users/login", {
      email: email,
      password: password,
    });
    console.log(data);
    const token = data.token;
    //sets the expirey date
    // const expire = new Date(new Date().getTime() + 10000 * 1000)
    //stores the the token and the expireation date in the browser
    //as a cookie
    localStorage.setItem("token", token);
    setUserToken(token);
    console.log(token);

    const decoded = jwt_decode(token);
    // dispatch(setLoggedUser(decoded));
    dispatch(getCurrentUser());
  } catch (error) {
    let { data } = error.response;
    console.log(data.message);
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const updateUser = ({
  location,
  website,
  bio,
  cards,
  githubusername,
  profile_pic,
  profileImgURL,
  currentProfileImg,
}) => (dispatch) => {
  // console.log(updateUserData);
  const updateUserData = {
    location,
    website,
    bio,
    cards,
    githubusername,
    profile_pic,
    profileImgURL,
    currentProfileImg,
  };
  dispatch(startAuth());
  // console.log(firebase);

  //checks if the user updated the profile image
  if (
    updateUserData.profileImgURL === "" ||
    updateUserData.profileImgURL === undefined
  ) {
    console.log("updating the profile with no avatar update");
  } else {
    // const
    console.log("updaing profile avatr");
    const uploadTask = storage
      .ref(`avatar/${updateUserData.profile_pic.name}`)
      .put(updateUserData.profile_pic);
    console.log(uploadTask);
    if (uploadTask.state_) {
      // console.log("IMAGE UPLOADED");
      // console.log(updateUserData.profile_pic.name);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("IMAGE UPLOADED");
          //the url for the profile image is then saved in  the user object to be saved in the
          //backend

          storage
            .ref("avatar")
            .child(updateUserData.profile_pic.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              updateUserData.profile_pic = url;
              console.log(updateUserData);
              axios
                .post("/api/users/edit", { updateUserData })
                .then((res) => {
                  dispatch(setLoggedUser(res.data.user));
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }
      );
    }
  }
};
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setUserToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setLoggedUser({}));
  dispatch(setSearchedUser({}));
};
