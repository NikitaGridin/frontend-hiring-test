import css from "./form-send-message.module.css";
import { useFormSendMessage } from "../model/use-form-send-message";

export const FormSendMessage = () => {
  const { handleSendMessage, onChangeMessageText, messageText } =
    useFormSendMessage();

  return (
    <form className={css.form_send_message} onSubmit={handleSendMessage}>
      <input
        type="text"
        className={css.textInput}
        placeholder="Message text"
        value={messageText}
        onChange={onChangeMessageText}
      />
      <button>Send</button>
    </form>
  );
};
