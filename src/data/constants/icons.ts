export const Icons = {
  wholeEdit: { family: "MaterialIcons", name: "edit-note" },
  sort: { family: "MaterialCommunityIcons", name: "sort" },
  add: { family: "Ionicons", name: "add-circle-outline" },
  edit: { family: "FontAwesome", name: "edit" },
  setting: { family: "Ionicons", name: "settings-sharp" },
  pullDown: {
    family: "MaterialCommunityIcons",
    name: "arrow-down-drop-circle",
  },
  trashCan: { family: "MaterialCommunityIcons", name: "trash-can-outline" },
  up: { family: "MaterialCommunityIcons", name: "arrow-up-thick" },
  upRight: { family: "MaterialCommunityIcons", name: "arrow-top-right-thick" },
  right: { family: "MaterialCommunityIcons", name: "arrow-right-thick" },
  downRight: {
    family: "MaterialCommunityIcons",
    name: "arrow-bottom-right-thick",
  },
  down: { family: "MaterialCommunityIcons", name: "arrow-down-thick" },
  downLeft: {
    family: "MaterialCommunityIcons",
    name: "arrow-bottom-left-thick",
  },
  left: { family: "MaterialCommunityIcons", name: "arrow-left-thick" },
  upLeft: { family: "MaterialCommunityIcons", name: "arrow-top-left-thick" },
  holdLeft: {
    family: "MaterialCommunityIcons",
    name: "arrow-left-bold-outline",
  },
  holdDownLeft: {
    family: "MaterialCommunityIcons",
    name: "arrow-bottom-left-bold-outline",
  },
  holdDown: {
    family: "MaterialCommunityIcons",
    name: "arrow-down-bold-outline",
  },
  plus: { family: "MaterialCommunityIcons", name: "plus" },
  next: { family: "MaterialCommunityIcons", name: "chevron-right" },
  delete: { family: "Feather", name: "delete" },
  check: { family: "MaterialCommunityIcons", name: "check-circle-outline" },
} as const;

export type IconKey = keyof typeof Icons;
