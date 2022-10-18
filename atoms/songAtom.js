import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingSongState = atom({
  key: "isPlayingSongState",
  default: false,
});
