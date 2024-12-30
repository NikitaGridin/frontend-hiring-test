import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { queries } from "../queries";
import { ItemContent } from "react-virtuoso";
import {
  Message,
  MessageEdge,
} from "../../../../__generated__/resolvers-types";
import { Item } from "../ui/item";

export const getItem: ItemContent<Message, unknown> = (_, data) => (
  <Item {...data} />
);

export const useChat = () => {
  const { loading, error, data, fetchMore } = useQuery(queries.GET_MESSAGES, {
    variables: { first: 10 },
  });

  const [unreadCount, setUnreadCount] = useState(0);

  useSubscription(queries.MESSAGE_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = subscriptionData.data.messageAdded;
      if (data.messages.pageInfo.hasNextPage) {
        setUnreadCount((prev) => prev + 1);
      } else {
        client.writeQuery({
          query: queries.GET_MESSAGES,
          variables: { first: 10 },
          data: {
            messages: {
              ...data.messages,
              edges: [
                ...data.messages.edges,
                { node: newMessage, cursor: Date.now().toString() },
              ],
            },
          },
        });
      }
    },
  });

  const loadMore = () =>
    fetchMore({
      variables: {
        after: data.messages.pageInfo.endCursor,
        first: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (!fetchMoreResult.messages.pageInfo.hasNextPage) setUnreadCount(0);
        return {
          messages: {
            ...fetchMoreResult.messages,
            edges: [...prev.messages.edges, ...fetchMoreResult.messages.edges],
          },
        };
      },
    });

  const hasNextPage = data?.messages.pageInfo.hasNextPage;
  const messages = data?.messages.edges.map((e: MessageEdge) => e.node) ?? [];

  return {
    loading,
    error,
    fetchMore,
    messages,
    loadMore,
    hasNextPage,
    unreadCount,
  };
};
