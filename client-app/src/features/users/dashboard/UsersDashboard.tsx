import { Header, Segment } from 'semantic-ui-react';
import RegisterForm from '../RegisterForm';
import UsersTable from './UsersTable';

export default function UsersDashboard() {

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Create / Update Users</Header>
            </Segment>
            <Segment attached clearing>
                <RegisterForm />
            </Segment>
            <Segment>
                <UsersTable />
            </Segment>
        </>
    )
}