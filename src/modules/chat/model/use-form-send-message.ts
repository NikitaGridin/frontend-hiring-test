import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { queries } from "../queries";

export const useFormSendMessage = () => {
  const [sendMessage] = useMutation(queries.SEND_MESSAGE);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (messageText.trim() === "") return;

    setMessageText("");
    await sendMessage({ variables: { text: messageText } });
  };

  const onChangeMessageText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessageText(e.target.value);

  return {
    handleSendMessage,
    onChangeMessageText,
    messageText,
  };
};
