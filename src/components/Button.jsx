import { Link } from "react-router-dom"
function Button({type, children, path}) {
  const linkStyle = {
    textDecoration: "none",
  };
  return (
    <div>
        <Link to={path} style={linkStyle} className= {`btn ${type}`} >
            {children}
        </Link>
    </div>
  )
}

export default Button