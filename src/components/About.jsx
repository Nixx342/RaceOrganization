import '../assets/About.css'
import marafonImage from '../assets/img/marafon.png'
import map3km from '../assets/img/map3km.png'
import map5km from '../assets/img/map5km.png'
import map10km from '../assets/img/map10km.png'

function About () {
    return (    
        <div className='about'>
            <h1>ЗАРЯЖАЙСЯ
                БЕГОМ
            </h1>
            <div className='info'>
                <div className='info-text'>
                    <h3>
                        19 МАЯ СТРАНА
                        В ОДНОМ РИТМЕ
                    </h3>
                    <h5>
                        VIII Всероссийский полумарафон
                    </h5>
                    <p>
                        Вся страна и 1 старт для нескольких тысяч 
                        любителей спорта. Это больше, чем ЗаБег. Это 
                        мировой рекорд.
                    </p>
                    <p>
                        Самый крупный полумарафон с синхронным 
                        стартом: 3 дистанции, крутая фан-зона и 
                        яркий праздник от Калининграда до Камчатки.
                    </p>
                    <p>
                        Спортивный фестиваль в центре твоего города.
                    </p>
                    <p>
                        ЗаБег — это для тебя!
                    </p>
                </div>
                <div className='photo'>
                    {/* <figure className='photo'> */}
                    <figure>
                        <img src={marafonImage} alt="Марафон" />
                    </figure>
                </div>
                
            </div>
           <div className='maps'>
                <div className='map'>
                    <h2>Маршрут - 3 км</h2>
                    <figure className='photo'>
                        <img src={map3km} alt="3km" />
                    </figure>
                </div>
                <div className='map'>
                    <h2>Маршрут - 5 км</h2>
                    <figure className='photo'>
                        <img src={map5km} alt="5km" />
                    </figure>
                </div>
                <div className='map'>
                    <h2>Маршрут - 10 км</h2>
                    <figure className='photo'>
                        <img src={map10km} alt="10km" />
                    </figure>
                </div>
           </div>
        </div>
    )
}

export default About