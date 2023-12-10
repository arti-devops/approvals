export function currentDateTimeMongoDbStyle(){
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

export function formatDateFr(dateString) {
  // Uses mongodb datetime string format
  const date = new Date(dateString)

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date)
    
  return `${formattedDate}`

}

export function formatDateAgoExtended(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMilliseconds = now - date
  const diffMinutes = Math.floor(diffMilliseconds / (60 * 1000))
  const diffHours = Math.floor(diffMilliseconds / (60 * 60 * 1000))
  const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30) // Approximation, not precise
  const diffYears = Math.floor(diffDays / 365) // Approximation, not precise

  if (diffMinutes < 1) {
    return 'À l\'instant'
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
  } else if (diffHours < 24) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
  } else if (diffWeeks < 4) {
    return `Il y a ${diffWeeks} semaine${diffWeeks > 1 ? 's' : ''}`
  } else if (diffMonths < 12) {
    return `Il y a ${diffMonths} mois`
  } else {
    return `Il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`
  }
}


export function extractNamesFromEmail(email) {
  // Ensure the input is a string
  if (typeof email !== 'string') {
    throw new Error('Invalid email format')
  }

  // Split the username by dots
  const usernameParts = email.split('@')[0].split('.')

  // Extract the first and last names
  const firstName = capitalize(usernameParts[0])
  const lastName = usernameParts.length > 1 ? capitalize(usernameParts.slice(1).join(' ')) : ''

  return `${firstName} ${lastName}`
}

function capitalize(str) {
  // Capitalize the first letter of a string
  return str.charAt(0).toUpperCase() + str.slice(1)
}

