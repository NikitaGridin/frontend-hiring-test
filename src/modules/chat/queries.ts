import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages(
    $first: Int
    $after: MessagesCursor
    $before: MessagesCursor
  ) {
    messages(first: $first, after: $after, before: $before) {
      edges {
        node {
          id
          text
          status
          updatedAt
          sender
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
      status
      updatedAt
      sender
    }
  }
`;

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      id
      text
      status
      updatedAt
      sender
    }
  }
`;

export const queries = {
  GET_MESSAGES,
  SEND_MESSAGE,
  MESSAGE_ADDED_SUBSCRIPTION,
};
