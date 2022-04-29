import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useLazyRemoveFavoriteQuery,
  useFavoriteMessageMutation,
} from "../../app/services/message";
export default function useFavMessage(cid = null) {
  const [removeFav] = useLazyRemoveFavoriteQuery();
  const [addFav] = useFavoriteMessageMutation();
  const [favorites, setFavorites] = useState([]);
  const { favs = [] } = useSelector((store) => {
    return {
      // mids: store.channelMessage.byId[cid],
      favs: store.favorites,
      // loginUser: store.contacts.byId[store.authData.uid],
    };
  });
  const addFavorite = async (mid = []) => {
    const mids = Array.isArray(mid) ? mid.map((i) => +i) : [+mid];
    if (mids.length == 0) return;
    await addFav(mids);
  };
  const removeFavorite = (id) => {
    if (!id) return;
    removeFav(id);
  };
  const isFavorited = (mid = null) => {
    if (!mid) return false;
    let mids = [];
    favorites.forEach((f) => {
      if (f.messages.length == 1) {
        const ids = f.messages.map((m) => m.from_mid);
        mids = [...mids, ...ids];
      }
    });
    return mids.findIndex((i) => i == mid) > -1;
  };
  useEffect(() => {
    const filtereds = cid
      ? favs.filter((f) => {
          if (!f.messages) return false;
          return f.messages.every((m) => m.source.gid == cid);
        })
      : favs;
    console.log("filtered", filtereds);
    setFavorites(filtereds);
  }, [cid, favs]);

  return {
    isFavorited,
    addFavorite,
    removeFavorite,
    favorites,
  };
}
