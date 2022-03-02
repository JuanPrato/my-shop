export default function useFormatter() {
    return Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'}).format;
}