import { createApi } from "unsplash-js";
import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Loader from "./Loader";
import Picture from "./Picture";

const Req = () => {
  const [pictureList, SetPictureList] = useState([]);
  const [bottom, setBottom] = useState(null);
  const [firstLoad, setfirstLoad] = useState(true);
  const bottomObserver = useRef(null);
  //observer for set to bottom
  //learned about this from https://dev.to/jmalvarez/check-if-an-element-is-visible-with-react-hooks-27h8
  const observer = new IntersectionObserver(
    (lists) => {
      const listItem = lists[lists.length - 1];
      if (listItem.isIntersecting) {
        if (firstLoad) {
          const getData = async () => {
            const unsplash = await createApi({
              accessKey:
                "a22f61e98da4efa25d8860e77a91a596867dd335ecdf7feb12e086943db9565a"
            });
            let res = await unsplash.search.getPhotos({
              query: "random",
              page: 1, //starting page
              perPage: 30 //30 is max
            });
            SetPictureList((pictureList) => [
              ...pictureList,
              ...res.response.results
            ]);
          };
          getData();
          setfirstLoad(false);
        } else {
          SetPictureList((pictureList) => [...pictureList, ...pictureList]);
        }
      }
    },
    { threshold: 0.99 }
  );
  bottomObserver.current = observer;

  //set bottom
  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  return (
    <div className="main container">
      <h1>Infinite Scroll Unsplash Code Challenge</h1>
      <div>
        {pictureList.map((pic) => {
          return (
            <Picture
              key={uuid()}
              img={pic.urls.thumb}
              alt={pic.alt_description}
            />
          );
        })}
        <Loader forwardRef={setBottom} />
      </div>
    </div>
  );
};
export default Req;
