import { connect } from 'react-redux';

import { getPathname } from './selectors';

const mapStateToProps = state => ({ pathname: getPathname(state) });

export default connect(mapStateToProps);
