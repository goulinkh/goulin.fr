import Link from "../Link"

const Footer = () => {
  return (
    <div className="max-w-container mx-auto mb-6 space-y-3">
      <ul className="flex items-center space-x-3 text-sm">
        <li>
          <Link href="https://github.com/goulinkh">Github</Link>
        </li>
        <li>
          <Link href="https://github.com/goulinkh/goulin.fr">
            Website&apos;s Code
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/GoulinKH">Twitter</Link>
        </li>
      </ul>
    </div>
  )
}
export default Footer
