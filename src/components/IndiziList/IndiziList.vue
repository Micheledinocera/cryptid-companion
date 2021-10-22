<template>
  <el-scrollbar>
    <div class="indizi-list">
      <div
        :class="['indizi-item', { removed: removed(indizio) }]"
        v-for="(indizio, indiziIndex) in indiziOrdered"
        :key="'indizi_' + indiziIndex"
        @click="removeItem(indizio)"
      >
        <div :class="['icon-container']">
          <div :class="['icon', indizio.key]"></div>
        </div>
        <div class="isNot" v-if="indizio.isNot"></div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Indizio from "@/model/Indizio";
// import Static from "@/utils/Static";

export default defineComponent({
  name: "IndiziList",
  methods: {
    ...mapActions(["setPlayers"]),
    removeItem(indizio: Indizio): void {
      var players = [...this.getPlayers];
      if (this.removed(indizio)) players[this.playerIndex].indizi.push(indizio);
      else
        players[this.playerIndex].indizi = players[
          this.playerIndex
        ].indizi.filter(
          (item: Indizio) =>
            item.key != indizio.key || item.isNot != indizio.isNot
        );
      this.setPlayers(players);
    },
    removed(indizio: Indizio): boolean {
      return this.getPlayers[this.playerIndex].indizi.every(
        (item: Indizio) =>
          item.key !== indizio.key || item.isNot !== indizio.isNot
      );
    },
  },
  computed: {
    ...mapGetters(["getPlayers", "getIsNot"]),
    indiziOrdered(): Indizio[] {
      var indiziLocale = [...this.indizi];
      return indiziLocale.sort((a: Indizio /* , b: Indizio */) =>
        this.removed(a) ? 1 : -1
      );
    },
  },
  props: ["indizi", "playerIndex"],
});
</script>

<style lang="less" src="./IndiziList.less"></style>
