const Country = ({country, updateVistedList}) => {

const handleClick = (e) => {
    updateVistedList(country.name.common)
}

return(
    <li>
        {country.name.common}
        <button onClick={handleClick}>Visited</button>
        </li>

  );

}


export default Country;