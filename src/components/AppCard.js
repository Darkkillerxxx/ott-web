
const AppCard = ({title,children}) =>{
    return (
        <div class="card" style={{width:'100%',marginBottom:10,marginTop:35}}>
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                {children}
            </div>
        </div>
    )
}

export default AppCard;