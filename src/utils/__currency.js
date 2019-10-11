export const Currency = {
    Lempira: { locale: "es-HN", currency: "HNL", symbol: "L" },
    Dollar: { locale: "en-US", currency: "USD", symbol: "$" }
}

export function FormatCurrency(currency, value) {
    return new Intl.NumberFormat(currency.locale, { currency: currency.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function FormatCurrencySymbol(currencySymbol, value) {
    let locale = currencySymbol.toUpperCase() === 'L' ? "es-HN" : "en-US"
    let currency = currencySymbol.toUpperCase() === 'L' ? "HNL" : "USD"
    return new Intl.NumberFormat(locale, { currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function FormatNumberSymbol(number) {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}