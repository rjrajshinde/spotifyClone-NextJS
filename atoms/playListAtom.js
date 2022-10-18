import { atom } from "recoil";

export const playListState = atom({
  key: "playListState",
  default: null,
});

export const playListIdState = atom({
  key: "playListIdState", // unique ID (with respect to other atoms/selectors)
  default: "37i9dQZF1E8KNixCBKzou7", // default value (aka initial value)
});

export const mySavedAlbumsState = atom({
  key: "mySavedAlbumsState",
  default: null,
});
