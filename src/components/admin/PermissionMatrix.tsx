// React import not required with modern JSX runtime

interface Role {
  id: string;
  name: string;
}

interface Props {
  roles: Role[];
  modules: string[];
}

export default function PermissionMatrix({ roles, modules }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-tech-border bg-white shadow-sm">
      <div className="border-b border-tech-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Matriz de permisos</p>
        <p className="mt-1 text-sm text-tech-textSecond">Vista compacta de acceso por módulo y rol.</p>
      </div>
      <div className="overflow-auto">
      <table className="w-full min-w-[720px] table-auto text-sm">
        <thead>
          <tr className="bg-tech-bg/70 text-tech-textSecond">
            <th className="text-left p-3 font-semibold">Rol</th>
            {modules.map((m) => (
              <th key={m} className="text-left p-3 font-semibold">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id} className="border-t border-tech-border">
              <td className="p-3 font-semibold text-tech-textMain">{r.name}</td>
              {modules.map((m) => (
                <td key={`${r.id}-${m}`} className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">R</span>
                    <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-tech-primary">E</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
