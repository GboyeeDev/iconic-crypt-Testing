import { useEffect, useState } from 'react';
import './Chart.css'
import axios from 'axios';


function Chart() {

    const [search, setSearch] = useState("");
    const [crypt, setCrypt] = useState([]);

    useEffect(() => {
        axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=69&currency=NGN')
        .then((res) => {
            setCrypt(res.data.coins);
            console.log(setCrypt);
        });
    }, []);


    return (
        <div className='chart'>
            <h1>All Coins</h1>
            <input type="text" placeholder="Search.." onChange={(e) => {setSearch(e.target.value); }}/>

            <table>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Market Cap</td>
                        <td>Price</td>
                        <td>Available Supply</td>
                        <td>Volume(24hrs)</td>
                    </tr>
                </thead>
                <tbody>
                    {crypt.filter((val) => {
                        return val.name.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((val, id) => {
                        return (
                            <>
                                <tr id={id}>
                                    <td className="rank">{val.rank}</td>
                                    <td className="logo">
                                        <a href={val.websiteUrl}> 
                                            <img src={val.icon} alt="logo" width="30px" />
                                        </a> 
                                        <p>{val.name}</p>
                                    </td>
                                    <td className="symbol">{val.symbol}</td>
                                    <td>{val.marketCap}</td>
                                    <td>&#8358;{val.price.toFixed(2)}</td>
                                    <td>{val.availableSupply}</td>
                                    <td>{val.volume.toFixed(0)}</td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}
 
export default Chart;
