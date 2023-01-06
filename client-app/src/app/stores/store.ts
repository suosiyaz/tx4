import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import HotNewsStore from './hotNewsStore';
import ModalStore from './modalStore';
import ReviewStore from './reviewStore';
import UserStore from './userStore';
import WorkOrderStore from './workOrderStore';

interface Store {
    workOrderStore: WorkOrderStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    hotNewsStore: HotNewsStore;
    reviewStore: ReviewStore;
}

export const store: Store = {
    workOrderStore: new WorkOrderStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    hotNewsStore: new HotNewsStore(),
    reviewStore: new ReviewStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}