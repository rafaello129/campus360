import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface EnrollmentTrendChartProps {
  data: Array<{
    period: string;
    aspirantes: number;
    inscritos: number;
  }>;
}

export function EnrollmentTrendChart({ data }: EnrollmentTrendChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="period" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="aspirantes"
            stroke="#184c66"
            strokeWidth={3}
            dot={{ r: 3 }}
            name="Aspirantes"
          />
          <Line
            type="monotone"
            dataKey="inscritos"
            stroke="#0f8b8d"
            strokeWidth={3}
            dot={{ r: 3 }}
            name="Inscritos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

