import { appendItemToMenu, appendSubmenuToMenu, createMenuElement } from '../components/menu';

import type { Menu } from '../../src';

export function createRefactorMenu() {
  const refactorMenu = createMenuElement(document.body);

  appendItemToMenu(refactorMenu, 'Format Document');
  appendItemToMenu(refactorMenu, 'Refactor...');
  appendItemToMenu(refactorMenu, 'Source Action...');
  refactorMenu.append(document.createElement('hr'));

  const shareMenu = createMenuElement(refactorMenu);

  appendItemToMenu(shareMenu, 'Code');

  const socialMenu = createMenuElement(shareMenu);

  appendItemToMenu(socialMenu, 'Twitter');
  appendItemToMenu(socialMenu, 'Mastodon');
  appendItemToMenu(socialMenu, 'Bsky');
  appendSubmenuToMenu(shareMenu, 'Social', socialMenu);

  appendSubmenuToMenu(refactorMenu, 'Share', shareMenu);

  refactorMenu.append(document.createElement('hr'));
  appendItemToMenu(refactorMenu, 'Cut');
  appendItemToMenu(refactorMenu, 'Copy');
  appendItemToMenu(refactorMenu, 'Paste');

  return { refactorMenu, socialMenu, shareMenu };
}

export function getItems(menu: Menu) {
  return {
    firstItem: menu.items[0],
    secondItem: menu.items[1],
    thirdItem: menu.items[2],
    fourthItem: menu.items[3],
    fifthItem: menu.items[4],
    sixthItem: menu.items[5],
    lastItem: menu.items[6]
  };
}
