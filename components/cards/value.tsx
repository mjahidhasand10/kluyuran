import { Anchor, Text } from "@/components";
import { IValue } from "@/types";
import { FC } from "react";

export const Value: FC<IValue> = ({ icon, title, description }) => {
  return (
    <article className="card value">
      <span>{icon}</span>

      <Text as="h4">{title}</Text>
      <Text as="p">{description}</Text>

      <Anchor>Read More</Anchor>
    </article>
  );
};
