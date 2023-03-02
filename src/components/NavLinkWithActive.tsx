import { NavLink, NavLinkProps } from '@mantine/core'
import { Link, LinkProps, useMatch } from 'react-router-dom'

export default function NavLinkWithActive(props: NavLinkProps & LinkProps) {
  const { to, ...others } = props
  const match = useMatch(to.toString())
  if (match) others.active = true
  return <NavLink {...others} component={Link} to={to} />
}
