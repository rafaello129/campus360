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
    <div className="surface-card p-4 rounded-lg overflow-auto">
      <table className="w-full table-auto text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Rol</th>
            {modules.map((m) => (
              <th key={m} className="text-left p-2">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2 font-semibold">{r.name}</td>
              {modules.map((m) => (
                <td key={`${r.id}-${m}`} className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 text-xs">R</span>
                    <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-amber-700 text-xs">E</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
