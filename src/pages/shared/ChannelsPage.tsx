import { MessageCircleMore, Users } from "lucide-react";
import { PageShell } from "../../components/common/PageShell";
import { StatusBadge } from "../../components/common/StatusBadge";
import { channels } from "../../data/channels";

interface ChannelsPageProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export function ChannelsPage({ title, description, eyebrow }: ChannelsPageProps) {
  return (
    <PageShell title={title} description={description} eyebrow={eyebrow}>
      <section className="grid gap-4 lg:grid-cols-2">
        {channels.map((channel) => (
          <article key={channel.id} className="surface-card rounded-3xl border border-tech-border p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-tech-textMain">{channel.name}</h3>
              <StatusBadge status={channel.status} />
            </div>

            <p className="text-sm text-tech-textSecond">{channel.audience}</p>

            <div className="mt-4 space-y-2 text-sm text-tech-textSecond">
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4 text-tech-primary" />
                {channel.members.toLocaleString("es-MX")} miembros
              </p>
              <p className="flex items-center gap-2">
                <MessageCircleMore className="h-4 w-4 text-tech-primary" />
                Última actividad: {channel.lastUpdate}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

