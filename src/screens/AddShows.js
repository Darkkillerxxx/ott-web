import MovieForm from "../components/MovieForm"
import ScreenHeader from "../components/ScreenHeader"

const AddShows = () =>{
    return (
        <div className="container"> 
            <ScreenHeader label='Create Shows'/>
            <MovieForm/>
        </div>
    )
}

export default AddShows;