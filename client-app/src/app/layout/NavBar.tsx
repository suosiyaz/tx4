import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Container, Dropdown, Menu, Image } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to='/' exact header>
                        <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                        TX4 - DC Operations
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={'/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={user?.firstName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='Change Password' icon='key' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
        </>
    )
})