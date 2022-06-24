import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../app/services/server";
import useCopy from "./useCopy";
import { useLazyCreateInviteLinkQuery as useCreateChannelInviteLinkQuery } from "../../app/services/channel";
import { useAppSelector } from "../../app/store";

function useAddUserManually() {
  const { copy, copied } = useCopy({ enableToast: false });

  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, server } = useAppSelector((store) => ({
    loginUser: store.contacts.byId[store.authData.uid],
    server: store.server
  }));
  const [
    createUser,
    { isSuccess: isCreateUserSuccess, isError: isCreateUserError, reset: resetCreateUser }
  ] = useCreateUserMutation();
  const [generateInviteLink, { data: inviteLink, isSuccess: isGenerateInviteLinkSuccess }] =
    useCreateChannelInviteLinkQuery();

  const canCreate =
    isGenerateInviteLinkSuccess && username !== "" && email !== "" && password !== "";

  const generatePassword = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(result);
  };

  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    generateInviteLink("");
  }, []);

  useEffect(() => {
    if (isCreateUserSuccess) {
      copy(
        `You are invited to ${server?.name} by ${loginUser?.name}, your temporary username is ${email}, your temporary password is ${password}. Login via ${inviteLink}. Your temporary account will expire in 3 days.`
      );
      resetCreateUser();
    }
  }, [isCreateUserSuccess]);

  useEffect(() => {
    if (isCreateUserError) {
      toast.error("Failed to create user.");
      resetCreateUser();
    }
  }, [isCreateUserError]);

  useEffect(() => {
    if (copied) {
      toast.success("Account info copied to clipboard!");
      setIsAdding(false);
      clearInputs();
    }
  }, [copied]);

  return {
    isAdding,
    setIsAdding,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    createUser,
    canCreate,
    generatePassword,
    clearInputs
  };
}

export default useAddUserManually;
