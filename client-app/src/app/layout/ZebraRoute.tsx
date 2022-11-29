import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useStore } from '../stores/store';

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function ZebraRoute({component: Component, ...rest}: Props) {
    const { userStore: { isZebra } } = useStore();

    return (
        <Route 
            {...rest}
            render={(props) => isZebra ? <Component {...props} /> : <Redirect to='/' />}
        />
    )
}