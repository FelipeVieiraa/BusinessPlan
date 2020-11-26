import { now } from './date';

export const monthBalanceTotal = (measured: any) => {

    if(!!measured) {
        const maxTime = 1000*60*43200
        const measuredDate: any = new Date(Date.parse(measured.split(' ').join('T')))
        const currentDate: any = new Date(Date.parse(now().split(' ').join('T')))


        const time = currentDate - measuredDate

        return time > maxTime

        //console.log({agora: currentDate, ultimoapontamento: lastPointingDate, time: time, time2: (time/1000)/60})
    }else {
        return true
    }
}