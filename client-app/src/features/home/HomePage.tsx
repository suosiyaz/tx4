import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    {/* <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12, height: '150px', width: '300px' }} /> */}
                    <Icon size='massive' name='building outline' style={{ marginBottom: 12 }} />
                    DC OPS
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to DC OPS' />
                        <Button as={Link} to='/dashboard' size='huge' inverted>Go to Dashboard!</Button>
                    </>

                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />, 'mini')} size='huge' inverted>Login</Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})