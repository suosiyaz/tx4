import { observer } from 'mobx-react-lite';
import { Header, Segment } from 'semantic-ui-react';
import WorkOrdeCharts from './WorkOrderCharts';
import WorkOrderHotNews from './WorkOrderHotNews';

export default observer(function WorkOrderDashboard() {

    return (
        <><Segment
            textAlign='center'
            attached='top'
            inverted
            color='teal'
            style={{ border: 'none' }}
        >
            <Header>Reconfiguration - Operations Dashboard</Header>
        </Segment>
            <Segment attached>
                <WorkOrdeCharts />
            </Segment>
            <Segment>
                <WorkOrderHotNews />
            </Segment>
        </>
    )
})