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

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
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
            </Grid>
            <Grid.Column width={14}>
              <Container style={{ marginTop: '4em' }}>
                <Switch>
                  <Route path='/dashboard' component={WorkOrderDashboard} />
                  <Route path='/openOrders' component={OpenWorkOrders} />
                  <Route key={location.key} path={['/createWorkOrder', '/manage/:id']} component={WorkOrderForm} />
                  <Route path='/errors' component={TestErrors} />
                  <Route path='/server-error' component={ServerError} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Grid.Column>
          </>
        )}
      />
    </>
  );
}

export default observer(App);