import {IUserListState} from "@/interfaces/user.interface";
import {store, useAppSelector} from "@/store/store";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

const UsersApi = {
  login: async (email: string, password: string) => {
    const body = {email, password};

    const request = await fetch(HOST_URL + "/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    return response;
  },

  lists: async () => {
    const accessToken = store.getState().auth.accessToken;

    const request = await fetch(HOST_URL + "/users", {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    const response = await request.json();

    return response;
  },

  getOne: async (userId: string) => {
    const accessToken = store.getState().auth.accessToken;

    const request = await fetch(HOST_URL + `/users/${userId}`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    const response = await request.json();
    return response;
  },

  update: async (userId: string, body: IUserListState) => {
    const accessToken = store.getState().auth.accessToken;

    const request = await fetch(HOST_URL + `/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = await request.json();

    return response;
  },

  create: async (body: IUserListState) => {
    const accessToken = store.getState().auth.accessToken;

    const request = await fetch(HOST_URL + "/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = await request.json();

    return response;
  },

  delete: async (userId: string) => {
    const accessToken = store.getState().auth.accessToken;

    const request = await fetch(HOST_URL + `/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = await request.json();

    return response;
  },
};

export default UsersApi;
