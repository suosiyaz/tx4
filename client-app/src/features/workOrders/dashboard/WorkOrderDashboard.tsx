import { observer } from 'mobx-react-lite';
import WorkOrdeCharts from './WorkOrderCharts';
import WorkOrderHotNews from './WorkOrderHotNews';

export default observer(function WorkOrderDashboard() {

    return (
        <>
            <WorkOrdeCharts />
            <WorkOrderHotNews />
        </>
    )
})