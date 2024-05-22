"use client";

import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import {useForm, Controller} from "react-hook-form";
import {CircularProgress, TextField, Typography} from "@mui/material";
import UsersApi from "@/apis/users.api";
import {IUserListState} from "@/interfaces/user.interface";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setErrMessage, setUserTrigger} from "@/store/reducer/userReducer";
import {LoadingButton} from "@mui/lab";
import sleep from "@/utils/sleep";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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

export default function UserFormModal({userId}: {userId: string | undefined}) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(userId ? true : false);
  const [formLoading, setFormLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(setErrMessage(""));
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    const isUpdate = !!userId;

    const dataUser: IUserListState = {
      name: data.name,
      email: data.email,
      bio: data.bio,
      age: data.age,
      ethnicity: data.ethnicity,
      height: data.height,
    };
    setFormLoading(true);
    dispatch(setErrMessage(""));
    let response;
    if (isUpdate) response = await UsersApi.update(userId, dataUser);
    else response = await UsersApi.create(dataUser);
    await sleep(1000);
    setFormLoading(false);

    if (response.success) {
      dispatch(setUserTrigger(Math.random()));
      handleClose();
      reset({
        name: "",
        email: "",
        bio: "",
        age: "",
        ethnicity: "",
        height: "",
      });
    } else {
      dispatch(setErrMessage(response.message));
    }
  };

  useEffect(() => {
    const getUser = async (userUUID: string) => {
      const response = await UsersApi.getOne(userUUID);

      if (response.success) {
        const user = response.data;
        reset({
          name: user.name,
          email: user.email,
          bio: user.bio,
          age: user.age,
          ethnicity: user.ethnicity,
          height: user.height,
        });

        setLoading(false);
      }
    };

    if (userId && open) getUser(userId);
  }, [userId, open, reset]);

  return (
    <div>
      {userId ? (
        <Button onClick={handleOpen} size="small">
          Edit
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{mt: 3}}
        >
          Add User
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{mb: 3}}
              >
                {userId ? "Edit user" : "Add new user"}
              </Typography>

              {userState.errMessage && (
                <Typography
                  sx={{color: "red"}}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {userState.errMessage}
                </Typography>
              )}

              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{required: "Name is required"}}
                render={({field}) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={<>{errors.name?.message}</>}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({field}) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={<>{errors.email?.message}</>}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="bio"
                control={control}
                defaultValue=""
                rules={{required: "Bio is required"}}
                render={({field}) => (
                  <TextField
                    {...field}
                    multiline
                    rows={4}
                    label="Bio"
                    variant="outlined"
                    error={!!errors.bio}
                    helperText={<>{errors.bio?.message}</>}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{
                  required: "Age is required",
                  min: {
                    value: 18,
                    message: "Age must be at least 18",
                  },
                }}
                render={({field}) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Age"
                    variant="outlined"
                    error={!!errors.age}
                    helperText={<>{errors.age?.message}</>}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="ethnicity"
                control={control}
                defaultValue=""
                rules={{required: "Ethnicity is required"}}
                render={({field}) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Ethnicity"
                    variant="outlined"
                    error={!!errors.ethnicity}
                    helperText={<>{errors.ethnicity?.message}</>}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="height"
                control={control}
                defaultValue=""
                rules={{required: "Height is required"}}
                render={({field}) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Height (cm)"
                    variant="outlined"
                    error={!!errors.height}
                    helperText={<>{errors.height?.message}</>}
                    fullWidth
                  />
                )}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                sx={{mt: 3}}
                loading={formLoading}
              >
                Submit
              </LoadingButton>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
