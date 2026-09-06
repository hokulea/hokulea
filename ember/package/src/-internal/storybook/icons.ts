import ph from '@iconify-json/ph/icons.json';
import { addCollection, type IconifyIcon } from 'iconify-icon';

type PhIcons = { icons: IconifyIcon[]; width: number | undefined; height: number | undefined };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addCollection(ph);

export function getIconSvg(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const icon = (ph as PhIcons).icons[iconName] as IconifyIcon | undefined;

  if (!icon) return;

  const { body } = icon;
  const width = icon.width ?? (ph as unknown as PhIcons).width ?? 16;
  const height = icon.height ?? (ph as unknown as PhIcons).height ?? 16;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${body}</svg>`;
}

export function listIcons() {
  return Object.keys((ph as unknown as PhIcons).icons);
}
