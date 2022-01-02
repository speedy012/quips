import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { IconContext } from "react-icons";
import { useState } from "react";

type CardProps = {
  institution: {
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

  toggleFavorites: Function;
};

function Card(props: CardProps) {
  const [showModal, setShowModal] = useState(false);

  // console.log("card", props);

  return (
    <div className="flex flex-col items-center max-w-sm rounded overflow-hidden shadow-lg p-2.5 ">
      <div className="p-4">
        <h2>{props.institution.data.NAME}</h2>
        <button
          className="text-xs float-right cursor-pointer mt-4"
          type="button"
          onClick={() => setShowModal(true)}
        >
          More Info...
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center  p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {props.institution.data.NAME}
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {!props.institution.favorite ? (
                      <IconContext.Provider value={{ color: "red" }}>
                        <button
                          onClick={() =>
                            props.toggleFavorites(props.institution)
                          }
                          className="relative float-right"
                        >
                          <AiOutlineHeart className="h-6 w-6" />
                        </button>
                      </IconContext.Provider>
                    ) : (
                      <IconContext.Provider value={{ color: "red" }}>
                        <button
                          onClick={() =>
                            props.toggleFavorites(props.institution)
                          }
                          className="relative float-right"
                        >
                          <AiFillHeart className="h-6 w-6" />
                        </button>
                      </IconContext.Provider>
                    )}

                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Deals in
                      <span className="font-bold ml-2">
                        {props.institution.data.SPECGRPN}
                      </span>
                      .
                    </p>
                    <p>
                      <span className="font-bold mr-2">Headquarters:</span>
                      {props.institution.data.ADDRESS}{" "}
                      {props.institution.data.CITY},{" "}
                      {props.institution.data.STALP}{" "}
                      {props.institution.data.ZIP}
                    </p>
                    <h6 className="font-bold float-left mt-4 ml-1">Notes:</h6>
                    <textarea className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"></textarea>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      {/* <h2>
        {props.data.institution.data.CITY} {props.data.institution.data.STALP}{" "}
        {props.data.institution.data.ZIP}
      </h2> */}
    </div>
  );
}

export default Card;
