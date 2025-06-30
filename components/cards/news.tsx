import Image from "next/image";
import { Text } from "@/components";
import { FC } from "react";
import { INews } from "@/types";

export const News: FC<INews> = ({ img, title }) => {
  return (
    <article className="card news">
      <Image src={img} alt={title} fill className="object-cover rounded-lg" />

      <div>
        <Text as="h4">{title}</Text>
      </div>
    </article>
  );
};
