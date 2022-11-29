import { Container, Grid } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import WorkOrderDashboard from '../../features/workOrders/dashboard/WorkOrderDashboard';
import { Route, Switch, useLocation } from 'react-router-dom';
import WorkOrderForm from '../../features/workOrders/form/WorkOrderForm';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import SideMenu from './SideMenu';
import OpenWorkOrders from '../../features/workOrders/open/OpenWorkOrders';
import UsersDashboard from '../../features/users/dashboard/UsersDashboard';
import ZebraRoute from './ZebraRoute';
import AdminRoute from './AdminRoute';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Grid>
              <Grid.Column width={2}>
                <SideMenu />
              </Grid.Column>
              <Grid.Column width={14} style={{ marginTop: '4em' }}>
                <Container className='mainContainer'>
                  <Switch>
                    <Route path='/dashboard' component={WorkOrderDashboard} />
                    <Route path='/openOrders' component={OpenWorkOrders} />
                    <ZebraRoute path='/releaseOrder' component={WorkOrderForm} />
                    <AdminRoute path='/users' component={UsersDashboard} />
                    <Route path='/errors' component={TestErrors} />
                    <Route path='/server-error' component={ServerError} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </Grid.Column>
            </Grid>
          </>
        )}
      />
    </>
  );
}

export default observer(App);