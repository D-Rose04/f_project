export function formatDateFromSecs(secs) {
    var fecha = new Date(1970, 0, 1); // Epoch
    fecha.setSeconds(secs);
    const ahora = new Date();
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const diferenciaDias = Math.floor((ahora - fecha) / milisegundosPorDia);

    if (diferenciaDias === 0) {
        // El mensaje se envió hoy, mostramos solo la hora
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();
        return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    } else if (diferenciaDias < 7) {
        // El mensaje se envió en los últimos 7 días, mostramos el día de la semana
        const diasSemana = ['Dom', 'Lun', 'Ma', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const diaSemana = diasSemana[fecha.getDay()];
        return diaSemana;
    } else {
        // El mensaje se envió hace más de una semana, mostramos la fecha en formato "dd/mm"
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, por eso se suma 1
        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`;
    }
}

export function formatDate(timestamp) {
    const ahora = new Date();
    let fecha = timestamp.toDate()
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    let diferenciaDias = Math.floor((ahora.setHours(0, 0, 0, 0) - fecha.setHours(0, 0, 0, 0)) / milisegundosPorDia);

    const ayer = fecha.getDate() - ahora.getDate() == 1

    if (diferenciaDias === 0) {
        // El mensaje se envió hoy, mostramos solo la hora
        fecha = timestamp.toDate()
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();
        return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    } else {
        if (diferenciaDias === 1) {
            // El mensaje se envió ayer
            return 'Ayer';
        } else if (diferenciaDias < 7) {
            // El mensaje se envió en los últimos 7 días, mostramos el día de la semana
            const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
            const diaSemana = diasSemana[fecha.getDay()];
            return diaSemana;
        } else {
            // El mensaje se envió hace más de una semana, mostramos la fecha en formato "dd/mm"
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, por eso se suma 1
            return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`;
        }
    }
}

export function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}