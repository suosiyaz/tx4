import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from 'mobx';
import { HotNews } from '../models/news';
import { store } from './store';

export default class HotNewsStore {
    news: HotNews[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_NEWS_URL + '', {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

        this.hubConnection.on('LoadNews', (allNews: HotNews[]) => {
            runInAction(() => {
                allNews.forEach(myNews => {
                    myNews.createdAt = new Date(myNews.createdAt + 'Z');
                })
                this.news = allNews;
            });
        });

        this.hubConnection.on('ReceiveNews', (myNews: HotNews) => {
            runInAction(() => {
                myNews.createdAt = new Date(myNews.createdAt);
                if (!this.news.some(x => x.id === myNews.id)) {
                    this.news.unshift(myNews);
                } else {
                    var newsIndex = this.news.findIndex(x => x.id === myNews.id);
                    this.news[newsIndex].summary = myNews.summary;
                    this.news[newsIndex].createdAt = myNews.createdAt;
                    this.news[newsIndex].displayName = myNews.displayName;
                    this.news[newsIndex].userName = myNews.userName;
                    this.news[newsIndex].workOrder = myNews.workOrder;
                }
            });
        });

    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping the connection: ', error));
    }

    clearNews = () => {
        this.news = [];
        this.stopHubConnection();
    }

    addNews = async (values: any) => {
        try {
            if (values.id > 0) {
                await this.hubConnection?.invoke('UpdateNews', values);
            } else {
                await this.hubConnection?.invoke('SendNews', values);
            }
        } catch (error) {
            console.log(error);
        }
    }
}