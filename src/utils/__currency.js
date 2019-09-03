export const Currency = {
    Lempiras: {locale: "es-HN",currency:"HNL",symbol:"L"},
    Dollar: {locale: "en-US",currency:"USD",symbol:"$"}
}

export function FormatCurrency (currency, value){
    return new Intl.NumberFormat(currency.locale, {currency: currency.currency, minimumFractionDigits: 2 }).format(value);
}