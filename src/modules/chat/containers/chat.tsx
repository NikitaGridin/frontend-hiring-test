import { Virtuoso } from "react-virtuoso";
import css from "./chat.module.css";
import { getItem, useChat } from "../model/use-list-messages";

import { FormSendMessage } from "./form-send-message";
import { NewMessagesAlert } from "../ui/new-messages-alert";

export const Chat = () => {
  const { loading, error, loadMore, messages, hasNextPage, unreadCount } =
    useChat();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={css.root}>
      <div className={css.container}>
        <Virtuoso
          className={css.list}
          data={messages}
          itemContent={getItem}
          components={{
            Footer: () =>
              hasNextPage && (
                <button onClick={loadMore} className={css.btn_load_more}>
                  Load More
                </button>
              ),
          }}
        />
      </div>

      {unreadCount > 0 && <NewMessagesAlert count={unreadCount} />}
      <FormSendMessage />
    </div>
  );
};
