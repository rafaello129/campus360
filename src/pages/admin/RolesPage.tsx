import { useState } from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { adminRoles } from '../../data/adminRoles';
import PermissionMatrix from '../../components/admin/PermissionMatrix';
import RoleModal from '../../components/admin/RoleModal';

export default function RolesPage(){
  const [roles, setRoles] = useState(adminRoles);
  const [open, setOpen] = useState(false);
  const modules = ['Dashboard','Captación','Estudiantes','Seguimiento','Alertas','Difusión','Documentos','Analítica','Roles'];

  function handleSave(role:any){
    if (!role.id) role.id = `r${Date.now()}`;
    setRoles((prev)=>[...prev.filter(r=>r.id!==role.id), role]);
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Roles y accesos" description="Configura de forma visual los permisos disponibles para cada tipo de usuario." />

      <div className="flex flex-col gap-4 rounded-3xl border border-tech-border bg-white p-5 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-3 text-sm text-tech-textSecond">
          <span className="inline-flex items-center gap-2 rounded-full bg-tech-bg px-3 py-2"><ShieldCheck className="h-4 w-4 text-tech-primary" /> Roles activos: {roles.filter(r=>r.active).length}</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-tech-bg px-3 py-2"><Users className="h-4 w-4 text-tech-primary" /> Usuarios administrativos: {roles.reduce((s,r)=>s+r.users,0)}</span>
        </div>
        <div>
          <button onClick={()=>setOpen(true)} className="rounded-2xl bg-tech-primary px-4 py-2.5 text-white transition hover:bg-tech-primary/90">Crear rol</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="rounded-3xl border border-tech-border bg-white p-5 shadow-sm">
            <h4 className="font-semibold text-tech-textMain">Lista de roles</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {roles.map(r=> (
                <li key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-tech-textMain">{r.name}</p>
                    <p className="text-xs text-tech-textSecond">{r.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-xl border border-tech-border px-3 py-2 text-xs font-semibold text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary">Ver permisos</button>
                    <button className="rounded-xl bg-tech-bg px-3 py-2 text-xs font-semibold text-tech-primary transition hover:bg-blue-100">Editar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <PermissionMatrix roles={roles.map(r=>({id:r.id,name:r.name}))} modules={modules} />
        </div>
      </div>

      {open && <RoleModal onClose={()=>setOpen(false)} onSave={handleSave} />}
    </div>
  );
}
