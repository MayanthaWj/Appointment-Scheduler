export const API_BASE = "http://localhost:5000/api";

export async function fetchSlots() {
  const res = await fetch(`${API_BASE}/slots/all`, { cache: "no-store" });
  return res.json();
}

export async function bookAppointment(data: {
  name: string;
  email: string;
  slotId: number;
}) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function cancelAppointment(appointmentId: number) {
  const res = await fetch(`${API_BASE}/appointments/${appointmentId}`, {
    method: "DELETE",
  });
  return res.json();
}