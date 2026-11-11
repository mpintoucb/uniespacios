import './StatusBadge.css'

function StatusBadge({ status }) {
  const variants = {
    Disponible: 'available',
    Confirmada: 'confirmed',
    Cancelada: 'cancelled',
  }

  return <span className={`badge badge--${variants[status]}`}>{status}</span>
}

export default StatusBadge
