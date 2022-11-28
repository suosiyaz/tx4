import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { User, UserDetail, UserLogin } from '../models/user';
import { store } from './store';

export default class UserStore {

    usersRegistery = new Map<string, UserDetail>();
    user: User | null = null;
    selectedUser: UserDetail | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserLogin) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/dashboard');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getCurrentUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (user: UserDetail) => {
        try {
            await agent.Account.create(user);
            this.setUser(user);
        } catch (error) {
            throw error;
        }
    }

    update = async (user: UserDetail) => {
        try {
            await agent.Account.update(user);
            this.selectedUser = undefined;
            runInAction(() => {
                if (user.userName) {
                    let updatedUser = { ...this.getUser(user.userName), ...user };
                    this.usersRegistery.set(user.userName, updatedUser as UserDetail);
                    this.selectedUser = undefined;
                }
            });
        } catch (error) {
            this.selectedUser = undefined;
            throw error;
        }
    }

    loadUsers = async (searchKey: string) => {
        try {
            this.usersRegistery.clear();
            const users = await agent.Account.list(searchKey);
            users.forEach(user => {
                this.setUser(user);
            });
            console.log(users);
        } catch (error) {
            throw error;
        }
    }

    loadUser = async (userName: string) => {
        let user = this.getUser(userName);
        if (user) {
            this.selectedUser = user;
            return user;
        } else {
            try {
                user = await agent.Account.details(userName);
                this.setUser(user);
                runInAction(() => {
                    this.selectedUser = user;
                });
                return user;
            } catch (error) {
                console.log(error);
            }
        }
    }

    deleteUser = async (username: string) => {
        try {
            await agent.Account.delete(username);
            runInAction(() => {
                this.usersRegistery.delete(username);
            });
        } catch (error) {
            console.log(error);
        }
    }

    private getUser = (userName: string) => {
        return this.usersRegistery.get(userName);
    }

    private setUser = (user: UserDetail) => {
        this.usersRegistery.set(user.userName, user);
    }
    get users() {
        return Array.from(this.usersRegistery.values());
    }
    clearSelectedUser = () => {
        this.selectedUser = undefined;
    }
}