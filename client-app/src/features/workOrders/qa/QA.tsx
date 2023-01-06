import { observer } from 'mobx-react-lite';
import { Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import QASearch from './QASearch';
import QAWorkOrdersTable from './QAWorkOrdersTable';

export default observer(function QA() {
    const { reviewStore: { QAWorkOrderRegistery } } = useStore();


    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Quality Assurance</Header>
            </Segment>
            <Segment attached>
                <QASearch />
            </Segment>
            {QAWorkOrderRegistery.size > 0 &&
                <Segment style={{ overflowX: 'auto', overflowY: 'auto', minWidth: 1000 }}>
                    <QAWorkOrdersTable />
                </Segment>
            }
        </>
    )
})