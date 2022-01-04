import React, { useEffect, useState } from "react";

import CardContainer from "./CardContainer";
import FavoriteCard from "./FavoriteCards";
import Search from "./Search";

type Institution = {
  data: {
    NAME: string;
    ADDRESS: string;
    CITY: string;
    STALP: string;
    ZIP: string;
    SPECGRPN: string;
    ID: string;
  };
  favorite?: boolean;
};

const Main: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [favoritedInstitutionMap, setFavoritedInstitutionMap] =
    useStorageSyncedState(
      {} as { [institutionId: string]: boolean },
      "Favorite"
    );
    
  const [favorites, setFavorites] = useState<Institution[]>([]);
  const keys = Object.keys(favoritedInstitutionMap);

  const getSearchWord = (word: string) => {
    setSearchWord(word);
  };

  const fetchInstitutions = async () => {
    const res = await fetch(
      `https://banks.data.fdic.gov/api/institutions?search=Name%3A%20${searchWord}&sort_by=OFFICES&sort_order=DESC&limit=10&offset=0&format=json&download=false&filename=data_file`
    );
    const finInts = await res.json();
    const data = finInts.data.map((bank: { favorite: boolean }) => {
      bank.favorite = false;
      return bank;
    });
    setInstitutions(data);
  };

  //storing id:true to localStorage of institution liked
  // T is inferred by the first argument
  function useStorageSyncedState<T>(initialValue: T, key: string) {
    const [value, setValue] = useState<T>(() => {
      const localStorageValue = window.localStorage.getItem(key);

      return localStorageValue === null
        ? initialValue
        : (JSON.parse(localStorageValue) as T);
    });

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // casting the return as `const` here preserves the array order in the type
    return [value, setValue] as const;
  }

  const toggleFavorites = (props: any) => {

    console.log("props", props);
    const bankID = props.data.ID
    if (favoritedInstitutionMap[bankID] !== undefined) {
      // bank is in local storage
      setFavoritedInstitutionMap({
        ...favoritedInstitutionMap, [bankID]: !favoritedInstitutionMap[bankID]
      })
    } else {
      // bank isn't in local storage
      setFavoritedInstitutionMap({
        ...favoritedInstitutionMap, [bankID]: true
      })
    }
    // setFavoritedInstitutionMap({
    //   ...favoritedInstitutionMap,
    //   [props.data.ID]: !props.favorite,
    // });
    console.log("localStorage", favoritedInstitutionMap);
    




    // needs rework logic
    let institutionsCopy = [...institutions].map((institution) => {
      if (institution.data.ID === props.data.ID) {
        return { ...institution, favorite: !props.favorite };
      } else {
        return institution;
      }
    });

    console.log("copy", institutionsCopy);

    setInstitutions(institutionsCopy);
    

    
  };

  // useEffect(() => {
  //   const favoritedArray = [...institutions].filter((institution) => {
  //     institution.favorite = !institution.favorite;
  //     return keys.indexOf(institution.data.ID) >= 0;
  //   });

  //   console.log("favs in use", favoritedArray);
  //   setFavorites(favoritedArray);

  // }, [])

  // const checkFavorites = () => {
  //
  //   // const mapFavorites = () => {
  //   //   if (favoritedArray.length > 0) {
  //   //     return favoritedArray?.map((favorite: any) => {
  //   //       return (
  //   //         <FavoriteCard
  //   //           favorite={favorite}
  //   //           key={favorite.data.ID}
  //   //           toggleFavorites={toggleFavorites}
  //   //         />
  //   //       );
  //   //     });
  //   //   }
  //   // };

  //   // mapFavorites();
  // };

  // console.log("setFavorites", favorites);

  console.log('instit', institutions )

  return (
    <div>
      <Search
        getSearchWord={getSearchWord}
        searchWord={searchWord}
        fetchInstitutions={fetchInstitutions}
      />

      <CardContainer
        institutions={institutions}
        toggleFavorites={toggleFavorites}
      />
    </div>
  );
};;

export default Main;
