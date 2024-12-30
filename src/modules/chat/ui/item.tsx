import {
  MessageSender,
  type Message,
} from "../../../../__generated__/resolvers-types";
import cn from "clsx";
import css from "./item.module.css";

export const Item = ({ text, sender }: Message) => (
  <div className={css.item}>
    <div
      className={cn(
        css.message,
        sender === MessageSender.Admin ? css.out : css.in
      )}
    >
      {text}
    </div>
  </div>
);
