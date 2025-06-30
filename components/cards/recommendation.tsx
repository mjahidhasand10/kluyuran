import { FC } from "react";
import Image from "next/image";
import { IRecommendation } from "@/types";
import { Rating } from "@/components/icons";
import { Button, Text } from "@/components";

export const Recommendation: FC<IRecommendation> = ({
  imageUrl,
  location,
  rating,
  description,
  price,
}) => {
  return (
    <div className="card recommendation">
      <div>
        <Image src={imageUrl} alt={location} fill className="object-cover" />
      </div>

      <div>
        <div>
          <Text as="h3">{location}</Text>
          <div className="rating">
            <Rating />
            <span className="rating-text">{rating}</span>
          </div>
        </div>

        <p className="description">{description}</p>

        <div className="footer">
          <span className="price">$ {price}</span>
          <Button>Book Now</Button>
        </div>
      </div>
    </div>
  );
};
