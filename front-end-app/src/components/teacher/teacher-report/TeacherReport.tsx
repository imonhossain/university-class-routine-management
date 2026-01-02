import { Card, CardContent } from 'components/ui/card';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ITeacherReportGraph from 'interfaces/TeacherReportGraph';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  teacherData: ITeacherReportGraph[];
}

const TeacherReport: FC<Props> = ({ teacherData }) => {
  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Norther university teacher graph',
      },
    },
  };

  const data = {
    labels: teacherData.map((item: ITeacherReportGraph) => item.name),
    datasets: [
      {
        label: 'Taken Credit',
        data: teacherData.map((item: ITeacherReportGraph) => item.credit),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Card className="container">
      <CardContent className="pt-6">
        <h1 className="text-left mb-4">Teacher Graph</h1>
        <Bar
          options={options}
          data={data}
          height={500}
          width={700}
          className="w-full ml-auto mr-auto"
        />
      </CardContent>
    </Card>
  );
};
export default TeacherReport;
