import { DataTable, type DataTableColumn } from "../../components/common/DataTable";
import { PageShell } from "../../components/common/PageShell";
import { StatusBadge } from "../../components/common/StatusBadge";
import { documents } from "../../data/documents";
import type { DocumentRecord } from "../../types/campus";

interface DocumentsPageProps {
  title: string;
  description: string;
  eyebrow?: string;
}

const columns: DataTableColumn<DocumentRecord>[] = [
  {
    id: "name",
    header: "Documento",
    render: (document) => (
      <div>
        <p className="font-semibold text-slate-900">{document.name}</p>
        <p className="text-xs text-slate-500">{document.id}</p>
      </div>
    )
  },
  {
    id: "owner",
    header: "Titular",
    render: (document) => <span className="text-slate-600">{document.owner}</span>
  },
  {
    id: "area",
    header: "Área",
    render: (document) => <span className="text-slate-600">{document.area}</span>
  },
  {
    id: "updatedAt",
    header: "Última actualización",
    render: (document) => <span className="text-slate-600">{document.updatedAt}</span>
  },
  {
    id: "status",
    header: "Estado",
    render: (document) => <StatusBadge status={document.status} />
  }
];

export function DocumentsPage({ title, description, eyebrow }: DocumentsPageProps) {
  return (
    <PageShell title={title} description={description} eyebrow={eyebrow}>
      <DataTable columns={columns} rows={documents} rowKey={(document) => document.id} />
    </PageShell>
  );
}

