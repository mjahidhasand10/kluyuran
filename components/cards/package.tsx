import Image from "next/image";
import { Text } from "@/components";
import { FC } from "react";
import { IPackage } from "@/types";

export const Package: FC<IPackage> = ({ img, location, days, nights }) => {
  return (
    <article className="card package">
      <Image
        src={img}
        alt={location}
        fill
        className="object-cover rounded-lg"
      />

      <div>
        <Text as="h4">{location}</Text>
        {Boolean(days || nights) && (
          <Text as="p">
            {days} Days, {nights} Nights
          </Text>
        )}
      </div>
    </article>
  );
};
