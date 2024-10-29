// Convert song duration in seconds to mm:ss format
export function formatDuration(durationInSeconds: number) {
  const totalSeconds = Math.floor(durationInSeconds)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
