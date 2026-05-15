import { useState } from 'react';
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

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <p className="text-sm text-slate-500">Roles activos: {roles.filter(r=>r.active).length}</p>
          <p className="text-sm text-slate-500">Usuarios administrativos: {roles.reduce((s,r)=>s+r.users,0)}</p>
        </div>
        <div>
          <button onClick={()=>setOpen(true)} className="rounded-lg bg-petrol-700 px-4 py-2 text-white">Crear rol</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="surface-card p-4 rounded-lg">
            <h4 className="font-semibold">Lista de roles</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {roles.map(r=> (
                <li key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost btn-sm">Ver permisos</button>
                    <button className="btn-ghost btn-sm">Editar</button>
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
