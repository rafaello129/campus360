// React import not required with modern JSX runtime
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

interface Props {
  title: string;
  data: any[];
  type?: 'line' | 'bar';
  dataKey?: string;
  xKey?: string;
}

export default function AnalyticsChartCard({ title, data, type = 'line', dataKey = 'value', xKey = 'month' }: Props) {
  return (
    <div className="surface-card p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
      <div className="mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={dataKey} stroke="#0f766e" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={dataKey} fill="#0f766e" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
