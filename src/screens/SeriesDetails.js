import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AppTextBold} from '../components/AppTextBold';
import {AppText} from '../components/AppText';
import ScreenHeader from '../components/ScreenHeader';
import { message } from 'react-message-popup';

const SeriesDetails = () => {
    const navigate = useNavigate();
    const [series,setSeries] = useState(null);
    const { id } = useParams();

    const truncateString = (str, maxLength = 100) =>{
        if (str?.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        }
        return str;
    }

    const fetchSeriesDetails = async() =>{
        try{    
            const accessToken = localStorage.getItem('auth');
            console.log("Access Token:", accessToken);

            const fetchSeries = await fetch(`http://localhost:3000/api/shows/fetchSeriesById/${id}`,{
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })

            if (!fetchSeries.ok) {
                const errorText = await fetchSeries.text(); // If API returns non-JSON error
                message.error(errorText,5000);
                throw new Error(errorText || "Failed to upload content");
            }

            const data = await fetchSeries.json();
            setSeries([...data?.data?.SeriesDetails]);
        }
        catch(error){
            message.error(error.message,5000);
        }
    }

    useEffect(() => {
        console.log("Series ID:", id);
        fetchSeriesDetails();
        // Fetch series details based on the ID
    }, [id]);

    return (
        <div className='container'>
            <ScreenHeader label="Series Details"/>
            {
                series ? 
                <>
                     <div class="card" style={{width: '100%'}}>
                        <img class="card-img-top" style={{width:'100%',height:400,objectFit:'cover',objectPosition:'center'}} src={`https://image.tmdb.org/t/p/original/${series[0].landscapeUrl}`} alt="Card image cap" />
                        <div class="card-body">
                            <div className='row'>
                                <div className='col-2'>
                                    <img src={`https://image.tmdb.org/t/p/original/${series[0].thumbnailUrl}`} style={{objectFit:'cover',width:200,height:300}} />
                                </div>
                                <div className='col-10'>
                                    <AppTextBold class="card-title">{series[0].SeriesName}</AppTextBold>
                                    <AppText class="card-text">{series[0].SeriesDescription}</AppText>
                                    <div className='row mt-2'>
                                        <div className='col-4'>
                                            <AppText>Director</AppText>
                                            <AppTextBold>{series[0].Director}</AppTextBold>
                                        </div>
                                        <div className='col-4'>
                                            <AppText>Producer</AppText>
                                            <AppTextBold>{series[0].Producer}</AppTextBold>
                                        </div>
                                        <div className='col-4'>
                                            <AppText>Pilot Air Date</AppText>
                                            <AppTextBold>{series[0].PilotAirDate.split('T')[0]}</AppTextBold>
                                        </div>

                                        <div className='col-4'>
                                            <AppText>Genre</AppText>
                                            <AppTextBold>{series[0].Genre}</AppTextBold>
                                        </div>
                                        <div className='col-4'>
                                            <AppText>Language</AppText>
                                            <AppTextBold>{series[0].Language}</AppTextBold>
                                        </div>
                                        <div className='col-12'>
                                            <AppText>Cast</AppText>
                                            <AppTextBold>{series[0].Cast}</AppTextBold>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <div className='col-12 mt-2' style={{textAlign:'right'}}>
                        <button className='btn' style={{backgroundColor:'black',color:'white'}}>Add New Season</button>
                    </div>

                    <div className='row mt-3'>
                        {
                            series[0]?.Seasons?.map((season,index)=>{
                                console.log(107,season)
                                return(
                                    <div className='col-3'>
                                        <div class="card mb-3" onClick={()=> navigate(`/manageEpisodes/${index}/${season.SeasonId}/${season.SeriesExternalId}`)} style={{width: '18rem'}}>
                                            <img class="card-img-top" src={`https://image.tmdb.org/t/p/original/${season.ImageUrl}`} alt="Card image cap"/>
                                                <div class="card-body">
                                                    <AppTextBold class="card-title">{season.SeasonTitle}</AppTextBold>
                                                    <AppText class="card-text">{truncateString(season.Description,100)}</AppText>
                                                </div>
                                            </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </>:null
            }
        </div>
    );
};

export default SeriesDetails;
