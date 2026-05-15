import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { EnrollmentTrendChart } from "../../components/charts/EnrollmentTrendChart";
import { PageHeader } from "../../components/common/PageHeader";
import { SectionCard } from "../../components/common/SectionCard";
import { enrollmentTrend, retentionTrend } from "../../data/admin.mock";

export function AnaliticaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analítica institucional"
        description="Indicadores simulados de captación, retención y egreso para toma de decisiones."
      />

      <SectionCard title="Captación mensual">
        <EnrollmentTrendChart data={enrollmentTrend} />
      </SectionCard>

      <SectionCard title="Retención y egreso por periodo">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={retentionTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="retencion" fill="#184c66" name="Retención %" radius={[6, 6, 0, 0]} />
              <Bar dataKey="egreso" fill="#0f8b8d" name="Egreso %" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}

