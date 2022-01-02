import Card from "./Card";
import FavoriteCard from "./FavoriteCards";
import React from "react";

type CardContainerProps = {
  institutions: {}[];

  toggleFavorites: Function;
};

function CardContainer({ institutions, toggleFavorites }: CardContainerProps) {
  // console.log("cont", institutions);

  const mapInstitutions = () => {
    if (institutions.length > 0) {
      return institutions?.map((institution: any) => {
        return (
          <Card
            institution={institution}
            key={institution.data.ID}
            toggleFavorites={toggleFavorites}
          />
        );
      });
    }
  };
  // console.log(institutions);

  return (
    <div className="flex flex-wrap justify-around mt-2 border-2 w-4/5 m-auto border-blue-500">
      {mapInstitutions()}
    </div>
  );
}

export default CardContainer;
