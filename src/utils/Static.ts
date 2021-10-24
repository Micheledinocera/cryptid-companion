import { IIndizio } from "@/model/Indizio";

export default class Static {
  static LANGS = [
    { label: "It", value: "it" },
    { label: "En", value: "en" },
  ];

  static EN = "en";

  static INDIZI = [
    { key: "LoP", group: 0, isNot: false },
    { key: "LoD", group: 0, isNot: false },
    { key: "LoM", group: 0, isNot: false },
    { key: "LoF", group: 0, isNot: false },
    { key: "PoD", group: 0, isNot: false },
    { key: "PoM", group: 0, isNot: false },
    { key: "PoF", group: 0, isNot: false },
    { key: "DoM", group: 0, isNot: false },
    { key: "DoF", group: 0, isNot: false },
    { key: "MoF", group: 0, isNot: false },
    { key: "1L", group: 1, isNot: false },
    { key: "1D", group: 1, isNot: false },
    { key: "1M", group: 1, isNot: false },
    { key: "1P", group: 1, isNot: false },
    { key: "1F", group: 1, isNot: false },
    { key: "1A", group: 1, isNot: false },
    { key: "2C", group: 2, isNot: false },
    { key: "2M", group: 2, isNot: false },
    { key: "2O", group: 2, isNot: false },
    { key: "2P", group: 2, isNot: false },
    { key: "3W", group: 3, isNot: false },
    { key: "3G", group: 3, isNot: false },
    { key: "3B", group: 3, isNot: false },
  ] as IIndizio[];

  static _3N = { key: "3N", group: 3, isNot: false } as IIndizio;

  static INDIZI_NOT = [
    { key: "LoP", group: 0, isNot: true },
    { key: "LoD", group: 0, isNot: true },
    { key: "LoM", group: 0, isNot: true },
    { key: "LoF", group: 0, isNot: true },
    { key: "PoD", group: 0, isNot: true },
    { key: "PoM", group: 0, isNot: true },
    { key: "PoF", group: 0, isNot: true },
    { key: "DoM", group: 0, isNot: true },
    { key: "DoF", group: 0, isNot: true },
    { key: "MoF", group: 0, isNot: true },
    { key: "1L", group: 1, isNot: true },
    { key: "1D", group: 1, isNot: true },
    { key: "1M", group: 1, isNot: true },
    { key: "1P", group: 1, isNot: true },
    { key: "1F", group: 1, isNot: true },
    { key: "1A", group: 1, isNot: true },
    { key: "2C", group: 2, isNot: true },
    { key: "2M", group: 2, isNot: true },
    { key: "2O", group: 2, isNot: true },
    { key: "2P", group: 2, isNot: true },
    { key: "3W", group: 3, isNot: true },
    { key: "3G", group: 3, isNot: true },
    { key: "3B", group: 3, isNot: true },
    { key: "3N", group: 3, isNot: true },
  ] as IIndizio[];

  static PLAYER_COLORS = [
    "blue",
    "green",
    "purple",
    "red",
    "orange",
  ] as string[];
}
