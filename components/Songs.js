import { useRecoilState } from "recoil";
import { playListIdState } from "../atoms/playListAtom";
import Song from "./Song";

function Songs({ playlist }) {
  // const playlist = useRecoilState(playListIdState);

  return (
    <div className="text-white px-4 md:px-8 lg:px-8 flex flex-col pb-28 space-y-1">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.id} track={track} order={i} />
        // <div key={tracks.track.duration_ms}>{tracks.track.name}</div>
      ))}
    </div>
  );
}

export default Songs;
