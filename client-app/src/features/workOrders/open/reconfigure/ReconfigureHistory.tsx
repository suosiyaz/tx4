import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';

export default observer(function ReconfigureHistory() {
    const { workOrderStore } = useStore();
    const { selectedWorkOrder } = workOrderStore;

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>History of the work order</Header>
            </Segment>
            <Segment attached>
                <Table compact='very' size='small' singleLine color='teal'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Team</Table.HeaderCell>
                            <Table.HeaderCell>Added By</Table.HeaderCell>
                            <Table.HeaderCell>Timestamp</Table.HeaderCell>
                            <Table.HeaderCell>Course of Action</Table.HeaderCell>
                            <Table.HeaderCell>Comments</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {selectedWorkOrder?.history.map(history => (
                            <Table.Row key={history.id}>
                                <Table.Cell>{history.team}</Table.Cell>
                                <Table.Cell>{history.userName}</Table.Cell>
                                <Table.Cell>{format(history.updatedOn, 'dd MMM yyyy')}</Table.Cell>
                                <Table.Cell>{history.courseOfAction}</Table.Cell>
                                <Table.Cell>{history.comments}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
})