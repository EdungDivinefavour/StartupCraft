export default class TimeUtils {
    timeStampToDateString(timeStamp: number, seperator: string = '-'): string {
        let date = new Date(timeStamp)

        return `${date.getFullYear()}${seperator}${date.getMonth() + 1}${seperator}${date.getDate()}`
    }

    getCurrentDate(): string {
        let currentDate = new Date()

        return this.timeStampToDateString(currentDate.getTime())
    }

    getDateForDaysAgo(numberOfDays: number): string {
        let currentDate = new Date()
        let timeStampForDaysAgo = currentDate.getTime() - (numberOfDays * 24 * 60 * 60 * 1000);

        return this.timeStampToDateString(timeStampForDaysAgo)
    }
}

