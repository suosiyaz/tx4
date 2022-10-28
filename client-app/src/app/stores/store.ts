import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import HotNewsStore from './hotNewsStore';
import ModalStore from './modalStore';
import UserStore from './userStore';
import WorkOrderStore from './workOrderStore';

interface Store {
    workOrderStore: WorkOrderStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    hotNewsStore: HotNewsStore;
}

export const store: Store = {
    workOrderStore: new WorkOrderStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    hotNewsStore: new HotNewsStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}