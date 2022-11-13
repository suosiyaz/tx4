import { Header, Segment } from 'semantic-ui-react';
import WorkOrderSearch from './WorkOrderSearch';
import WorkOrdersTable from './WorkOrdersTable';

export default function OpenWorkOrders() {

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>All Reconfiguration work Orders</Header>
            </Segment>
            <Segment attached>
                <WorkOrderSearch />
            </Segment>
            <Segment style={{ overflowX: 'auto', overflowY: 'auto', minWidth: 1000 }}>
                <WorkOrdersTable />
            </Segment>
        </>
    )
}