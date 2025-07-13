# Team Dropdown Component

Componente atomic reutilizable para gestionar asignaciones de equipo.

## Uso

```typescript
import { TeamDropdownComponent } from "./shared/atomic/dropdowns";
```

## Props

### Inputs

- `type: TeamDropdownType` - Tipo de dropdown: 'leader' | 'member'
- `size: TeamDropdownSize` - Tamaño: 'sm' | 'md' | 'lg'
- `teamMembers: TeamMember[]` - Array de miembros del equipo
- `selectedMember: TeamMember | null` - Miembro actualmente seleccionado
- `isVisible: boolean` - Visibilidad del dropdown (solo para tipo 'leader')
- `placeholder: string` - Texto placeholder
- `disabled: boolean` - Estado deshabilitado

### Outputs

- `memberSelected: EventEmitter<TeamMember | null>` - Emite cuando se selecciona un miembro
- `closed: EventEmitter<void>` - Emite cuando se cierra el dropdown (solo para tipo 'leader')

## Ejemplos

### Dropdown para seleccionar líder

```html
<app-team-dropdown type="leader" [teamMembers]="task.team" [selectedMember]="task.leader" [isVisible]="showDropdown" (memberSelected)="onLeaderSelected($event)" (closed)="closeDropdown()"></app-team-dropdown>
```

### Select para asignar miembro a subtarea

```html
<app-team-dropdown type="member" size="sm" [teamMembers]="task.team" [selectedMember]="subtask.assignedMember" (memberSelected)="onMemberAssigned($event)"></app-team-dropdown>
```

## Tipos de TeamMember

```typescript
interface TeamMember {
  id: number;
  name: string;
}
```
