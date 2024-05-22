"use client";

import UsersApi from "@/apis/users.api";
import ModalLogin from "@/components/ModalLogin";
import UserCard from "@/components/UserCard";
import UserFormModal from "@/components/UserFormModal";
import {IUserListState} from "@/interfaces/user.interface";
import {setUsers} from "@/store/reducer/userReducer";
import {useAppDispatch, useAppSelector} from "@/store/store";
import sleep from "@/utils/sleep";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  p: 4,
};

export default function Home() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);
  const authState = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      if (!loading) setLoading(true);
      const response = await UsersApi.lists();
      await sleep(1000);
      setLoading(false);
      const users: IUserListState[] = response?.data || [];

      dispatch(setUsers(users));
    };

    if (authState.isLoggedIn) getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.userTrigger, authState.isLoggedIn]);

  if (!authState.isLoggedIn)
    return (
      <>
        <ModalLogin />

        <Box sx={style}>
          <Typography variant="h4" gutterBottom>
            Unauthorized
          </Typography>
        </Box>
      </>
    );

  return (
    <main>
      <Box sx={style}>
        <Typography variant="h4" gutterBottom>
          List of users
        </Typography>

        <UserFormModal userId={undefined} />

        {loading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          userState.users && (
            <Grid container spacing={2}>
              {userState.users.map((user, key) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Box>
    </main>
  );
}
