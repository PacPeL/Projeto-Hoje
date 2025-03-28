// Estados posibles en orden cíclico
const estados = [
    { clase: 'status-operational', texto: 'Operacional' },
    { clase: 'status-maintenance', texto: 'Em Manutenção' },
    { clase: 'status-waiting', texto: 'Em Espera' }
];

function cambiarEstado(boton) {
    // Encontrar el estado actual
    const estadoActual = boton.textContent.trim();
    const currentIndex = estados.findIndex(e => e.texto === estadoActual);
    
    // Calcular próximo estado (cíclico)
    const nextIndex = (currentIndex + 1) % estados.length;
    const nuevoEstado = estados[nextIndex];
    
    // Actualizar botón
    boton.className = `status-badge ${nuevoEstado.clase}`;
    boton.textContent = nuevoEstado.texto;
    
   
    
    // Actualizar en Firebase (opcional)
    if (piezaId) {
        actualizarEstadoEnFirebase(piezaId, nuevoEstado.texto);
    }
}

async function actualizarEstadoEnFirebase(piezaId, nuevoEstado) {
    try {
        // Convertir texto a código de estado
        const estadoFirebase = {
            'Operacional': 'operational',
            'Em Manutenção': 'maintenance',
            'Em Espera': 'waiting'
        }[nuevoEstado];
        
        if (!estadoFirebase) return;
        
        // Actualizar en Firebase
        const piezaRef = doc(db, "piezas", piezaId);
        await updateDoc(piezaRef, { status: estadoFirebase });
        
        // Registrar en histórico
        const docSnap = await getDoc(piezaRef);
        if (docSnap.exists()) {
            const piezaData = docSnap.data();
            await logHistoryChange(
                piezaId,
                piezaData.nombre || 'Peça sem nome',
                piezaData.status, // estado anterior
                estadoFirebase,
                `Estado actualizado a ${nuevoEstado}`
            );
        }
    } catch (error) {
        console.error("Error al actualizar estado:", error);
    }
}