<template>
  <div class="home">
    <div class="header">
      <a
        class="title"
        href="https://playagameedizioni.it/il-nostro-catalogo-giochi/cryptid/"
        target="blank"
      ></a>
      <el-icon :size="20" :color="'#fff'" @click="() => (dialogVisible = true)">
        <info-filled />
      </el-icon>
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
    <el-dialog v-model="dialogVisible" width="90%">
      <div class="title">Cryptid Companion</div>
      <div class="info">
        {{ $t("Sviluppato") }}
        <a href="mailto:mdinocera.digital@gmail.com"> Michele Di Nocera </a>
      </div>
      <div class="info1">{{ $t("clicca1") }}</div>
      <div class="info2">{{ $t("clicca2") }}</div>
      <div class="legenda">
        {{ $t("Legenda") }}
        <el-scrollbar>
          <div
            :class="['item', indizio.key]"
            v-for="indizio in indiziList"
            :key="indizio.key"
          >
            <div :class="['icon', indizio.key]"></div>
            {{ $t(indizio.key) }}
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" type="primary">{{
            $t("OK")
          }}</el-button>
        </span>
      </template>
    </el-dialog>
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
import { InfoFilled } from "@element-plus/icons";
import { mapActions, mapGetters } from "vuex";
import PlayerItem from "@/components/PlayerItem/PlayerItem.vue";
import Player, { IPlayer } from "@/model/Player";

export default defineComponent({
  name: "Home",
  LANGS: Static.LANGS,
  data() {
    return {
      playerNumbers: [...Array(6).keys()].filter((item) => item >= 2),
      dialogVisible: false,
      indiziList: [...Static.INDIZI, Static._3N],
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
  components: { PlayerItem, InfoFilled },
});
</script>

<style lang="less" src="./Home.less" scoped></style>
