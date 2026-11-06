export const formatPrice = (n: number) => `฿${n.toLocaleString("th-TH")}`;

export const priceLabel = (n: number | null) => (n === null ? "รอกำหนดราคา" : formatPrice(n));

export const isLineUrl = (url: string | null): url is string =>
  !!url && /^https:\/\/(line\.me|lin\.ee)\//.test(url);
