import dayjs from "dayjs"
export const formatTime = (date:string)=>dayjs(date).format("Do MMMM YYYY")
export const formatTimeDuration = (date:string)=>dayjs(date).fromNow()