import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { IconContext } from "react-icons";
import { useState } from "react";

type FavoriteCardsProps = {
  favorite: {
    data: {
      NAME: string;
      ADDRESS: string;
      CITY: string;
      STALP: string;
      ZIP: string;
      SPECGRPN: string;
      ID: string;
    };
    favorite: boolean;
  };
  key: string;
  toggleFavorites: Function;
};

function FavoriteCards(props: FavoriteCardsProps) {
  console.log("fav props", props);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center max-w-sm rounded overflow-hidden shadow-lg p-2.5 ">
      fav
    </div>
  );
}

export default FavoriteCards;
