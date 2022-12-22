import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Confirm, Label, Table } from 'semantic-ui-react';
import { WorkOrder } from '../../../app/models/workOrder';
import { useStore } from '../../../app/stores/store';

export default observer(function WorkOrdersTable() {
    const { workOrderStore } = useStore();
    const { savedWorkOrders, deleteWorkOrder, savedWorkOrderRegistery, selectedSavedWorkOrder, loadSavedWorkOrders, loadSavedWorkOrder, releaseWorkOrder } = workOrderStore;
    const [deleteConfirm, setConfirm] = useState<boolean>(false);
    const [deleteJob, setDeleteJob] = useState<WorkOrder>(new WorkOrder());

    useEffect(() => {
        if (savedWorkOrderRegistery.size < 1) loadSavedWorkOrders();
    }, [savedWorkOrderRegistery.size, loadSavedWorkOrders])

    return (
        <>
            <Confirm
                open={deleteConfirm}
                content={'Do you want to delete work order ' + deleteJob.job + '?'}
                cancelButton='No'
                confirmButton='Yes'
                onCancel={() => { setConfirm(false); setDeleteJob(new WorkOrder()) }}
                onConfirm={() => { deleteWorkOrder(deleteJob.id); setDeleteJob(new WorkOrder()); setConfirm(false) }}
            />
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
                        <Table.HeaderCell>Hot Order</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {savedWorkOrders.map(workOrder => (
                        <Table.Row active={workOrder === selectedSavedWorkOrder} key={workOrder.id}>
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
                            <Table.Cell>
                                <Label horizontal color={workOrder.hotOrder ? 'red' : undefined}>{workOrder.hotOrder === true ? 'Yes' : 'No'}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button.Group size='mini' floated='right'>
                                    <Button basic color='red' floated='right' onClick={() => {setConfirm(true); setDeleteJob(workOrder)}}>Delete</Button>
                                    <Button basic color='blue' floated='right' onClick={() => loadSavedWorkOrder(workOrder.id)}>Edit</Button>
                                    <Button basic color='green' floated='right' onClick={() => releaseWorkOrder(workOrder)}>Release</Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
})
