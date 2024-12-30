import css from "./new-messages-alert.module.css";

export const NewMessagesAlert = ({ count }: { count: number }) => {
  return <div className={css.new_messages_count}>New messages: {count}</div>;
};
