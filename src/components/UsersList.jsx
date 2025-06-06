import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={5} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error - {loadingUsersError?.message}</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button
          loading={isCreatingUser}
          onClick={handleUserAdd}
          className="cursor-pointer"
        >
          + Add User
        </Button>
        {creatingUserError && "Error creating user..."}
      </div>
      <div>{content}</div>
    </>
  );
}

export default UsersList;
