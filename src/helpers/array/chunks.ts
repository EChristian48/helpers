export default function chunk<T>(arr: T[], chunkSize: number): T[][] {
  return arr.reduce((resultArray: T[][], item: T, index: number) => {
    const chunkIndex = Math.floor(index / chunkSize)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
}
