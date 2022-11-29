import { Header, Segment, Table } from 'semantic-ui-react';

export default function ReconfigureHistory() {

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
                    {/* <Table.Body>
                        {workOrdersByDate.map(workOrder => (
                            <Table.Row active={workOrder === workOrderToEdit} onDoubleClick={() => { setWorkOrderToEdit(workOrder); modalStore.openModal(<ReconfigureWorkOrder />, 'fullscreen') }} key={workOrder.id}>
                                <Table.Cell>{workOrder.job}</Table.Cell>
                                <Table.Cell>{workOrder.type}</Table.Cell>
                                <Table.Cell>{workOrder.assembly}</Table.Cell>
                                <Table.Cell>{workOrder.class}</Table.Cell>
                                <Table.Cell>{format(workOrder.dateReleased!, 'dd MMM yyyy')}</Table.Cell>
                                <Table.Cell>{format(workOrder.startDate!, 'dd MMM yyyy')}</Table.Cell>
                                <Table.Cell>{format(workOrder.completionDate!, 'dd MMM yyyy')}</Table.Cell>
                                <Table.Cell>{workOrder.orderQuantity}</Table.Cell>
                                <Table.Cell>{workOrder.completedQuantity}</Table.Cell>
                                <Table.Cell>{workOrder.pendingQuantity}</Table.Cell>
                                <Table.Cell>{workOrder.orderStatus}</Table.Cell>
                                <Table.Cell>{workOrder.prodLine}</Table.Cell>
                                <Table.Cell>{workOrder.organization}</Table.Cell>
                                <Table.Cell>{Math.round(workOrder.aged)}</Table.Cell>
                                <Table.Cell>
                                    <Label ribbon='right' color={workOrder.slaBreached ? 'red' : 'green'}>{workOrder.slaBreached === true ? 'Yes' : 'No'}</Label>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body> */}
                </Table>
            </Segment>
        </>
    )
}