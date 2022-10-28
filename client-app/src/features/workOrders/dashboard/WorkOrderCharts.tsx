import { format, parseISO } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Grid, Tab } from 'semantic-ui-react';
import BarChart from '../../../app/common/chart/BarChart';
import { useStore } from '../../../app/stores/store';

export default observer(function WorkOrdeCharts() {
    const { workOrderStore: { getReport, WorkOrdersReleasedDaily, HotWorkOrdersDaily, WorkOrdersCompleted, WorkOrdersPastDue, WorkOrdersInProgress, WorkOrdersProdLine } } = useStore();
    const [WorkOrdersReleasedDailyLabels, setWorkOrdersReleasedDailyLabels] = useState<string[]>([]);
    const [WorkOrdersReleasedDailyData, setWorkOrdersReleasedDailyData] = useState<number[]>([]);
    const [HotWorkOrdersDailyLabels, setHotWorkOrdersDailyLabels] = useState<string[]>([]);
    const [HotWorkOrdersDailyData, setHotWorkOrdersDailyData] = useState<number[]>([]);
    const [WorkOrdersCompletedLabels, setWorkOrdersCompletedLabels] = useState<string[]>([]);
    const [WorkOrdersCompletedData, setWorkOrdersCompletedData] = useState<number[]>([]);
    const [WorkOrdersPastDueLabels, setWorkOrdersPastDueLabels] = useState<string[]>([]);
    const [WorkOrdersPastDuedData, setWorkOrdersPastDueData] = useState<number[]>([]);
    const [WorkOrdersInProgressLabels, setWorkOrdersInProgressLabels] = useState<string[]>([]);
    const [WorkOrdersInProgressData, setWorkOrdersInProgressData] = useState<number[]>([]);
    const [WorkOrdersProdLineLabels, setWorkOrdersProdLineLabels] = useState<string[]>([]);
    const [WorkOrdersProdLineData, setWorkOrdersProdLineData] = useState<number[]>([]);

    useEffect(() => {
        if (WorkOrdersReleasedDaily.length < 1) getReport('WorkOrdersReleasedDaily');
        if (HotWorkOrdersDaily.length < 1) getReport('HotWorkOrdersDaily');
        if (WorkOrdersCompleted.length < 1) getReport('WorkOrdersCompleted');
        if (WorkOrdersCompleted.length < 1) getReport('WorkOrdersPastDue');
        if (WorkOrdersCompleted.length < 1) getReport('WorkOrdersInProgress');
        if (WorkOrdersCompleted.length < 1) getReport('WorkOrdersProdLine');

        var myWorkOrdersReleasedDailyLabels: string[] = [];
        var myWorkOrdersReleasedDailyData: number[] = [];
        WorkOrdersReleasedDaily.forEach(w => {
            myWorkOrdersReleasedDailyLabels.push(format(parseISO(w.reportLabel), 'dd MMM yyyy'));
            myWorkOrdersReleasedDailyData.push(w.quantity);
        });
        setWorkOrdersReleasedDailyLabels(myWorkOrdersReleasedDailyLabels);
        setWorkOrdersReleasedDailyData(myWorkOrdersReleasedDailyData);

        var myHotWorkOrdersDailyLabels: string[] = [];
        var myHotWorkOrdersDailyData: number[] = [];
        HotWorkOrdersDaily.forEach(w => {
            myHotWorkOrdersDailyLabels.push(format(parseISO(w.reportLabel), 'dd MMM yyyy'));
            myHotWorkOrdersDailyData.push(w.quantity);
        });
        setHotWorkOrdersDailyLabels(myHotWorkOrdersDailyLabels);
        setHotWorkOrdersDailyData(myHotWorkOrdersDailyData);

        var myWorkOrdersCompletedLabels: string[] = [];
        var myWorkOrdersCompletedData: number[] = [];
        WorkOrdersCompleted.forEach(w => {
            myWorkOrdersCompletedLabels.push(format(parseISO(w.reportLabel), 'dd MMM yyyy'));
            myWorkOrdersCompletedData.push(w.quantity);
        });
        setWorkOrdersCompletedLabels(myWorkOrdersCompletedLabels);
        setWorkOrdersCompletedData(myWorkOrdersCompletedData);

        var myWorkOrdersPastDueLabels: string[] = [];
        var myWorkOrdersPastDueData: number[] = [];
        WorkOrdersPastDue.forEach(w => {
            myWorkOrdersPastDueLabels.push(w.reportLabel.split(' ')[0]);
            myWorkOrdersPastDueData.push(w.quantity);
        });
        setWorkOrdersPastDueLabels(myWorkOrdersPastDueLabels);
        setWorkOrdersPastDueData(myWorkOrdersPastDueData);

        var myWorkOrdersInProgressLabels: string[] = [];
        var myWorkOrdersInProgressData: number[] = [];
        WorkOrdersInProgress.forEach(w => {
            myWorkOrdersInProgressLabels.push(w.reportLabel);
            myWorkOrdersInProgressData.push(w.quantity);
        });
        setWorkOrdersInProgressLabels(myWorkOrdersInProgressLabels);
        setWorkOrdersInProgressData(myWorkOrdersInProgressData);

        var myWorkOrdersProdLineLabels: string[] = [];
        var myWorkOrdersProdLineData: number[] = [];
        WorkOrdersProdLine.forEach(w => {
            myWorkOrdersProdLineLabels.push(w.reportLabel);
            myWorkOrdersProdLineData.push(w.quantity);
        });
        setWorkOrdersProdLineLabels(myWorkOrdersProdLineLabels);
        setWorkOrdersProdLineData(myWorkOrdersProdLineData);
    }, [getReport, WorkOrdersReleasedDaily, HotWorkOrdersDaily, WorkOrdersCompleted, WorkOrdersPastDue, WorkOrdersInProgress, WorkOrdersProdLine])

    const panes = [
        {
            menuItem: 'All', render: () =>
                <>
                    <Grid>
                        <Grid.Column width={5}>
                            <BarChart labels={WorkOrdersReleasedDailyLabels} reportData={WorkOrdersReleasedDailyData} reportLabel='Work Orders Released' titleText='Work Orders Released / Day' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <BarChart labels={HotWorkOrdersDailyLabels} reportData={HotWorkOrdersDailyData} reportLabel='Hot Work Orders' titleText='Hot Work Orders - Daily' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <BarChart labels={WorkOrdersCompletedLabels} reportData={WorkOrdersCompletedData} reportLabel='Work Orders Completed' titleText='Work Orders Completed / Day' />
                        </Grid.Column>
                    </Grid>
                    <Grid>
                        <Grid.Column width={5}>
                            <BarChart labels={WorkOrdersPastDueLabels} reportData={WorkOrdersPastDuedData} reportLabel='Work Orders Past Due' titleText='Work Orders Past Due' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <BarChart labels={WorkOrdersInProgressLabels} reportData={WorkOrdersInProgressData} reportLabel='Work Orders In Progress' titleText='Work Orders In Progress' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <BarChart labels={WorkOrdersProdLineLabels} reportData={WorkOrdersProdLineData} reportLabel='Work Orders / ProdLine' titleText='Work Orders / ProdLine' />
                        </Grid.Column>
                    </Grid>
                </>
        },
        {
            menuItem: 'Work Orders Daily', render: () =>
                <Grid>
                    <Grid.Column width={16}>
                    <BarChart labels={WorkOrdersReleasedDailyLabels} reportData={WorkOrdersReleasedDailyData} reportLabel='Work Orders Released' titleText='Work Orders Released / Day' />
                    </Grid.Column>
                </Grid>
        },
        {
            menuItem: 'Hot Work Orders', render: () =>
                <Grid>
                    <Grid.Column width={16}>
                    <BarChart labels={HotWorkOrdersDailyLabels} reportData={HotWorkOrdersDailyData} reportLabel='Hot Work Orders' titleText='Hot Work Orders - Daily' />
                    </Grid.Column>
                </Grid>
        },
        {
            menuItem: 'Completed Work Orders', render: () =>
                <Grid>
                    <Grid.Column width={16}>
                        <BarChart labels={WorkOrdersCompletedLabels} reportData={WorkOrdersCompletedData} reportLabel='Work Orders Completed' titleText='Work Orders Completed / Day' />
                    </Grid.Column>
                </Grid>
        },
        {
            menuItem: 'Work Orders Past Due', render: () =>
                <Grid>
                    <Grid.Column width={16}>
                    <BarChart labels={WorkOrdersPastDueLabels} reportData={WorkOrdersPastDuedData} reportLabel='Work Orders Past Due' titleText='Work Orders Past Due' />
                    </Grid.Column>
                </Grid>
        },
        {
            menuItem: 'Work Orders In Progress / Age', render: () =>
                <Grid>
                    <Grid.Column width={16}>
                    <BarChart labels={WorkOrdersInProgressLabels} reportData={WorkOrdersInProgressData} reportLabel='Work Orders In Progress' titleText='Work Orders In Progress' />
                    </Grid.Column>
                </Grid>
        },
        {
            menuItem: 'Work Orders / ProdLine', render: () =>
                <Grid>
                    <Grid.Column width={16}>
                    <BarChart labels={WorkOrdersProdLineLabels} reportData={WorkOrdersProdLineData} reportLabel='Work Orders / ProdLine' titleText='Work Orders / ProdLine' />
                    </Grid.Column>
                </Grid>
        }
    ]
    return (
        <Grid>
            <Grid.Column width='16'>
                <Tab
                    menu={{ fluid: true }}
                    menuPosition='left'
                    panes={panes}
                    style={{ width: '100%' }}
                />
            </Grid.Column>
        </Grid>
    )
})