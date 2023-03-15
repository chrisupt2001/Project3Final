import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'



function Breadcrumbs({title}) 
{const routes = [
    {path: '/books/', breadcrumb: 'Books'},
    {path: '/books/:bookID', breadcrumb: `${title}`}
];
      const breadcrumbs = useBreadcrumbs(routes);
      console.log(breadcrumbs)

return (
    <nav>
        {breadcrumbs.map(({ match, breadcrumb }) => (
            <Link key={match.pathname} to={match.pathname}>
                {breadcrumb} /
            </Link>
        ))}
    </nav>
      );
    }
    
    export default Breadcrumbs;