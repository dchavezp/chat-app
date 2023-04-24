import { format } from "date-fns";
import { es } from "date-fns/locale";

const hourFormat = (date: Date) => {
  return format(new Date(date), "hh:mm aaaa", { locale: es });
};

export { hourFormat };
