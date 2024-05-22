import {useState} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {IUserListState} from "@/interfaces/user.interface";
import UserFormModal from "./UserFormModal";
import UsersApi from "@/apis/users.api";
import sleep from "@/utils/sleep";
import {useAppDispatch} from "@/store/store";
import {setUserTrigger} from "@/store/reducer/userReducer";
import {LoadingButton} from "@mui/lab";

export default function UserCard({user}: {user: IUserListState}) {
  const dispatch = useAppDispatch();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    const response = await UsersApi.delete(user?.id || "");
    await sleep(1000);

    setLoadingDelete(false);

    if (response.success) {
      dispatch(setUserTrigger(Math.random()));
    }
  };

  return (
    <Card sx={{width: "100%", p: 1}}>
      <CardMedia
        component="img"
        alt={user.name}
        height="200"
        image={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <UserFormModal userId={user.id} />
        <LoadingButton
          size="small"
          loading={loadingDelete}
          onClick={() => handleDelete()}
        >
          Delete
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
