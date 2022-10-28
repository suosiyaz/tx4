import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Grid, Label, Loader, Pagination, Table } from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';

export default observer(function WorkOrdersTable() {
    const { workOrderStore } = useStore();
    const { workOrdersByDate, workOrderRegistery, loadWorkOrders, setPagingParams, pagination } = workOrderStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext(page: any) {
        setLoadingNext(true);
        setPagingParams(new PagingParams(page));
        loadWorkOrders().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (workOrderRegistery.size < 1) loadWorkOrders();
    }, [workOrderRegistery.size, loadWorkOrders])

    return (
        <>
            <Grid columns={1}>
                <Grid.Column>
                    <Pagination activePage={pagination ? pagination.currentPage : 1} totalPages={pagination ? pagination.totalPages : 1} onPageChange={(event, data) => handleGetNext(data.activePage)} />
                </Grid.Column>
            </Grid>
            <Table compact='very' size='small' singleLine color='teal'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Job</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Assembly</Table.HeaderCell>
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.HeaderCell>Date Released</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>Completion Date</Table.HeaderCell>
                        <Table.HeaderCell>Order Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Completed Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Pending Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Prod Line</Table.HeaderCell>
                        <Table.HeaderCell>Organization</Table.HeaderCell>
                        <Table.HeaderCell>Aged(Days)</Table.HeaderCell>
                        <Table.HeaderCell>SLA Breached</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {workOrdersByDate.map(workOrder => (
                        <Table.Row key={workOrder.id}>
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
                </Table.Body>
            </Table>
            <Loader active={loadingNext} />
        </>
    )
})
