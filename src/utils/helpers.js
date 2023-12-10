export default function currentDateTimeMongoDbStyle(){
  // Create a new Date object
  const currentDate = new Date()

  // Get the individual components of the date
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based
  const day = currentDate.getDate().toString().padStart(2, '0')
  const hours = currentDate.getHours().toString().padStart(2, '0')
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')
  const seconds = currentDate.getSeconds().toString().padStart(2, '0')
  const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0')

  // Create the formatted date string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
}

