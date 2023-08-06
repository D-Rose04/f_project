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

export const RazasPerro = [
    'Labrador Retriever',
    'Bulldog',
    'Poodle (Caniche)',
    'Beagle',
    'Golden Retriever',
    'Rottweiler',
    'Dachshund (Teckel)',
    'Pastor Alemán',
    'Boxer',
    'Chihuahua',
    'Husky Siberiano',
    'Pug (Carlino)',
    'Yorkshire Terrier',
    'Shih Tzu',
    'Bichón Frisé',
    'Doberman',
    'Dóberman',
    'Basset Hound',
    'Cocker Spaniel',
    'Border Collie',
    'Gran Danés',
    'Chow Chow',
    'Schnauzer',
    'Corgi',
    'Maltés',
    'Pomerania',
    'Bulldog Francés',
    'Akita Inu',
    'Bull Terrier',
    'San Bernardo',
    'Collie',
    'Pitbull',
    'Bóxer'
];

export const RazasGato = [
    'Siames',
    'Persa',
    'Bengalí',
    'Maine Coon',
    'Sphynx',
    'Ragdoll',
    'Siberiano',
    'British Shorthair',
    'Birmano',
    'Abisinio',
    'Manx',
    'Angora',
    'Scottish Fold',
    'Bosque de Noruega',
    'Burmés',
    'Exótico',
    'Himalayo',
    'Oriental',
    'Tonkinés',
    'Mau Egipcio',
    'Devon Rex',
    'Cornish Rex',
    'Van Turco',
    'Bombay',
    'Siamés Moderno',
    'Azul Ruso',
    'Sagrado de Birmania',
    'Europeo de Pelo Corto',
    'Peterbald',
    'Serengeti',
    'Sokoke',
    'Savannah',
    'Fold Escocés',
    'Pixie Bob',
    'Toyger',
    'Snowshoe',
    'Singapura',
    'Somalí',
    'Selkirk Rex',
    'Highlander',
    'Toy Bobtail',
    'Curl Americano',
    'Korat',
    'Khao Manee',
    'Munchkin',
    'Lykoi',
    'LaPerm',
    'Cymric',
    'Ural Rex',
    'Ojos Azules',
    'Khao Manee',
    'Siberiano',
    'Korat',
    'Curl Americano'
];