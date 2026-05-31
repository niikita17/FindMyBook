import ViewBook from "../Components/BookComponent/Viewbooks";

const Home = () => {

    return (
        <div className="container-fluid">

            <div className="row">

                <div className="col-1"></div>

                <div className="col-10">

                    <ViewBook />

                </div>

            </div>

        </div>
    );
};

export default Home;