import { useEffect, useState } from "react";

import { useFavoriteMessageMutation, useLazyRemoveFavoriteQuery } from "@/app/services/message";
import { Favorite } from "@/app/slices/favorites";
import { useAppSelector } from "@/app/store";

export default function useFavMessage({
  cid = null,
  uid = null
}: {
  cid?: number | null;
  uid?: number | null;
}) {
  const [removeFav] = useLazyRemoveFavoriteQuery();
  const [addFav] = useFavoriteMessageMutation();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { favs = [] } = useAppSelector((store) => {
    return { favs: store.favorites };
  });

  const addFavorite = async (mid: number | number[]) => {
    const mids = Array.isArray(mid) ? mid.map((i) => +i) : [+mid];
    if (mids.length == 0) return;
    const resp = await addFav(mids);
    const hasError = "error" in resp;
    return !hasError;
  };

  const removeFavorite = (id: string) => {
    if (!id) return;
    removeFav(id);
  };

  const isFavorited = (mid = 0) => {
    if (!mid) return false;
    let mids: number[] = [];
    favorites.forEach((f: Favorite) => {
      if (f?.messages?.length == 1) {
        const ids = f.messages.map((m) => m.from_mid);
        mids = [...mids, ...ids];
      }
    });
    return mids.findIndex((i) => i == mid) > -1;
  };

  useEffect(() => {
    let filtereds: Favorite[] = [];
    filtereds = cid
      ? favs.filter((f) => {
          if (!f.messages) return false;
          return f.messages.every((m) => m.source.gid == cid);
        })
      : favs;
    filtereds = uid
      ? filtereds.filter((f) => {
          if (!f.messages) return false;
          return f.messages.every((m) => m.source.uid == uid);
        })
      : filtereds;

    setFavorites(filtereds);
  }, [cid, uid, favs]);

  // console.log("filtered", cid, uid, favs);
  return {
    isFavorited,
    addFavorite,
    removeFavorite,
    favorites
  };
}
