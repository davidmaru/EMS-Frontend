import Search from "./search";
import PropTypes from 'prop-types'; // Import PropTypes

export default function UserSearch({ handler = () => { } }) {
    return (
    <div className="user-search">
        <Search handler={handler} />
    </div>
    )
}
UserSearch.propTypes = {
    handler: PropTypes.func, // The handler prop is expected to be a function
  };
