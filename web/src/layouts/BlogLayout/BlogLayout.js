import { Link, routes } from "@redwoodjs/router";

const BlogLayout = ({ children }) => {
  return (
    <>
      <header>
        <Link to={routes.home()}>Redwood blog</Link>
        <nav>
            <ul>
              <li>
                <Link to={ routes.about() }>About</Link>
              </li>
              <li>
                <Link to={ routes.contact() }>Contact</Link>
              </li>
            </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>

  )
}

export default BlogLayout
