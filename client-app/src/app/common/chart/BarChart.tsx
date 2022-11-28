import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import { observer } from 'mobx-react-lite';

interface Props {
    titleText: string;
    labels: string[];
    reportLabel: string;
    reportData: number[];
}

export default observer(function BarChart({titleText, labels = ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a',], reportLabel, reportData}: Props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        plugins: {
            title: {
                display: true,
                text: titleText,
            },
        },
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: reportLabel,
                data: reportData,
                backgroundColor: 'rgb(1, 81, 154)',
                stack: 'Stack 0',
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
})