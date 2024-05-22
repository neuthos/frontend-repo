"use client";

import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {TextField} from "@mui/material";
import UsersApi from "@/apis/users.api";
import {setAccessToken, setAuthState} from "@/store/reducer/authReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import sleep from "@/utils/sleep";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalLogin() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [field, setField] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setField({...field, [key]: value});
  };

  const doLogin = async () => {
    setLoading(true);
    setErrMessage("");

    await sleep(1000);
    const response = await UsersApi.login(field.email, field.password);

    if (response.success) {
      dispatch(setAccessToken(response.data.accessToken));
      dispatch(setAuthState(true));
    } else setErrMessage(response.message);
    setLoading(false);
  };

  return (
    <div>
      <Modal
        open={!authState.isLoggedIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{mb: 1}}
          >
            Login
          </Typography>

          <Box>
            <Typography variant="caption" display="block" gutterBottom>
              email: admin@mail.com
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              password: admin
            </Typography>
          </Box>

          {errMessage && (
            <Typography
              sx={{color: "red"}}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errMessage}
            </Typography>
          )}

          <TextField
            type="email"
            name="email"
            label="Email"
            id="outlined-start-adornment"
            fullWidth
            value={field.email}
            onChange={handleOnChange}
          />

          <TextField
            type="password"
            label="Password"
            name="password"
            id="outlined-start-adornment"
            fullWidth
            value={field.password}
            onChange={handleOnChange}
          />

          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={doLogin}
          >
            Submit
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
