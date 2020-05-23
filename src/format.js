
export default function (v, f, m) {
    
    var fv;
    switch (typeof f) {
        case 'function':
            fv = f(v, m);
            break;
        case 'object':
                v && (fv = v.replace(f[!m ? 0 : 2], f[!m ? 1 : 3]));
            break;
        default:
            if (v) {
                v = v+'';
                switch (f) {
                    case 'date':
                        fv = !m ? v.replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$3/$2/$1") : v.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
                        break;
                    case 'decimal':
                        fv = !m ? v.replace(/\,/g, "").replace(/\./g, ",") : v.replace(/\./g, "").replace(/\,/g, ".");
                        break;
                    case 'money':
                        fv = !m ? (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)) : v.replace(/\./g, "").replace(/\,/g, ".").replace(/[^0-9\.\,]/g, '');
                        break;
                    case 'moneynumber':
                        fv = !m ? (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)).replace(/[^0-9\.\,]/g, '') : v.replace(/\./g, "").replace(/\,/g, ".").replace(/[^0-9\.\,]/g, '');
                        break;
                    case 'integer':
                        fv = v.replace(/\./g, "").replace(/\,/g, "").replace(/\D/g, "");
                        break;
                }
            }
            break;
    }
    
    return fv;
};
