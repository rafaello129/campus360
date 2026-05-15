import { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { adminDirectory } from '../../data/adminDirectory';
import CreateContactModal from '../../components/admin/CreateContactModal';
import DirectoryContactCard from '../../components/admin/DirectoryContactCard';
import { SearchInput } from '../../components/common/SearchInput';

export default function DirectorioPage(){
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState(adminDirectory);
  const [createOpen, setCreateOpen] = useState(false);

  const list = contacts.filter((c)=>{
    if (!query) return true;
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q) || c.position.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Directorio institucional" description="Consulta y administra los contactos académicos y administrativos disponibles para la comunidad." />

      <div className="flex items-center justify-between">
        <SearchInput value={query} onChange={(e)=>setQuery(e.currentTarget.value)} placeholder="Buscar por nombre, área, materia o correo..." />
        <button onClick={() => setCreateOpen(true)} className="rounded-lg bg-petrol-700 px-4 py-2 text-white">Agregar contacto</button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {list.map((c)=> (
          <DirectoryContactCard key={c.id} contact={c} onView={() => {}} onEdit={()=>{}} />
        ))}
      </div>

      {createOpen && (
        <CreateContactModal
          onClose={() => setCreateOpen(false)}
          onCreate={(ct) => {
            const id = `p-${Date.now()}`;
            setContacts((prev) => [{ id, name: ct.name, position: ct.position ?? '', area: ct.area ?? '', subjects: [], email: ct.email ?? '', phone: ct.phone ?? '', location: ct.location ?? '', hours: '', available: true }, ...prev]);
            alert('Contacto simulado agregado.');
          }}
        />
      )}

    </div>
  );
}
