export const Currency = {
    Lempiras: { locale: "es-HN", currency: "HNL", symbol: "L" },
    Dollar: { locale: "en-US", currency: "USD", symbol: "$" }
}

export function FormatCurrency(currency, value) {
    return new Intl.NumberFormat(currency.locale, { currency: currency.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export function FormatCurrencySymbol(currencySymbol, value) {
    let locale = currencySymbol === 'L' ? "es-HN" : "en-US"
    let currency = currencySymbol === 'L' ? "HNL" : "USD"
    return new Intl.NumberFormat(locale, { currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}