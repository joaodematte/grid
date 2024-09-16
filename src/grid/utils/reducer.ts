import { GridData, Layout, LayoutItem } from '../types';

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: {
    tabId: number;
    item: LayoutItem;
  };
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  payload: {
    tabId: number;
    item: LayoutItem;
  };
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: {
    tabId: number;
    itemId: string;
  };
}

interface AddTabAction {
  type: typeof ADD_TAB;
  payload: {
    tabId: number;
  };
}

interface RemoveTabAction {
  type: typeof REMOVE_TAB;
  payload: {
    tabId: number;
  };
}

interface UpdateLayoutAction {
  type: typeof UPDATE_LAYOUT;
  payload: {
    tabId: number;
    layout: Layout;
  };
}

type GridAction =
  | AddItemAction
  | UpdateItemAction
  | RemoveItemAction
  | AddTabAction
  | RemoveTabAction
  | UpdateLayoutAction;

export const ADD_ITEM = 'ADD_ITEM' as const;
export const UPDATE_ITEM = 'UPDATE_ITEM' as const;
export const REMOVE_ITEM = 'REMOVE_ITEM' as const;
export const ADD_TAB = 'ADD_TAB' as const;
export const REMOVE_TAB = 'REMOVE_TAB' as const;
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT' as const;

export const gridReducer = (state: GridData, action: GridAction): GridData => {
  switch (action.type) {
    case ADD_ITEM: {
      const { tabId, item } = action.payload;

      return {
        ...state,
        [tabId]: [...(state[tabId] || []), item]
      };
    }

    case UPDATE_ITEM: {
      const { tabId, item } = action.payload;
      return {
        ...state,
        [tabId]: state[tabId]?.map((existingItem) => (existingItem.id === item.id ? item : existingItem)) || []
      };
    }

    case REMOVE_ITEM: {
      const { tabId, itemId } = action.payload;

      return {
        ...state,
        [tabId]: state[tabId]?.filter((item) => item.id !== itemId) || []
      };
    }

    case ADD_TAB: {
      const { tabId } = action.payload;

      return {
        ...state,
        [tabId]: []
      };
    }

    case REMOVE_TAB: {
      const { tabId } = action.payload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [tabId]: _, ...rest } = state;
      return rest;
    }

    case UPDATE_LAYOUT: {
      const { tabId, layout } = action.payload;
      return {
        ...state,
        [tabId]: layout
      };
    }

    default:
      return state;
  }
};
