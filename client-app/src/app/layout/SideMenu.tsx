import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

export default function SideMenu() {

    return (
        <Menu vertical inverted fixed='left' style={{ marginTop: '53px' }}>
            <Container>
                <Menu.Item as={NavLink} to='/dashboard' name='TX4 KPI Dashboard' />
                <Menu.Item as={NavLink} to='/openOrders' name='Open Work Orders' />
                <Menu.Item as={NavLink} to='/releaseOrder' name='Releaase Work Order' />
                <Menu.Item as={NavLink} to='/users' name='User Management' />
                <Menu.Item as={NavLink} to='/qa' name='Quality Assurance' />
                <Menu.Item as={NavLink} to='/help' name='Need Assistance' />
            </Container>
        </Menu>       

    )
}