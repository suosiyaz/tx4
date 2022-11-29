import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import { Button, Confirm, Icon, Input, Label, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function UsersTable() {
    const { userStore } = useStore();
    const { usersRegistery, loadUsers, users, loadUser, deleteUser } = userStore;
    const [searchKey, setSearch] = useState<string>('');
    const [deleteUserName, setDeleteUserName] = useState<string>('');
    const [deleteConfirm, setConfirm] = useState<boolean>(false);

    useEffect(() => {
        if (usersRegistery.size < 1) loadUsers('');
    }, [loadUsers])

    return (
        <>
            <Input action={{ color: 'teal', content: 'Search', onClick: () => loadUsers(searchKey) }} placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
            <Confirm
                open={deleteConfirm}
                content={'Do you want to delete ' + deleteUserName + '?'}
                cancelButton='No'
                confirmButton='Yes'
                onCancel={() => { setConfirm(false); setDeleteUserName('') }}
                onConfirm={() => { deleteUser(deleteUserName); setDeleteUserName(''); setConfirm(false) }}
            />
            <Table compact='very' size='small' singleLine color='teal'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>User Id</Table.HeaderCell>
                        <Table.HeaderCell>Team</Table.HeaderCell>
                        <Table.HeaderCell>Organization</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Is Active?</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(user => (
                        <Table.Row key={user.userName}>
                            <Table.Cell>{user.firstName}</Table.Cell>
                            <Table.Cell>{user.lastName}</Table.Cell>
                            <Table.Cell>{user.userName}</Table.Cell>
                            <Table.Cell>{user.team}</Table.Cell>
                            <Table.Cell>{user.organisation}</Table.Cell>
                            <Table.Cell>{user.userRole}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>
                                <Label horizontal color={user.isActive ? 'green' : 'red'}>{user.isActive === true ? 'Yes' : 'No'}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button.Group floated='right'>
                                    <Button basic color='blue' floated='right' onClick={() => loadUser(user.userName)}>Edit</Button>
                                    <Button basic color='red' floated='right' onClick={() => {setConfirm(true); setDeleteUserName(user.userName)}}>Delete</Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
})