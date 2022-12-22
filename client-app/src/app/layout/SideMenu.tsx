import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

export default function SideMenu() {

    return (
        <Menu vertical inverted fixed='left' style={{ marginTop: '53px' }}>
            <Container>
                <Menu.Item as={NavLink} to='/dashboard' name='KPI Dashboard' style={{ fontWeight: 'bold', fontSize: '15px' }} />
                <Menu.Item as={NavLink} to='/openOrders' name='Open Work Orders' style={{ fontWeight: 'bold', fontSize: '15px' }} />
                <Menu.Item as={NavLink} to='/releaseOrder' name='Release Work Order' style={{ fontWeight: 'bold', fontSize: '15px' }} />
                <Menu.Item as={NavLink} to='/users' name='User Management' style={{ fontWeight: 'bold', fontSize: '15px' }} />
                <Menu.Item as={NavLink} to='/qa' name='Quality Assurance' style={{ fontWeight: 'bold', fontSize: '15px' }} />
                <Menu.Item as={NavLink} to='/help' name='Need Assistance' style={{ fontWeight: 'bold', fontSize: '15px' }} />
            </Container>
        </Menu>       

    )
}