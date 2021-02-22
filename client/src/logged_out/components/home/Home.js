import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

function Home(props) {
  const { selectHome } = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);
  return <></>

}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
