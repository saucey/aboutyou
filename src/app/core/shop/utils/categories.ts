import { IAugmentedCategory, NavbarCategory } from '../types';
import last from 'ramda/es/last';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { CONFIG } from 'src/app/configs';

const checkByPath = (categoryPath: string) => (category: { path: string }) => categoryPath === category.path;
const checkById = (categoryId: number) => (category: { id: number }) => categoryId === category.id;

export function findActiveCategoryByPath<T extends { path: string; children?: T[] }>(
  categoryPath: string,
  categories: T[],
): T | undefined {
  const checkCategory = checkByPath(categoryPath);

  const findActiveCategoryRecursive = (inputCategories: T[], visitedCategories: T[] = []): [T | null, T[]] => {
    let result: [T | null, T[]] = [null, []];

    for (const category of inputCategories) {
      if (checkCategory(category)) {
        result = [category, visitedCategories];
        break;
      } else if (!result[0] && category.children) {
        result = findActiveCategoryRecursive(category.children, [...visitedCategories, category]);
      }
    }
    return result;
  };

  return categories ? findActiveCategoryRecursive(categories)[0] : null;
}

export function findActiveCategoryById<T extends { id: number; children?: T[] }>(
  categoryId: number,
  categories: T[],
): T | undefined {
  const checkCategory = checkById(categoryId);

  const findActiveCategoryRecursive = (inputCategories: T[], visitedCategories: T[] = []): [T | null, T[]] => {
    let result: [T | null, T[]] = [null, []];

    for (const category of inputCategories) {
      if (checkCategory(category)) {
        result = [category, visitedCategories];
        break;
      } else if (!result[0] && category.children) {
        result = findActiveCategoryRecursive(category.children, [...visitedCategories, category]);
      }
    }
    return result;
  };

  return categories ? findActiveCategoryRecursive(categories)[0] : null;
}

export const hasChildren = (node?: IAugmentedCategory): node is IAugmentedCategory & { children: NavbarCategory[] } =>
  Boolean(node && node.children && node.children.length);

type FindActiveNode = (nodes: IAugmentedCategory[]) => IAugmentedCategory | undefined;
const findActiveNode: FindActiveNode = nodes => {
  const findNode = (node: IAugmentedCategory): IAugmentedCategory | undefined => {
    if (node.isActive) {
      return node;
    }
    return hasChildren(node) ? node.children.map(findNode).find(item => !!item) : undefined;
  };
  return nodes.map(findNode).find(Boolean);
};

const hasSearchedNodeAsChild = (nodes: IAugmentedCategory[], activeCategory?: NavbarCategory): boolean =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Boolean(activeCategory && collectAllNodes(nodes).find(node => node.id === activeCategory.id));

const transformData = (nodes: NavbarCategory[], activeCategory?: NavbarCategory): IAugmentedCategory[] =>
  nodes.map<IAugmentedCategory>(node => ({
    ...node,
    isActive: activeCategory && node.id === activeCategory.id,
    isOpen: hasChildren(node) && hasSearchedNodeAsChild(node.children, activeCategory),
    children: hasChildren(node) ? transformData(node.children, activeCategory) : [],
  }));

export const collectAllNodes = (categories: IAugmentedCategory[]): IAugmentedCategory[] =>
  categories.reduce<IAugmentedCategory[]>((acc, node) => acc.concat(node, ...collectAllNodes(node.children || [])), []);

type FindSelectedItemAndParents = (
  children: NavbarCategory[],
  activeCategory?: NavbarCategory,
) => {
  selectedItem?: IAugmentedCategory;
  parent?: IAugmentedCategory;
};

const collectAllOpenNodes = (categories: IAugmentedCategory[]): IAugmentedCategory[] =>
  categories.reduce<IAugmentedCategory[]>((accumulator, node) => {
    return hasChildren(node) && node.isOpen
      ? accumulator.concat(node, ...collectAllOpenNodes(node.children || []))
      : accumulator;
  }, []);

const findSelectedItemAndParents: FindSelectedItemAndParents = (children, activeCategory) => {
  const transformedNodes = transformData(children, activeCategory);
  const activeNode = findActiveNode(transformedNodes);
  const parent = last(collectAllOpenNodes(transformedNodes));

  return {
    selectedItem: activeNode,
    parent,
  };
};

export const computeState = (children: NavbarCategory[], activeCategory?: NavbarCategory) => {
  if (children && activeCategory) {
    return findSelectedItemAndParents(children, activeCategory);
  } else {
    return {
      selectedItem: undefined,
      parent: undefined,
    };
  }
};

const getCategoryShortSlug = (category: BapiCategory): string => {
  const shortSlug = category.properties.find(prop => prop.name === 'Short Slug');
  return shortSlug ? shortSlug.value : category.name;
};

export const transformNavTree = (data: BapiCategory[]): NavbarCategory[] =>
  data.map(category => ({
    ...category,
    children: transformNavTree(category.children),
    shortSlug: getCategoryShortSlug(category),
    highlight: CONFIG.shop.categories.saleCategoryIds.includes(category.id),
  }));
