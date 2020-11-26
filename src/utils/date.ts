import dayjs from 'dayjs'

export const now = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

export const format = (date: string) => {
  const day = dayjs(date).format('DD/MM/YYYY')
  const hours = dayjs(date).format('HH:mm:ss')
  return `${day} às ${hours}`
};