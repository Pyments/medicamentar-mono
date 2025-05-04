import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export function longDate(date: dayjs.Dayjs | string | undefined) {
  if (!date) return 'Data não disponível';
  dayjs.locale("pt-br");
  if (dayjs.isDayjs(date)) {
    return date.format("DD/MM/YY [às] HH:mm");
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date string");
  }
  
  const dia = parsedDate.getDate().toString().padStart(2, '0');
  const mes = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const ano = parsedDate.getFullYear().toString().slice(-2);
  const horas = parsedDate.getHours().toString().padStart(2, '0');
  const minutos = parsedDate.getMinutes().toString().padStart(2, '0');
  
  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}

export function shortDate(date: dayjs.Dayjs | string) {
  dayjs.locale("pt-br");
  if (dayjs.isDayjs(date)) {
    return `${date.format("DD/MM/YY [às] HH:mm")}`;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date string");
  }
  
  const dia = parsedDate.getDate().toString().padStart(2, '0');
  const mes = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const ano = parsedDate.getFullYear().toString().slice(-2);
  const horas = parsedDate.getHours().toString().padStart(2, '0');
  const minutos = parsedDate.getMinutes().toString().padStart(2, '0');
  
  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}
