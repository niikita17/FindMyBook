

const NavBar = ({ setShowPage }) => {
    return (
        <>
            <div className="">

                <nav className="navbar fixed-top navbar-expand-lg bg-dark p-3 border-bottom border-white">
                    <div className="container-fluid">

                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav nav-underline me-auto my-2 my-lg-0" >
                                <li className="nav-item">
                                    <a className="nav-link  text-white" aria-current="page" href="#" onClick={() => { setShowPage("Home") }}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#" onClick={() => { setShowPage("Cart") }}>Cart</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#" onClick={() => { setShowPage("Orders") }}>orders</a>
                                </li>


                            </ul>

                            <div className="ms-3">
                                <button className="btn btn-primary" type="submit">Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default NavBar;