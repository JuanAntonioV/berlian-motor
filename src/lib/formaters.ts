export const formatRupiah = (angka: number | bigint) => {
  if (angka) {
    return new Intl.NumberFormat('id', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(angka);
  } else {
    return 0;
  }
};

export function formatInputRupiah(angka: number | bigint, prefix?: string) {
  if (angka) {
    const number_string = angka
      .toString()
      .replace(/[^,\d]/g, '')
      .toString();
    const split = number_string.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  } else {
    return '0';
  }
}

export const parseRupiah = (stringNumber: string) => {
  if (stringNumber) {
    const number = stringNumber.split('.').join('');
    return Number(number);
  } else {
    return 0;
  }
};
