<template>
  <div class="player-item">
    <div :class="['header', playerColor]" @click="changeColor">
      <div class="nome" v-if="!isEditing" @click.stop="setIsEditing">
        {{ player.nome }}
      </div>
      <input
        :value="player.nome"
        @keyup="changeNome"
        @blur="inputBlur"
        ref="input"
        v-else
      />
      <div
        class="icon-container"
        v-if="showRefresh"
        @click.stop="dialogVisible = true"
      >
        <el-icon :size="20" color="#000" class="refresh">
          <refresh />
        </el-icon>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="90%">
      <span>{{ $t("Sicuro") + player.nome }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            $t("Cancel")
          }}</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                refreshIndizi();
                dialogVisible = false;
              }
            "
            >{{ $t("OK") }}</el-button
          >
        </span>
      </template>
    </el-dialog>
    <div class="indizi-container">
      <div
        :class="['indizi-row']"
        v-for="(group, index) in [0, 1, 2, 3]"
        :key="'group_' + index"
      >
        <div class="indizi-group">
          <div class="group" @click="() => toggleRow(index)">
            {{ fromGroupToLabel(group) }}
          </div>
          <IndiziList
            :indizi="indiziAll.filter((item) => item.group == group)"
            :playerIndex="playerIndex"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Refresh } from "@element-plus/icons";
import { mapActions, mapGetters } from "vuex";
import Static from "@/utils/Static";
import IndiziList from "@/components/IndiziList/IndiziList.vue";
import Indizio from "@/model/Indizio";
import lodash from "lodash";

export default defineComponent({
  name: "PlayerItem",
  PLAYER_COLORS: Static.PLAYER_COLORS,
  data() {
    return {
      isEditing: false,
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions(["setPlayers", "setPlayersColor"]),
    fromGroupToLabel(group: number): string {
      switch (group) {
        case 0:
          return this.$t("Terreni");
        case 1:
          return this.$t("Entro 1");
        case 2:
          return this.$t("Entro 2");
        case 3:
          return this.$t("Entro 3");
        default:
          return "";
      }
    },
    changeNome(event: KeyboardEvent): void {
      if (event.key !== "Enter") {
        var players = [...this.getPlayers];
        players[this.playerIndex].nome = (
          event?.target as HTMLTextAreaElement
        ).value;
        this.setPlayers(players);
      } else this.isEditing = false;
    },
    refreshIndizi(): void {
      var players = [...this.getPlayers];
      players[this.playerIndex].indizi = this.getIsNot
        ? [...Static.INDIZI, Static._3N, ...Static.INDIZI_NOT]
        : [...Static.INDIZI];
      this.setPlayers(players);
    },
    inputBlur(): void {
      this.isEditing = false;
      if (this.player.nome.trim() == "") {
        var players = [...this.getPlayers];
        players[this.playerIndex].nome =
          this.$t("Giocatore") + " " + (this.playerIndex + 1);
        this.setPlayers(players);
      }
    },
    setIsEditing(): void {
      this.isEditing = true;
      this.$nextTick(() => {
        (this.$refs.input as HTMLInputElement)?.focus();
      });
    },
    changeColor(): void {
      var playersColor = [...this.getPlayersColor];
      playersColor[this.playerIndex] =
        Static.PLAYER_COLORS[
          (Static.PLAYER_COLORS.indexOf(this.playerColor) + 1) %
            Static.PLAYER_COLORS.length
        ];
      this.setPlayersColor(playersColor);
    },
    toggleRow(index: number): void {
      var players = [...this.getPlayers];
      var indiziToAdd = this.indiziAll.filter(
        (indizio: Indizio) => indizio.group == index
      );
      var filteredIndizi = players[this.playerIndex].indizi.filter(
        (indizio: Indizio) => indizio.group == index
      );
      if (filteredIndizi.length == 0)
        players[this.playerIndex].indizi = [
          ...players[this.playerIndex].indizi,
          ...indiziToAdd,
        ];
      else
        players[this.playerIndex].indizi = players[
          this.playerIndex
        ].indizi.filter((indizio: Indizio) => indizio.group != index);
    },
  },
  computed: {
    ...mapGetters(["getPlayers", "getIsNot", "getPlayersColor"]),
    indiziAll(): Indizio[] {
      return this.getIsNot
        ? [...Static.INDIZI, Static._3N, ...Static.INDIZI_NOT]
        : [...Static.INDIZI];
    },
    showRefresh(): boolean {
      return !lodash.isEqual(this.player.indizi, this.indiziAll);
    },
    playerColor(): string {
      return this.getPlayersColor[this.playerIndex]
        ? this.getPlayersColor[this.playerIndex]
        : Static.PLAYER_COLORS[this.playerIndex];
    },
  },
  components: { Refresh, IndiziList },
  props: ["player", "playerIndex"],
});
</script>

<style lang="less" src="./PlayerItem.less"></style>
