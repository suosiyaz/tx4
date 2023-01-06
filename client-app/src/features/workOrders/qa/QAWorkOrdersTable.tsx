import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function QAWorkOrdersTable() {
    const { reviewStore } = useStore();

    const { qaWorkOrders } = reviewStore;

    return (
        <>
            <Table compact='very' size='small' singleLine color='teal'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Job</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Assembly</Table.HeaderCell>
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.HeaderCell>Organization</Table.HeaderCell>
                        <Table.HeaderCell>Date Released</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>Completion Date</Table.HeaderCell>
                        <Table.HeaderCell>Order Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Prod Line</Table.HeaderCell>
                        <Table.HeaderCell>Ready for Quality</Table.HeaderCell>
                        <Table.HeaderCell>Feedback</Table.HeaderCell>
                        <Table.HeaderCell>Quality Status</Table.HeaderCell>
                        <Table.HeaderCell>QA Completed Date</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {qaWorkOrders.map(workOrder => (
                        <Table.Row negative={workOrder.hotOrder} onDoubleClick={() => { }} key={workOrder.id}>
                            <Table.Cell>{workOrder.job}</Table.Cell>
                            <Table.Cell>{workOrder.type}</Table.Cell>
                            <Table.Cell>{workOrder.assembly}</Table.Cell>
                            <Table.Cell>{workOrder.class}</Table.Cell>
                            <Table.Cell>{workOrder.organization}</Table.Cell>
                            <Table.Cell>{workOrder.dateReleased ? format(workOrder.dateReleased, 'dd MMM yyyy') : ''}</Table.Cell>
                            <Table.Cell>{workOrder.startDate ? format(workOrder.startDate, 'dd MMM yyyy') : ''}</Table.Cell>
                            <Table.Cell>{workOrder.completionDate ? format(workOrder.completionDate, 'dd MMM yyyy') : ''}</Table.Cell>
                            <Table.Cell>{workOrder.orderQuantity}</Table.Cell>
                            <Table.Cell>{workOrder.orderStatus}</Table.Cell>
                            <Table.Cell>{workOrder.prodLine}</Table.Cell>
                            <Table.Cell>{workOrder.readyForQuality}</Table.Cell>
                            <Table.Cell>{workOrder.feedback}</Table.Cell>
                            <Table.Cell>{workOrder.qualityStatus}</Table.Cell>
                            <Table.Cell>{workOrder.qaCompletedDate ? format(workOrder.qaCompletedDate, 'dd MMM yyyy') : ''}</Table.Cell>
                            <Table.Cell>
                                <Button as={Link} to={`/qa/${workOrder.id}`}  basic color='blue' size='small' >Review</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
})
