import axiosCall from "./axiosCall";

const playersSearchUrl = "https://www.balldontlie.io/api/v1/players?search=";
const avgsUrl =
  "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";

const CallApi = async (info) => {
  const player = await axiosCall(playersSearchUrl + info.lastName);
  let playerId, playerData;

  player.data.forEach((el, index) => {
    if (player.data[index].first_name === info.firstName) {
      playerId = player.data[index].id;
      playerData = player.data[index];
    }
  });

  let selectedStr = localStorage.getItem("selected");
  const averages = await axiosCall(
    avgsUrl + playerId + "&season=" + selectedStr
  );

  let playerArr = [playerData, averages.data[0], info];
  let mergedPlayerArr = Object.assign.apply(Object, playerArr);

  return mergedPlayerArr;
};

export default CallApi;
