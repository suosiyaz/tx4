import { Header, Segment } from 'semantic-ui-react';
import ReconfigureForm from './ReconfigureForm';
import ReconfigureHistory from './ReconfigureHistory';

export default function ReconfigureWorkOrder() {

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Reconfiguration Work Order</Header>
            </Segment>
            <Segment attached>
                <ReconfigureForm />
            </Segment>
            <Segment style={{ overflowX: 'auto', overflowY: 'auto', minWidth: 1000 }}>
                <ReconfigureHistory />
            </Segment>
        </>
    )
}