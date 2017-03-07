import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function Home() {
  return (
    <section name="Error">
      <h1>Page Not Found</h1>
      <Link to="/">
        <FormattedMessage id="error.404" />
      </Link>
    </section>
  );
}

export default Home;
