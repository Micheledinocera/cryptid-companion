import { createStore } from "vuex";
import Player from "@/model/Player";

export default createStore({
  state: {
    players: [] as Player[],
    showModal: false as boolean,
    playerIndex: 0 as number,
    isNot: false as boolean,
    playersColor: [] as string[],
  },
  mutations: {
    setPlayers: (state, players: Player[]) => (state.players = players),
    setPlayersColor: (state, playersColor: string[]) =>
      (state.playersColor = playersColor),
    setIsNot: (state, isNot: boolean) => (state.isNot = isNot),
    setShowModal: (state, showModal: boolean) => (state.showModal = showModal),
    setPlayerIndex: (state, playerIndex: number) =>
      (state.playerIndex = playerIndex),
  },
  actions: {
    setPlayers: (context, players: Player[]) =>
      context.commit("setPlayers", players),
    setPlayersColor: (context, playersColor: string[]) =>
      context.commit("setPlayersColor", playersColor),
    setIsNot: (context, isNot: boolean) => context.commit("setIsNot", isNot),
    setShowModal: (context, showModal: boolean) =>
      context.commit("setShowModal", showModal),
    setPlayerIndex: (context, playerIndex: number) =>
      context.commit("setPlayerIndex", playerIndex),
  },
  getters: {
    getPlayers: (state) => state.players,
    getPlayersColor: (state) => state.playersColor,
    getIsNot: (state) => state.isNot,
    getShowModal: (state) => state.showModal,
    getPlayerIndex: (state) => state.playerIndex,
  },
});
