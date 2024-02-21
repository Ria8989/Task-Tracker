import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title,onAdd,showAdd}) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'close' : 'Add'} 
            onClick={onAdd} />
            
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// {/* <h1 style={{color:'red'}}>{title}</h1>
// use inline like above or make a variable like below
// <h1 style={headingStyle}>Riya</h1>
// const headingStyle={
//     backgroundColor:'black',
//     color:'red'
// }
//  */}
export default Header
