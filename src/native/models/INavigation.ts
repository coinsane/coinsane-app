export interface IDrawer {
  close: () => void;
  open: () => void;
}

export interface IMenuItem {
  scene: string;
  icon: string;
  text: string;
  active: false;
}

export interface INavigation {
  drawer: IDrawer;
  menu: IMenuItem[];
}
