<template>
  <div class="home">
    <div class="header">
      <div class="title"></div>
      <el-select v-model="$i18n.locale">
        <el-option
          v-for="(lang, i) in $options.LANGS"
          :key="`Lang${i}`"
          :value="lang.value"
        >
          {{ lang.label }}
        </el-option>
      </el-select>
    </div>
    <div class="sub-header">
      <div class="negazioni-label">{{ $t("Negazioni") }}</div>
      <el-switch v-model="isNot" />
      <div class="num-label">{{ $t("Num Giocatori") }}</div>
      <el-select class="new-player" v-model="playersNum">
        <el-option
          v-for="(item, index) in playerNumbers"
          :key="'num_' + index"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <el-scrollbar>
      <div
        class="players-list"
        v-for="(player, index) in getPlayers"
        :key="'player_' + index"
      >
        <PlayerItem :player="player" :playerIndex="index" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Static from "@/utils/Static";
import { mapActions, mapGetters } from "vuex";
import PlayerItem from "@/components/PlayerItem/PlayerItem.vue";
import Player, { IPlayer } from "@/model/Player";

export default defineComponent({
  name: "Home",
  LANGS: Static.LANGS,
  data() {
    return {
      playerNumbers: [...Array(6).keys()].filter((item) => item >= 2),
    };
  },
  computed: {
    ...mapGetters(["getPlayers", "getIsNot"]),
    playersNum: {
      get(): number {
        return this.getPlayers.length;
      },
      set(value: number) {
        var players = [] as Player[];
        [...Array(value).keys()].forEach((item) =>
          players.push(
            new Player({
              nome: this.$t("Giocatore") + " " + (item + 1),
              indizi: this.getIsNot
                ? [...Static.INDIZI, Static._3N, ...Static.INDIZI_NOT]
                : [...Static.INDIZI],
            } as IPlayer)
          )
        );
        this.setPlayers(players);
      },
    },
    isNot: {
      get(): boolean {
        return this.getIsNot;
      },
      set(value: boolean): void {
        this.setIsNot(value);
        var players = [] as Player[];
        [...Array(this.getPlayers.length).keys()].forEach((item) =>
          players.push(
            new Player({
              nome: this.$t("Giocatore") + " " + (item + 1),
              indizi: value
                ? [...Static.INDIZI, Static._3N, ...Static.INDIZI_NOT]
                : [...Static.INDIZI],
            } as IPlayer)
          )
        );
        this.setPlayers(players);
      },
    },
  },
  methods: {
    ...mapActions(["setPlayers", "setIsNot"]),
  },
  mounted() {
    this.playersNum = this.playerNumbers[0];
  },
  components: { PlayerItem },
});
</script>

<style lang="less" src="./Home.less" scoped></style>
