/* location type */
 interface LocationProps {
  hash: string
  key: string
  pathname: string
  search: string
  state: { id: number }
}
export type { LocationProps }